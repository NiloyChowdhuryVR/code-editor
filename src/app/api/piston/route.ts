import axios from "axios";
// import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req:NextRequest){
    
    try {
        const body = await req.json()
        const {language,source}  = body;
        if(!language || !source) return NextResponse.json({message:"Missing Language or Source"},{status:400})

        const response = await axios.post('https://emkc.org/api/v2/piston/execute',{
            language,
            source
        });
        console.log(response)
        return NextResponse.json(response.data,{status:400})
    } catch (error) {
        console.log(error)
        
    }
}