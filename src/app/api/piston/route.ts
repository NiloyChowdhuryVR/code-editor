import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { language,version, source } = await req.json();

    // Validate required fields
    if (!language || !version || !source) {
      return NextResponse.json(
        { message: "Missing Language or Source" },
        { status: 400 }
      );
    }

    // Send code execution request to Piston API
    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language,
      version,
      files: [{ content: source }],
    }); 

    // Return the result from Piston API 
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Error executing code:", error.response?.data || error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.response?.data || error.message },
      { status: 500 }
    );
  }  
}
