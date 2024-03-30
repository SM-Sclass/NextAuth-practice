import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token)

        const user = await User.findOne({ verifyToken: token, verifyTokenEpiry: { $gt: Date.now() } })
        if(!user){
            return NextResponse.json({ error: "Invalid token" }, { status: 4000})
        }
        console.log(user);
        user.isVerified = true;
        user.verifyTokenEpiry= undefined;
        user.verifyToken = undefined;
        await user.save()

        return NextResponse.json({mesasge:"Email verified succesfully" , succes:true}, {status :500})


    } catch (error: any) {
        return NextResponse.json({ error: error.messsage }, { status: 500 })
    }
}