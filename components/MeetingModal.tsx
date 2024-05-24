// MeetingModal.tsx

import React, {ReactNode} from 'react';
import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

interface MeetingModalProps {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    className?: string,
    children?: ReactNode,
    handleClick?: () => void,
    buttonText?: string,
    image?: string,
    buttonIcon?: string,
}

const MeetingModal = ({isOpen,onClose,title,className,children,handleClick,image, buttonIcon, buttonText}: MeetingModalProps) => {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger></DialogTrigger>
            <DialogContent
                className={"flex w-full max-w-2xl rounded-xl flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white"}>
                <div className={'flex flex-col gap-10'}>
                    {image && (
                        <div className={'flex justify-center items-center'}>
                            <Image
                                src={image}
                                alt={"Image"}
                                width={72}
                                height={72}
                            />
                        </div>)}
                    <h1 className={cn('text-3xl font-bold leading-3', className)}>{title}</h1>
                    {children}
                    <Button className={"bg-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl hover:bg-gray-300 text-black "}
                            onClick={handleClick}>
                        {buttonIcon && (
                            <Image src={buttonIcon} alt={buttonIcon} height={13} width={13} />
                        )} &nbsp;
                        {buttonText || "Schedule Meeting"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    );
};

export default MeetingModal;