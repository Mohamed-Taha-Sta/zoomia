import React from 'react';
import Image from 'next/image'
import {cn} from "@/lib/utils";

interface HomeCardProps{
    className: string,
    img: string,
    title: string,
    description: string,
    handleClick: () => void,

}

const HomeCard = ({className, handleClick, img, title, description}: HomeCardProps) => {
    return (
        <div
                className={cn("px-6 py-5 flex flex-col justify-between w-full  min-h-[260px] rounded-[14px] cursor-pointer" ,className)}
                onClick={handleClick}
        >
                <div className={"flex-center glassmorphism size-12 rounded-[10px]"}>
                    <Image
                        width={27}
                        height={27}
                        alt={title}
                        src={img}
                    />
                </div>
                <div className={"flex flex-col gap-2"}>
                    <h1 className={"text-2xl font-bold"}>{title}</h1>
                    <p className={"text-md font-light"}>{description}</p>
                </div>
            </div>
    );
};

export default HomeCard;