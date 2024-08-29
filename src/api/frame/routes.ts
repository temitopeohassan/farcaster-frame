import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../app/config';
import { throwErr } from '../lib/throwErr';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let roundsData: any[] = [];

  const body: FrameRequest = await req.json();
  const { isValid } = await getFrameMessage(body);

  if (!isValid) {
    return throwErr('error.jpg');
  }

  try {
    const roundsRes = await fetch(`https://rounds.wtf/api/public/v1/rounds`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      }
    });

    if (!roundsRes.ok) {
      throw new Error(`HTTP error! status: ${roundsRes.status}`);
    }

    const roundsJson = await roundsRes.json();
    roundsData = roundsJson.data.map((round: any) => {
      return {
        id: round.id,
        name: round.attributes.name,
        description: round.attributes.description,
        startTime: round.attributes.start_time,
        endTime: round.attributes.end_time,
      };
    });

    const roundsList = roundsData.map((round) => `
      <li>
        <strong>${round.name}</strong>
        <p>${round.description}</p>
        <p>Start Time: ${new Date(round.startTime).toLocaleString()}</p>
        <p>End Time: ${new Date(round.endTime).toLocaleString()}</p>
      </li>
    `).join('');

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: `Load new rounds`,
          },
          {
            action: 'link',
            label: 'View on Rounds.wtf',
            target: `https://rounds.wtf/explore`,
          },
        ],
        content: `
          <ul>${roundsList}</ul>
        `,
        postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
      }),
    );
  } catch (e) {
    return throwErr('error.png');
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
