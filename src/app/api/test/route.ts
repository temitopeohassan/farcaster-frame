import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Return a static HTML page
  return new NextResponse(`  // Changed from text to html
    <!DOCTYPE html>
    <html lang="en">
    `, { status: 200, headers: { 'Content-Type': 'text/html' } });
}

   export async function POST(req: NextRequest) {
     return NextResponse.json({ message: 'POST to test route working' });
   }