"use client";
import React from 'react';
import {useUser} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/use-toast";
import Image from "next/image";
import {useGetCallById} from "@/hooks/useGetCallById";
import {useStreamVideoClient} from "@stream-io/video-react-sdk";
import {useRouter} from "next/navigation";

const PersonalRoom = () => {

    const Table = ({
                       title,
                       description,
                   }: {
        title: string;
        description: string;
    }) => {
        return (
            <div className="flex flex-col items-start gap-2 xl:flex-row">
                <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
                    {title}:
                </h1>
                <h1 className="truncate font-bold max-sm:max-w-[320px] pt-1">
                    {description}
                </h1>
            </div>
        );
    };
    const {user} = useUser();
    const meetingID = user?.id;
    const client = useStreamVideoClient();
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingID}?personal=true`
    const {call} = useGetCallById(meetingID!);
    const router = useRouter();
    const startRoom = async () => {
        if (!client || !user) return;
        if (!call) {
            const newCall = client.call("default", meetingID!)
            await newCall.getOrCreate({
                data: {
                    starts_at: new Date().toISOString(),
                },
            });
        }
        router.push(`/meeting/${meetingID}?personal=true`)

    }

    return (
        <section className={"flex size-full flex-col gap-10 text-white"}>
            <div className={"flex w-full flex-col gap-6 xl:max-w-4xl bg-dark-1 p-3 rounded-xl"}>
                <Table title={"Topic 👤"} description={`${user?.username}` + "'s meeting room"}/>
                <Table title={"Meeting 🆔"} description={meetingID!}/>
                <Table title={"Invite link 👥"} description={meetingLink}/>
            </div>
            <div className={"flex gap-5"}>
                <Button onClick={startRoom} className={"bg-blue-1 hover:bg-blue-700 rounded"}>Start Meeting</Button>
                <Button onClick={() => {
                    navigator.clipboard.writeText(meetingLink);
                    toast({title: "Link Copied"});
                }} className={"border-gray-600 border rounded hover:bg-gray-800"}>
                    <Image
                        src="/icons/copy.svg"
                        alt="feature"
                        width={20}
                        height={20}
                    /> &nbsp;
                    Copy Link</Button>
            </div>
        </section>
    );
};

export default PersonalRoom;