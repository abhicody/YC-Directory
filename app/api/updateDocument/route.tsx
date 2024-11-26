// // app/api/updateDocument/route.js
// import { NextResponse } from "next/server";
// import { createClient } from "@sanity/client";

// const client = createClient({
//   projectId: "zl6xpm4f",
//   dataset: "production",
//   token:
//     "skhpZlbpUnleiVDZkHImFIrBqGS7yrhdkJqjA2s2YwMSfYzGafX6Dmb3iGpPaR4vt4VaHUwRHf35iuJiDUMNCUHqmhNFml6S0kpiPIPnUZSHL7VGPvFQ2aS1vska0Pbl6qYKVfRFaucBPeByBy9kT4LYnbhFY6pwmwOl0RyvJDm5eJ9WpI07",
//   useCdn: false,
// });

// export async function PATCH(request) {
//   const { id, data } = await request.json();

//   try {
//     const updatedDocument = await client.patch(id).set(data).commit();
//     return NextResponse.json({
//       message: "Document updated successfully",
//       document: updatedDocument,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Could not update document", error },
//       { status: 500 }
//     );
//   }
// }


// app/api/updateDocument/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import type { NextRequest } from "next/server";

const client = createClient({
  projectId: "zl6xpm4f",
  dataset: "production",
  token:
    "skhpZlbpUnleiVDZkHImFIrBqGS7yrhdkJqjA2s2YwMSfYzGafX6Dmb3iGpPaR4vt4VaHUwRHf35iuJiDUMNCUHqmhNFml6S0kpiPIPnUZSHL7VGPvFQ2aS1vska0Pbl6qYKVfRFaucBPeByBy9kT4LYnbhFY6pwmwOl0RyvJDm5eJ9WpI07",
  useCdn: false,
});

interface UpdateRequestBody {
  id: string;
  data: Record<string, any>;
}

export async function PATCH(request: NextRequest) {
  const { id, data }: UpdateRequestBody = await request.json();

  try {
    const updatedDocument = await client.patch(id).set(data).commit();
    return NextResponse.json({
      message: "Document updated successfully",
      document: updatedDocument,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not update document", error },
      { status: 500 }
    );
  }
}
