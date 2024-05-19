"use server";
import {currentUser} from "@clerk/nextjs/server";
import {StreamClient} from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    const user = await currentUser();
    if(!user || !apiKey || !apiSecret) throw new Error("Server Actions Error.")

    const client = new StreamClient(apiKey,apiSecret)

    const expiration = Math.round(new Date().getTime()/1000)+60*60;
    const issueTime = Math.floor(Date.now()/1000) - 60

    const token = client.createToken(user.id, expiration, issueTime)

    return token;
}