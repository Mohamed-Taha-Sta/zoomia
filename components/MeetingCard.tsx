"use client";

import Image from "next/image";

import {cn} from "@/lib/utils";
import {Button} from "./ui/button";
import {useToast} from "./ui/use-toast";

interface MeetingCardProps {
    title: string;
    date: string;
    icon: string;
    isPreviousMeeting?: boolean;
    buttonIcon1?: string;
    buttonText?: string;
    handleClick: () => void;
    link: string;
}

const MeetingCard = ({
                         icon,
                         title,
                         date,
                         isPreviousMeeting,
                         buttonIcon1,
                         handleClick,
                         link,
                         buttonText,
                     }: MeetingCardProps) => {
    const {toast} = useToast();

    return (
        <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-6 py-6 ">
            <article className="flex flex-col gap-5">
                <Image src={icon} alt="upcoming" width={28} height={28}/>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-base font-normal">{date}</p>
                    </div>
                </div>
            </article>
            <article className={cn("flex justify-center relative", {})}>
                {!isPreviousMeeting && (
                    <div className="flex gap-2">
                        <Button onClick={handleClick} className="text-black rounded bg-white hover:bg-gray-300 px-6">
                            {buttonText}
                        </Button>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(link);
                                toast({
                                    title: "Link Copied",
                                });
                            }}
                            className="border-gray-600 border rounded px-4 hover:bg-gray-800"
                        >
                            <Image
                                src="/icons/copy.svg"
                                alt="feature"
                                width={20}
                                height={20}
                            />
                            &nbsp; Copy Link
                        </Button>
                    </div>
                )}
            </article>
        </section>
    );
};

export default MeetingCard;