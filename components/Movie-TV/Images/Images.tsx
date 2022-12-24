import { ReactNode } from "react";

function Widget({ children, className }: { children: ReactNode, className?: string }) {
    className = className == undefined ? "" : className;
    return (
        <div className={["mt-4", className].join(" ")}>
            {children}
        </div>
    )
}


function WidgetTitle({ title }: { title: string }) {
    return <p className="font-semibold text-xl text-neutral-100 mb-3">{title}</p>;
}

function GridContainer({ children }: { children: ReactNode }) {
    return (
        <div className="md:ml-2 md:mr-2">
            <div className="grid grid-cols-2 justify-items-center sm:grid-cols-4 lg:grid-cols-6">
                {children}
            </div>
        </div>
    )
}

Widget.Title = WidgetTitle;
Widget.ImagesWrapper = GridContainer;
export { Widget };