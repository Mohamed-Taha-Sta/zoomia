import React from 'react';
import Image from 'next/image'

const MeetingCard = ({type}: {type: "ended" | "recordings" | "upcoming"}) => {
    return (
        <div className={"flex flex-col bg-dark-1 rounded-xl py-7 px-6 gap-3"}>
            <Image
                width={20}
                height={20}
                src={"/icons/upcoming.svg"}
                alt={"upcomingIcon"}
            />
            <h1 className={"text-[18px] font-bold -pt-2"}>Meeting#255: Quality Assurance Team</h1>
            <h2 className={"text-sm text-neutral-300 font-light -mt-2"}>Thursday, 8th March, 2024 - 10:00PM</h2>
        </div>
    );
};

export default MeetingCard;