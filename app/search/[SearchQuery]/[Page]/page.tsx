import { Metadata } from "next";
import { Search } from "../../../../components/Search/SearchBox";

interface SearchParams {
    SearchQuery: string;
    Page: string;
}

export async function generateMetadata({ params }: { params: SearchParams }): Promise<Metadata> {
    return { title: `Searched for ${params.SearchQuery} - Flick` };
}

function validateStartPage(page: string | undefined): number {
    try {
        return page ? parseInt(page) : 1
    } catch (error) { return 1 };
}

export default function SearchPage({ params }: { params: SearchParams }) {
    const page = validateStartPage(params.Page);
    return <Search searchQuery={params.SearchQuery} startPage={page} />;
}