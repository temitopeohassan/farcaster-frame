// File: pages/api/frames.ts (for Pages Router)
// OR
// File: app/api/frames/route.ts (for App Router)

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  // Example metadata response
  const metadata = {
    title: "Frame Metadata", // Ensure this key is used correctly in your application
    description: "This is the metadata for the Farcaster frame.", // Ensure this key is used correctly
    image: "http://localhost:3000/ok.png", // Ensure this image is accessible
  };

  return NextResponse.json(metadata); // Return the metadata as a JSON response
}