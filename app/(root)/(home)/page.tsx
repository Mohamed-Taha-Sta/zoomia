"use client";
import React, {useEffect, useState} from 'react';
import MeetingTypeList from "@/components/MeetingTypeList";
import {useGetCalls} from "@/hooks/useGetCalls";
import {Call} from "@stream-io/video-react-sdk";

const Page = () => {
    const [shownTime, setShownTime] = useState(() => new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    }))
    const [shownDate, setShownDate] = useState(() => (new Intl.DateTimeFormat('en-US', {dateStyle: 'full'})).format())

    useEffect(() => {
        const interval = setInterval(() => {
            setShownTime(new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}))
            setShownDate((new Intl.DateTimeFormat('en-US', {dateStyle: 'full'})).format());
        }, 30000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    const {upcomingCalls} = useGetCalls();

    let upcomingMsg = "Upcoming Meeting on: ";

    if(!upcomingCalls || upcomingCalls.length == 0) upcomingMsg = "No Upcomming Meetings";
    else {
        upcomingMsg += `${(upcomingCalls[0] as Call).state?.startsAt?.toLocaleString()}`;
    };
    return (
        <section className={"flex size-full flex-col gap-10 text-white"}>
            <div className={"h-[300px] w-full rounded-[20px] bg-hero bg-cover"}>
                <div className={"flex h-full flex-col justify-between px-5 py-8 lg:p-11"}>
                    <h2 className={"glassmorphism max-w-[400px] rounded py-2 text-base font-normal text-center"}>
                        {upcomingMsg}
                    </h2>
                    <div className={"flex flex-col gap-2"}>
                        <h1 className={"text-4xl font-extrabold lg:text-7xl"}>
                            {shownTime}
                        </h1>
                        <p className={"text-lg font-medium text-sky-1 lg:text-2xl"}>{shownDate}</p>
                    </div>
                </div>
            </div>
            <MeetingTypeList/>
        </section>
    );
};

export default Page;