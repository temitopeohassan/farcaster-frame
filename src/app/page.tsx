import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';
import { fetchMetadata } from "frames.js/next";

export const generateMetadata = async (): Promise<Metadata> => {
  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: 'Start Browsing',
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
    ...(await fetchMetadata(
      // provide a full URL to your /frames endpoint
      new URL(
        "/frames",
        process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"
      )
    )),
    postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
  });

  return {
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
};

export default function Page() {
  return (
    <>
      <h1>Welcome to the Rounds Frame - Powered by Rounds.wtf</h1>
      <p>This is a Frame-enabled page. Interact with it on a Frame-compatible platform.</p>
    </>
  );
}