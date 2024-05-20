import React, {useEffect, useState} from 'react';
import {DeviceSettings, useCall, VideoPreview} from "@stream-io/video-react-sdk";
import {Button} from "@/components/ui/button";

const MeetingSetup = ({setIsSetupComplete}: {setIsSetupComplete: (value: boolean)=>void}) => {
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

    const call = useCall();

    if (!call) throw Error("Unable to establish a Call")

    useEffect(() => {
        if (isMicCamToggledOn){
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable();
            call?.microphone.enable();
        }

    }, [isMicCamToggledOn, call?.camera, call?.microphone]);
    
    return (
        <div className={"flex w-full h-screen flex-col items-center justify-center gap-3 text-white"}>
            <h1 className={"text-2xl font-bold"}>Setup</h1>
            <VideoPreview />
            <div className={"flex h-16 items-center justify-center gap-3"}>
                <label className={"flex items-center justify-center gap-2 font-medium"}>
                    <input type={"checkbox"} checked={isMicCamToggledOn} onChange={(e)=>{setIsMicCamToggledOn(e.target.checked)}}/>
                    Join with Camera and Mic Off!
                </label>
                <DeviceSettings/>
            </div>
            <Button className={"rounded-xl bg-green-500 px-6 py-2.5 hover:bg-green-700 "} onClick={() => {call?.join(); setIsSetupComplete(true)}}>
                Join Meeting!
            </Button>
        </div>
    );
};

export default MeetingSetup;