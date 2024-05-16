import React from 'react';
import {SignIn} from "@clerk/nextjs";

const SignInPage = () => {
    return (
        <main className={"flex h-screen w-full justify-center items-center"}>
            <SignIn/>
        </main>
    );
};

export default SignInPage;