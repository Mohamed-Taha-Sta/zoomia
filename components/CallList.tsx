"use client";
import React, {useState} from 'react';
import {useGetCalls} from "@/hooks/useGetCalls";
import {useRouter} from "next/navigation";
import {CallRecording} from "@stream-io/video-client";
import {Call} from "@stream-io/video-react-sdk";
import MeetingCard from "@/components/MeetingCard";

const CallList = ({type}:{type: "ended" | "recordings" | "upcoming"}) => {
    const {endedCalls, upcomingCalls, callRecordings, isLoading} = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([])
    const getCalls = () => {
        switch (type) {
            case "ended": return endedCalls;
            case "upcoming": return upcomingCalls;
            case "recordings" : return recordings;
            default : return [];
        }
    }

        const getNoCallsMessage = () => {
        switch (type) {
            case "ended": return "No Previous Calls";
            case "upcoming": return "No Upcoming Calls";
            case "recordings" : return "No Recordings";
            default : return "";
        }
    }

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();
    return (
        <div className={"grid grid-cols-1 gap-5 xl:grid-cols-2"}>
            {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => <MeetingCard type={type}/>) : (<h1>{noCallsMessage}</h1>)}
        <MeetingCard type={type}/>
        </div>
    );
};

export default CallList;