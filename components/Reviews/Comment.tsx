import { Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

//TODO: Check Performance and use callback or memoization
export const Comment = ({ text, className }: { text: string; className?: string; }): React.ReactElement => {
    // logic clarification: is showMoreButton needed?
    // yes, substring and button. 
    // no, dump the bio

    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });


    const [showMore, setShowMore] = useState(false);
    useEffect(() => {
        if (text.length > 250)
            setShowMore(true);

    }, [text.length]);

    if (!text || text == "")
        return <Fragment></Fragment>;
    return (
        <div className={`${className}`}>
            <p className="inline">
                {
                    showMore ?
                        isMobile ?
                            `${text.substring(0, 250)}`
                            : `${text.substring(0, 750)}`
                        : text
                }
            </p>
            {showMore ? <div className="flex items-center justify-center z-10 relative font-semibold bottom-6 backdrop-blur-sm hover:cursor-pointer hover:contrast-150" onClick={() => setShowMore(false)}>Show more</div> : <Fragment />}
        </div>
    );
};
