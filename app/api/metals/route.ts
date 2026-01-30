import { NextResponse } from 'next/server';

// Metals API endpoint
const METALS_API_BASE = 'https://metals-api.com/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'latest';
  const date = searchParams.get('date');

  const apiKey = process.env.METALS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    let url: string;

    if (type === 'historical' && date) {
      // Historical prices for a specific date
      url = `${METALS_API_BASE}/${date}?access_key=${apiKey}&base=USD&symbols=XAU,XAG`;
    } else {
      // Latest prices
      url = `${METALS_API_BASE}/latest?access_key=${apiKey}&base=USD&symbols=XAU,XAG`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!data.success) {
      return NextResponse.json({ error: data.error?.info || 'API error' }, { status: 400 });
    }

    // Metals API returns rates as 1/price (how much gold per 1 USD)
    // We need to invert to get USD per oz
    const goldPrice = data.rates?.XAU ? 1 / data.rates.XAU : null;
    const silverPrice = data.rates?.XAG ? 1 / data.rates.XAG : null;

    return NextResponse.json({
      success: true,
      date: data.date,
      prices: {
        gold: goldPrice,
        silver: silverPrice,
      },
    });
  } catch (error) {
    console.error('Metals API error:', error);
    return NextResponse.json({ error: 'Failed to fetch metals data' }, { status: 500 });
  }
}
