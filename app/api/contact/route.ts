import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: Implement email service integration
    // You can integrate with:
    // - SendGrid (npm install @sendgrid/mail)
    // - Mailgun (npm install mailgun.js)
    // - Resend (npm install resend)
    // - AWS SES
    // - etc.

    console.log('Contact form submission:', { name, email, company, message });

    // For now, just return success
    // In production, send actual email here
    return NextResponse.json(
      { 
        success: true,
        message: 'Thank you for reaching out! We\'ll be in touch soon.' 
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
