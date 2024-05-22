"use client";
import React, {useState} from 'react';
import {
    CallControls,
    CallingState,
    CallParticipantsList,
    CallStatsButton,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks
} from "@stream-io/video-react-sdk";
import {cn} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {LayoutList, Users} from "lucide-react";
import {useRouter, useSearchParams} from "next/navigation";
import EndCallButton from "@/components/EndCallButton";
import Loader from "@/components/Loader";


type CallLayoutType = "Grid" | "Speaker-left" | "Speaker-right"

const MeetingRoom = () => {
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get("Personal");
    const [layout, setLayout] = useState<CallLayoutType>('Speaker-left');
    const [showParticipants, setShowParticipants] = useState(false);
    const {useCallCallingState} = useCallStateHooks();
    const callingState = useCallCallingState();
    const router = useRouter();
    if (callingState !== CallingState.JOINED) return <Loader/>
    const CallLayout = () => {
        switch (layout) {
            case "Grid":
                return <PaginatedGridLayout/>
            case "Speaker-right":
                return <SpeakerLayout participantsBarPosition={"left"}/>
            default :
                return <SpeakerLayout participantsBarPosition={"right"}/>

        }
    }

    return (
        <section className={"relative h-screen w-full overflow-hidden pt-4 text-white"}>
            <div className={"relative flex size-full items-center justify-center"}>
                <div className={"flex size-full max-w-5xl items-center"}>
                    <CallLayout/>
                    <div className={cn("h-[calc(100vh-86px)] hidden ml-2", {'show-block': showParticipants})}>
                        <CallParticipantsList onClose={() => setShowParticipants(false)}/>
                    </div>
                </div>
            </div>
            <div className={"fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap"}>
                <CallControls onLeave={() => router.push('/')}/>
                <DropdownMenu>
                    <div className={"flex items-center"}>
                        <DropdownMenuTrigger className={"cursor-pointer rounded-2xl bg-[#19232D] px-2 py-2 hover:bg-[#4C534B]"}><LayoutList size={20} className={"text-white"} /></DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className={"border-dark-1 bg-dark-1 text-white rounded-xl"}>
                        {["Grid", "Speaker-left", "Speaker-right"].map((item, index) =>
                            (<div key={index}>
                                <DropdownMenuItem className={"cursor-pointer"} onClick={() => setLayout(item as CallLayoutType)}>{item}</DropdownMenuItem>
                                <DropdownMenuSeparator className={"bg-dark-2"}/>
                            </div>))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton/>
                <button onClick={() => {setShowParticipants((prevState) => !prevState)}}>
                    <div className={"cursor-pointer rounded-2xl bg-[#19232D] px-2 py-2 hover:bg-[#4C534B]"}>
                        <Users size={20} className={"text-white"}/>
                    </div>
                </button>
                {!isPersonalRoom && <EndCallButton/>}
            </div>
        </section>
    );
};

export default MeetingRoom;