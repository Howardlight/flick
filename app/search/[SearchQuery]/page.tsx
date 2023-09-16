import { Search } from "../../../components/Search/SearchBox";
import { Metadata } from "next";

interface SearchParams {
    SearchQuery: string;
    Page: string; // Does not exist here, this page only has SearchQuery
}

export async function generateMetadata({ params }: { params: SearchParams }): Promise<Metadata> {
    return { title: `Searched for ${params.SearchQuery} - Flick` };
}

export default function SearchPage({ params }: { params: SearchParams }) {
    return <Search searchQuery={params.SearchQuery} startPage={1} />;
}