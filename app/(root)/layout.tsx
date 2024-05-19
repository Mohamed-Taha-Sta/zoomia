import React, {ReactNode} from 'react';
import {StreamVideoProvider} from "@/providers/StreamClientProvider";

const RootLayout = ({children}: { children: ReactNode }) => {
    return (
        <div>
            <StreamVideoProvider>
                {children}
            </StreamVideoProvider>
        </div>
    );
};

export default RootLayout;