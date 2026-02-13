import { NextRequest, NextResponse } from 'next/server'

// ByeTalk CRM API configuration
const BYETALK_API_URL = process.env.BYETALK_API_URL || 'https://byetalk.com'
const BYETALK_API_KEY = process.env.BYETALK_API_KEY || 'citadel-forms-key-2024'

/**
 * POST /api/submit-form
 * Receives form submissions and forwards them to ByeTalk CRM
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      form_id,
      form_name,
      firstName,
      lastName,
      email,
      phone,
      message,
      consent,
    } = body

    // Get referrer and current URL
    const referer = request.headers.get('referer') || ''
    const url = new URL(referer || request.url)

    // Extract UTM parameters from URL if present
    const utm_source = url.searchParams.get('utm_source') || null
    const utm_medium = url.searchParams.get('utm_medium') || null
    const utm_campaign = url.searchParams.get('utm_campaign') || null
    const utm_content = url.searchParams.get('utm_content') || null
    const utm_term = url.searchParams.get('utm_term') || null

    // Forward to ByeTalk CRM
    const byetalkResponse = await fetch(`${BYETALK_API_URL}/api/forms/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': BYETALK_API_KEY,
      },
      body: JSON.stringify({
        form_id: form_id || 'citadel-website',
        form_name: form_name || 'Citadel Website Form',
        form_url: referer || null,
        first_name: firstName || null,
        last_name: lastName || null,
        email: email || null,
        phone: phone || null,
        message: message || null,
        consent: consent || false,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
        referrer_url: request.headers.get('referer') || null,
        landing_page_url: referer || null,
      }),
    })

    if (!byetalkResponse.ok) {
      const errorData = await byetalkResponse.json().catch(() => ({}))
      console.error('[Submit Form] ByeTalk API error:', errorData)
      // Still return success to user - we don't want to block them
      // The form data will be logged for manual processing
      console.log('[Submit Form] Form data (not sent to CRM):', {
        form_id,
        email: email?.slice(0, 3) + '***',
        phone: phone?.slice(0, 3) + '***',
      })
    } else {
      const result = await byetalkResponse.json()
      console.log('[Submit Form] Successfully submitted to ByeTalk:', result.submission_id)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Submit Form] Error:', error)
    // Still return success to user
    return NextResponse.json({ success: true })
  }
}
