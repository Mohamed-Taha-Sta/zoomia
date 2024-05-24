'use client'
import React from 'react';
import Image from "next/image";
import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";
import {sidebarLinks} from "@/constants";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

const MobileNav = () => {
    const pathName = usePathname()

    return (
        <section className={"w-full max-w-[264px]"}>
            <Sheet>
                <SheetTrigger asChild>
                    <Image
                        src={"/icons/hamburger.svg"}
                        alt={"Hamburger Menu"}
                        width={36}
                        height={36}
                        className={"cursor-pointer sm:hidden"}
                    />
                </SheetTrigger>
                <SheetContent side={"left"} className={"border-none bg-dark-1"}>
                    <Link href={"/"}
                          className={"flex items-center gap-1"}>
                        <Image src={"/icons/logo.png"} alt={"Zoomia logo"}
                               height={32} width={32} className={"max-sm:size-10"}/>
                        <p className={"text-[26px] font-extrabold text-white"}>Zoomia</p>
                    </Link>
                    <div className={"flex h-[calc(100vh-72px)] flex-col " +
                        "justify-between overflow-y-auto"}>
                        <SheetClose asChild>
                            <section className={"flex h-full gap-6 pt-16 flex-col text-white"}>
                                {sidebarLinks.map((link) => {
                                    const isActive = pathName === link.route || pathName.startsWith(link.route) && link.label !== 'Home';
                                    return (
                                        <SheetClose asChild key={link.route}>
                                            <Link href={link.route} key={link.label}
                                                  className={cn('flex gap-4 items-center p-4 justify-start rounded-xl', {
                                                      'bg-white text-black': isActive,
                                                  })}>
                                                <Image
                                                    src={link.imgUrl}
                                                    alt={link.label}
                                                    width={24}
                                                    height={24}
                                                    className={cn("", {"invert": isActive})}
                                                />
                                                <p className={"text-lg font-semibold "}>
                                                    {link.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </section>
                        </SheetClose>

                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default MobileNav;