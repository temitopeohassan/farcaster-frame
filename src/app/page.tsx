import { getFrameMetadata as fetchFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = fetchFrameMetadata({
  buttons: [
    {
      label: 'Trending Rounds',
    },
    {
      action: 'link',
      label: 'Visit Rounds.wtf',
      target: 'https://rounds.wtf',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/rounds.PNG`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  metadataBase: new URL(NEXT_PUBLIC_URL),
  title: 'Rounds Frame - Powered by Rounds.wtf',
  description: 'Explore the latest rounds on Rounds.wtf',
  openGraph: {
    title: 'Rounds Frame - Powered by Rounds.wtf',
    description: 'Explore the latest rounds on Rounds.wtf',
    images: [`${NEXT_PUBLIC_URL}/rounds.PNG`],
  },
  other: {
    ...frameMetadata,
  },
};

export default async function Page() {
  const response = await fetch('https://rounds.wtf/api/public/v1/rounds', {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });
  const data = await response.json();

  return (
    <>
      <h1>Welcome to the Rounds Frame - Powered by Rounds.wtf</h1>
      <ul>
        {data.data.map((round: any) => (
          <li key={round.id}>
            <strong>{round.attributes.name}</strong>
            <p>{round.attributes.description}</p>
            <p>Start Time: {new Date(round.attributes.start_time).toLocaleString()}</p>
            <p>End Time: {new Date(round.attributes.end_time).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
