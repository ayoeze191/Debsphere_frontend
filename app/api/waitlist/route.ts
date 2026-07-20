import { NextResponse } from "next/server";

const WAITLIST_URL =
  "https://script.google.com/macros/s/AKfycbwn2ylPkMI-sW6lTavOqDYIQRertjtRn9pdG823R7BIwpGP6oin78zhK3t75mfmGcNf/exec";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const response = await fetch(WAITLIST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });

    const data = await response.text();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to join waitlist",
      },
      {
        status: 500,
      },
    );
  }
}
