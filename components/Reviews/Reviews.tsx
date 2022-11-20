import { ReactNode } from "react";

export const Reviews = ({ className, children }: { className?: string; children: ReactNode; }) => {
    return (
        <div className={`${className}`}>
            <p className="font-semibold text-2xl text-neutral-100 mb-3">Comments</p>
            {children}
        </div>
    );
};
