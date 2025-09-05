import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    // Call your Google Sheets script
    const response = await fetch(
      `https://script.google.com/macros/s/AKfycby-TiE4gLk4bUC-mSYaT_lDwyOU1T6JTMNw2pIeYQ59qJ2Mk0x9jk_6x47QR5ASCcdasQ/exec?q=${encodeURIComponent(query)}`,
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-GB,en;q=0.5",
          origin: process.env.NEXT_PUBLIC_SITE_URL || "https://www.stocktutor.live",
          referer: process.env.NEXT_PUBLIC_SITE_URL || "https://www.stocktutor.live/",
          "user-agent": "Mozilla/5.0 (compatible; StockTutor/1.0)",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching course details:", error)
    return NextResponse.json({ error: "Failed to fetch course details" }, { status: 500 })
  }
}
