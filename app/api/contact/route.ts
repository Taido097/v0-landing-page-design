import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const GOOGLE_SHEETS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbxa4nGPu0rEGVfOsFxbjAAALgnvKHymqbPA7d0Z5bUXzdtBu3KgJtJd_2QaEz4MoRvbmQ/exec';

function normalize(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function getWebhookError(
  responseText: string,
  status: number,
  contentType: string
) {
  const normalized = responseText.toLowerCase();

  if (
    contentType.includes('text/html') ||
    normalized.includes('accounts.google.com') ||
    normalized.includes('sign in') ||
    normalized.includes('authorization required')
  ) {
    return 'The Google Apps Script web app is not publicly accessible. Open Apps Script, go to Deploy → Manage deployments → Edit, set Execute as “Me” and Who has access to “Anyone,” then deploy a new version.';
  }

  if (normalized.includes('script function not found')) {
    return 'The Google Apps Script deployment does not contain the doPost function. Save the script and deploy a new version.';
  }

  if (status === 404) {
    return 'The Google Apps Script deployment URL is no longer active. Deploy the script again and use the new Web app URL ending in /exec.';
  }

  return 'Your message could not be saved. Please try again in a moment.';
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = normalize(body.name);
    const email = normalize(body.email).toLowerCase();
    const company = normalize(body.company);
    const message = normalize(body.message);
    const website = normalize(body.website);

    // Honeypot field: silently accept bot submissions without saving them.
    if (website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please complete your name, email, and project details.' },
        { status: 400 }
      );
    }

    if (name.length > 100 || company.length > 150 || message.length > 5000) {
      return NextResponse.json(
        { error: 'One or more fields are too long.' },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Please include a little more detail about your project.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 254) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const webhookSecret = normalize(process.env.CONTACT_WEBHOOK_SECRET);

    if (!webhookSecret) {
      console.error('CONTACT_WEBHOOK_SECRET is not configured.');
      return NextResponse.json(
        {
          error:
            'CONTACT_WEBHOOK_SECRET is missing in Vercel. Add the exact same secret used in Google Apps Script and redeploy.',
        },
        { status: 503 }
      );
    }

    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'DesignedbyTD-Studio/1.0',
      },
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        name,
        email,
        company,
        message,
        secret: webhookSecret,
        submittedAt: new Date().toISOString(),
      }),
    });

    const contentType = response.headers.get('content-type') || '';
    const responseText = await response.text();
    let result: { success?: boolean; error?: string; message?: string } = {};

    try {
      result = JSON.parse(responseText) as typeof result;
    } catch {
      console.error('Google Sheets webhook returned a non-JSON response:', {
        status: response.status,
        contentType,
        finalUrl: response.url,
        responseText: responseText.slice(0, 500),
      });
    }

    if (!response.ok || result.success !== true) {
      console.error('Google Sheets contact webhook error:', {
        status: response.status,
        contentType,
        finalUrl: response.url,
        result,
      });

      return NextResponse.json(
        {
          error:
            result.error ||
            getWebhookError(responseText, response.status, contentType),
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your request was sent successfully.',
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Contact form error:', message);

    return NextResponse.json(
      {
        error:
          message.includes('timeout') || message.includes('aborted')
            ? 'The request took too long. Please try again.'
            : 'Something went wrong. Please try again.',
      },
      { status: 500 }
    );
  }
}
