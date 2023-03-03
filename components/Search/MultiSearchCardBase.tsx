import Link from "next/link";
import { ReactNode } from "react";

export const MultiSearchCardBase = ({ resultID, mediaType, children }: { resultID: number; mediaType: string; children: ReactNode; }) => {

    return (
        <Link key={resultID} className="flex flex-row rounded-md p-3 hover:bg-neutral-900 gap-1" href={`/${mediaType}/${resultID}`} passHref>
            {children}
        </Link>
    );
};
