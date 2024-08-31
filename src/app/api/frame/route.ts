import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

interface Round {
  id: string;
  attributes: {
    name: string;
    description: string;
    start_time: string;
    end_time: string;
  };
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  console.log('Received request:', req.method, req.url);
  console.log('NEXT_PUBLIC_URL:', NEXT_PUBLIC_URL);

  let body;
  try {
    body = await req.json();
    console.log('Parsed request body:', JSON.stringify(body));
  } catch (e) {
    console.error('Failed to parse request body:', e);
    return errorResponse('Failed to parse request');
  }

  // Simulating a valid frame message
  const buttonIndex = body.untrustedData?.buttonIndex || 1;
  const state = body.untrustedData?.state ? JSON.parse(body.untrustedData.state) : { index: 0 };

  try {
    console.log('Fetching rounds data');
    const roundsRes = await fetch(`https://rounds.wtf/api/public/v1/rounds`, {
      method: 'GET',
      headers: { 'accept': 'application/json' }
    });

    if (!roundsRes.ok) {
      console.error('Failed to fetch rounds data:', roundsRes.status, roundsRes.statusText);
      throw new Error(`HTTP error! status: ${roundsRes.status}`);
    }

    const roundsJson = await roundsRes.json();
    console.log('Fetched rounds data:', JSON.stringify(roundsJson).substring(0, 200) + '...');

    const rounds = roundsJson.rounds || [];
    if (rounds.length === 0) {
      return errorResponse('No rounds available');
    }
    console.log('Number of rounds:', rounds.length);

    let currentIndex = parseInt(state.index) || 0;
    if (currentIndex < 0 || currentIndex >= rounds.length) {
      currentIndex = 0;
    }

    console.log('Current round index:', currentIndex);

    const currentRound = rounds[currentIndex];
    console.log('Current round:', JSON.stringify(currentRound));

    if (!currentRound || !currentRound.name) {
      console.error('Current round or its name is undefined');
      return errorResponse('Invalid round data');
    }

    const imageUrl = `${NEXT_PUBLIC_URL}/rounds.PNG`;
    console.log('Image URL:', imageUrl);

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Round: ${currentRound.name}</title>
        <meta property="og:title" content="Round: ${currentRound.name}" />
        <meta property="og:description" content="${currentRound.description || 'No description'}" />
        <meta property="og:image" content="${imageUrl}" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${imageUrl}" />
        <meta property="fc:frame:button:1" content="Previous" />
        <meta property="fc:frame:button:2" content="Next" />
        <meta property="fc:frame:button:3" content="Visit Rounds.wtf" />
        <meta property="fc:frame:button:3:action" content="link" />
        <meta property="fc:frame:button:3:target" content="https://rounds.wtf" />
        <meta property="fc:frame:post_url" content="${NEXT_PUBLIC_URL}/api/frame" />
      </head>
      <body>
        <div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:rgba(0,0,0,0.7);color:white;text-align:center;padding:20px;">
          <h1 style="font-size:24px;margin-bottom:10px;">${currentRound.name}</h1>
          <p style="font-size:16px;margin:5px 0;">${currentRound.description || 'No description'}</p>
          <p style="font-size:16px;margin:5px 0;">Starts: ${new Date(currentRound.startsAt).toLocaleString()}</p>
          <p style="font-size:16px;margin:5px 0;">Ends: ${new Date(currentRound.votingEndsAt).toLocaleString()}</p>
        </div>
      </body>
    </html>
  `;

  console.log('Generated HTML:', html.substring(0, 500) + '...');

  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });

  } catch (e) {
    console.error('Error in getResponse:', e);
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    return errorResponse(`An error occurred: ${errorMessage}`);
  }
}

function errorResponse(message: string): NextResponse {
  console.log('Generating error response:', message);
  const imageUrl = `${NEXT_PUBLIC_URL}/error.PNG`;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Error</title>
        <meta property="og:title" content="Error" />
        <meta property="og:description" content="${message}" />
        <meta property="og:image" content="${imageUrl}" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${imageUrl}" />
        <meta property="fc:frame:button:1" content="Try Again" />
        <meta property="fc:frame:post_url" content="${NEXT_PUBLIC_URL}/api/frame" />
      </head>
      <body>
        <h1>Error</h1>
        <p>${message}</p>
      </body>
    </html>
  `;
  console.log('Error HTML:', html);
  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
}

export async function POST(req: NextRequest): Promise<Response> {
  console.log('POST request received');
  return getResponse(req);
}

export const dynamic = 'force-dynamic';