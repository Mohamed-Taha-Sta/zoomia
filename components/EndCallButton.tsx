"use client";
import React from 'react';
import {useCall, useCallStateHooks} from "@stream-io/video-react-sdk";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const EndCallButton = () => {
    const call = useCall();
    const {useLocalParticipant} = useCallStateHooks();
    const localParticipant = useLocalParticipant();
    const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;
    const router = useRouter();
    if (!isMeetingOwner) return null;

    return (
        <Button className={"bg-red-500 text-white rounded-2xl hover:bg-red-700"} onClick={async () => {await call?.endCall(); router.push("/")}}>
            End call for everyone
        </Button>
    );
};

export default EndCallButton;