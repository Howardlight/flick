"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

//TODO: Finish autocomplete in the future
export default function SearchBar() {

    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        // console.log(event, query);
        router.push(`/search/${query}/1`);
    }


    return (
        <form onSubmit={handleSubmit} className='flex flex-row ml-4 mr-4 mb-1 md:justify-center'>
            <input
                type="text"
                className="block grow md:grow-0 px-4 py-2 md:w-[80%] rounded-tl-sm rounded-bl-sm text-red-600 bg-white"
                id="query"
                placeholder="..."
                onChange={(e) => setQuery(e.target.value)}
                required
            />
            <button
                className="transition-all delay-50 px-4 text-white bg-red-600 rounded-tr-sm rounded-br-sm hover:bg-red-800"
                type={"submit"}
            >
                Search
            </button>
        </form>
    );
}