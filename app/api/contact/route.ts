import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ByeTalk CRM API configuration
const BYETALK_API_URL = process.env.BYETALK_API_URL || 'https://byetalk.com';
const BYETALK_API_KEY = process.env.BYETALK_API_KEY || 'citadel-forms-key-2024';

/**
 * Forward form submission to ByeTalk CRM
 */
async function submitToByeTalk(data: {
  form_id: string;
  form_name: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  consent?: boolean;
  referer?: string;
}) {
  try {
    const response = await fetch(`${BYETALK_API_URL}/api/forms/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': BYETALK_API_KEY,
      },
      body: JSON.stringify({
        form_id: data.form_id,
        form_name: data.form_name,
        form_url: data.referer || 'https://citadelgold.com',
        first_name: data.firstName || null,
        last_name: data.lastName || null,
        email: data.email || null,
        phone: data.phone || null,
        message: data.message || null,
        consent: data.consent || false,
        landing_page_url: data.referer || null,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('[Contact API] Submitted to ByeTalk:', result.submission_id);
    } else {
      console.error('[Contact API] ByeTalk submission failed:', response.status);
    }
  } catch (error) {
    console.error('[Contact API] ByeTalk submission error:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formType, firstName, lastName, email, phone, goals, metalInterest, marketingConsent } = body;
    const referer = request.headers.get('referer') || '';

    // Create email content based on form type
    let subject = '';
    let htmlContent = '';

    if (formType === 'consultation') {
      subject = 'New Private Consultation Request - Citadel Gold';
      htmlContent = `
        <h2>New Private Consultation Request</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Goals</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${goals || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Metal Interest</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${metalInterest || 'Not specified'}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #666;">This lead was submitted via the Private Consultation form on citadelgold.com</p>
      `;
    } else if (formType === 'guide') {
      subject = 'New Free Guide Request - Citadel Gold';
      htmlContent = `
        <h2>New Free Guide Request</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Marketing Consent</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${marketingConsent ? 'Yes' : 'No'}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #666;">This lead was submitted via the Free Guide form on citadelgold.com</p>
      `;
    }

    // Configure nodemailer transporter
    // Uses environment variables for SMTP configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@citadelgold.com',
      to: 'admin@citadelgold.com',
      subject: subject,
      html: htmlContent,
      replyTo: email,
    });

    // Submit to ByeTalk CRM (async, don't wait)
    submitToByeTalk({
      form_id: formType === 'consultation' ? 'private-consultation' : 'free-guide',
      form_name: formType === 'consultation' ? 'Private Consultation Request' : 'Free Guide Request',
      firstName,
      lastName,
      email,
      phone,
      message: goals ? `Goals: ${goals}. Metal Interest: ${metalInterest || 'Not specified'}` : undefined,
      consent: marketingConsent,
      referer,
    });

    return NextResponse.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Form submission error:', error);

    // Even if email fails, we don't want to block the user
    // In production, you might want to log this to a database or monitoring service
    return NextResponse.json(
      { success: false, message: 'There was an error submitting the form. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}
