"use client";
import { Dispatch, Fragment, ReactNode, SetStateAction, useEffect, useState } from "react";
import Spinner from "./SVGComponents/Spinner";

export function LoadingSpinner() {
    return (
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
            <div className="animate-spin w-1/4">
                <Spinner />
            </div>
        </div>
    );
};

export const useRenderComplete = (setRenderComplete: Dispatch<SetStateAction<boolean>>) => {
    useEffect(() => {
        setRenderComplete(true);
    }, [setRenderComplete]);
}

export default function HydrationWrapper({ children }: { children: ReactNode }) {
    const [renderComplete, setRenderComplete] = useState(false);
    useRenderComplete(setRenderComplete);

    if (!renderComplete) return <LoadingSpinner />;
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}