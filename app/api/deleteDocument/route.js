// pages/api/deleteDocument.js
import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const client = createClient({
  projectId: "zl6xpm4f",
  dataset: "production",
  token:
    "skhpZlbpUnleiVDZkHImFIrBqGS7yrhdkJqjA2s2YwMSfYzGafX6Dmb3iGpPaR4vt4VaHUwRHf35iuJiDUMNCUHqmhNFml6S0kpiPIPnUZSHL7VGPvFQ2aS1vska0Pbl6qYKVfRFaucBPeByBy9kT4LYnbhFY6pwmwOl0RyvJDm5eJ9WpI07",
  useCdn: false,
});

export async function DELETE(request) {
  const { id } = await request.json();
  try {
    await client.delete(id);
    return NextResponse.json({ message: "Document deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not delete document", error },
      { status: 500 }
    );
  }
}
