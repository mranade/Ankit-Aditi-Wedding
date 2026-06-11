import { google } from "googleapis";

export const runtime = "nodejs";

export async function GET() {
  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "Sheet1!A2:C",
    });

    const rows = response.data.values ?? [];

    const data = rows.map((row) => ({
      name: row?.[0] ?? "",
      groups: row?.[1]
        ? row[1].split(",").map((g: string) => g.trim())
        : [],
    }));

    return Response.json(data);
  } catch (err: any) {
    return Response.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}