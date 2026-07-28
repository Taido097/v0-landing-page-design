import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || 'designedbytd.studio@gmail.com';
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ||
  'DesignedbyTD Studio <onboarding@resend.dev>';

function normalize(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getFriendlyResendError(message: string, status: number) {
  const normalized = message.toLowerCase();

  if (normalized.includes('testing emails') || normalized.includes('own email address')) {
    return 'Resend testing mode can only send to the email address used for your Resend account. Make sure designedbytd.studio@gmail.com is the email on that Resend account, or verify your own domain.';
  }

  if (normalized.includes('invalid api key') || status === 401) {
    return 'The Resend API key was rejected. Create a new key in Resend, replace RESEND_API_KEY in Vercel, and redeploy.';
  }

  if (normalized.includes('domain') && normalized.includes('not verified')) {
    return 'The sender domain is not verified in Resend. Use onboarding@resend.dev for testing or verify your own domain.';
  }

  return 'Your message could not be sent. Please try again.';
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = normalize(body.name);
    const email = normalize(body.email).toLowerCase();
    const company = normalize(body.company);
    const message = normalize(body.message);
    const website = normalize(body.website);

    // Honeypot field: silently accept bot submissions without sending email.
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

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured.');
      return NextResponse.json(
        { error: 'The contact form is being configured. Please try again shortly.' },
        { status: 503 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company || 'Not provided');
    const safeMessage = escapeHtml(message).replaceAll('\n', '<br />');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'DesignedbyTD-Studio/1.0',
        'Idempotency-Key': crypto.randomUUID(),
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `New website request from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Business: ${company || 'Not provided'}`,
          '',
          'Project details:',
          message,
        ].join('\n'),
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#171717;max-width:640px;margin:0 auto;">
            <div style="background:#111;color:#fff;padding:24px 28px;">
              <p style="margin:0;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#bdbdbd;">DesignedbyTD Studio</p>
              <h1 style="margin:8px 0 0;font-size:26px;">New website request</h1>
            </div>
            <div style="border:1px solid #e5e5e5;border-top:0;padding:28px;">
              <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
                <tr>
                  <td style="padding:8px 0;color:#737373;width:120px;">Name</td>
                  <td style="padding:8px 0;font-weight:600;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#737373;">Email</td>
                  <td style="padding:8px 0;"><a href="mailto:${safeEmail}" style="color:#111;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#737373;">Business</td>
                  <td style="padding:8px 0;">${safeCompany}</td>
                </tr>
              </table>
              <p style="margin:0 0 8px;color:#737373;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">Project details</p>
              <div style="background:#f7f7f7;border:1px solid #ececec;padding:18px;">${safeMessage}</div>
              <p style="margin:24px 0 0;color:#737373;font-size:13px;">Reply to this email to contact ${safeName} directly.</p>
            </div>
          </div>
        `,
      }),
    });

    const result = (await response.json()) as {
      id?: string;
      message?: string;
      name?: string;
    };

    if (!response.ok) {
      console.error('Resend contact email error:', {
        status: response.status,
        result,
      });

      return NextResponse.json(
        {
          error: getFriendlyResendError(
            result.message || result.name || 'Unknown Resend error',
            response.status
          ),
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your request was sent successfully.',
        id: result.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
