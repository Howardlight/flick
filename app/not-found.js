import { IconSearch } from "@tabler/icons-react";
import { Navbar } from "../components/Navbar";

//TODO: Fix Text Color Styling, for some reason <p> is not taking text color styles!
export default function Custom404() {
    return (
        <div className="w-[100vw] h-[100vh] flex flex-col">
            <Navbar />
            <div className="flex flex-col justify-center items-center grow">
                <IconSearch
                    // color={"rgb(115 115 115)"}
                    height={128} width={128} />
                <h1 className="text-3xl text-neutral-200">404</h1>
                <p className="text-neutral-500">It seems what you&apos;re looking for is not found</p>
            </div>
        </div>
    );
};
