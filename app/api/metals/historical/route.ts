import { NextResponse } from 'next/server';

const METALS_API_BASE = 'https://metals-api.com/api';

// Historical gold prices (USD per oz) - for data before Sept 2021
const HISTORICAL_GOLD_PRICES: Record<string, number> = {
  '2021': 1850,
  '2020': 1770,
  '2019': 1520,
  '2018': 1270,
  '2017': 1260,
  '2016': 1100,
  '2015': 1060,
  '2014': 1200,
  '2013': 1410,
  '2012': 1670,
  '2011': 1570,
  '2010': 1120,
  '2006': 550,
  '2001': 270,
  '1996': 390,
};

interface MetalsResponse {
  success: boolean;
  date: string;
  rates: {
    XAU?: number;
    XAG?: number;
  };
  error?: {
    info: string;
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const yearsAgo = parseInt(searchParams.get('years') || '10');

  const apiKey = process.env.METALS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    // Calculate historical date
    const today = new Date();
    const historicalYear = today.getFullYear() - yearsAgo;
    const historicalDate = new Date(today);
    historicalDate.setFullYear(historicalYear);

    // Metals API only has data since Sept 2021
    const apiStartDate = new Date('2021-09-21');
    const useApiForHistorical = historicalDate >= apiStartDate;

    // Always fetch current price from API
    const currentResponse = await fetch(
      `${METALS_API_BASE}/latest?access_key=${apiKey}&base=USD&symbols=XAU,XAG`
    );
    const currentData: MetalsResponse = await currentResponse.json();

    if (!currentData.success) {
      return NextResponse.json({ error: currentData.error?.info || 'API error' }, { status: 400 });
    }

    const currentGold = currentData.rates?.XAU ? 1 / currentData.rates.XAU : null;
    const currentSilver = currentData.rates?.XAG ? 1 / currentData.rates.XAG : null;

    let historicalGold: number | null = null;
    let historicalDateStr = historicalDate.toISOString().split('T')[0];
    let isEstimated = false;

    if (useApiForHistorical) {
      // Fetch from API for recent data
      const historicalResponse = await fetch(
        `${METALS_API_BASE}/${historicalDateStr}?access_key=${apiKey}&base=USD&symbols=XAU,XAG`
      );
      const historicalData: MetalsResponse = await historicalResponse.json();

      if (historicalData.success && historicalData.rates?.XAU) {
        historicalGold = 1 / historicalData.rates.XAU;
      }
    }

    // Use historical data if API doesn't have it
    if (!historicalGold) {
      historicalGold = HISTORICAL_GOLD_PRICES[String(historicalYear)] ||
                       HISTORICAL_GOLD_PRICES[String(Math.floor(historicalYear / 5) * 5)] ||
                       1100; // Default fallback
      isEstimated = true;
    }

    // Calculate CAGR
    let goldCAGR = null;
    if (currentGold && historicalGold && historicalGold > 0) {
      goldCAGR = (Math.pow(currentGold / historicalGold, 1 / yearsAgo) - 1) * 100;
    }

    const goldReturn = currentGold && historicalGold
      ? ((currentGold - historicalGold) / historicalGold) * 100
      : null;

    return NextResponse.json({
      success: true,
      yearsAgo,
      currentDate: currentData.date,
      historicalDate: historicalDateStr,
      isEstimated,
      gold: {
        currentPrice: currentGold,
        historicalPrice: historicalGold,
        totalReturn: goldReturn,
        cagr: goldCAGR,
      },
      silver: {
        currentPrice: currentSilver,
      },
    });
  } catch (error) {
    console.error('Metals API error:', error);
    return NextResponse.json({ error: 'Failed to fetch metals data' }, { status: 500 });
  }
}
