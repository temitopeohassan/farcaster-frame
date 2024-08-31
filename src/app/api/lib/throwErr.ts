import { NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

export function throwErr(imageName: string): NextResponse {
  return new NextResponse(
    `<html>
      <body>
        <h1>Error</h1>
        <img src="${NEXT_PUBLIC_URL}/error.PNG" alt="Error Image" />
        <p>An error occurred. Please try again later.</p>
      </body>
    </html>`,
    {
      status: 500,
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
}
