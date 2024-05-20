"use client";
import React, {useState} from 'react';
import {useUser} from "@clerk/nextjs";
import {StreamCall, StreamTheme} from "@stream-io/video-react-sdk";
import {useGetCallById} from "@/hooks/useGetCallById";
import Loader from "@/components/Loader";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";

const Page = ({params}: {params: {id: string}}) => {
    const {user, isLoaded} = useUser();
    const [isSetupComplete, setIsSetupComplete] = useState(false)
    const {call, isCallLoading} = useGetCallById(params.id);

    if (!isLoaded || isCallLoading) return <Loader/>

    return (
        <main className={"h-screen w-full "}>
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupComplete ? <MeetingSetup setIsSetupComplete={setIsSetupComplete}/> : <MeetingRoom/>}
                </StreamTheme>
            </StreamCall>
        </main>
    );
};

export default Page;