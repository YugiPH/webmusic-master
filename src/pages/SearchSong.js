import React from 'react'
import { useSearchParams } from 'react-router-dom';

const SearchSong = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";

    return (
        <div>SearchSong</div>
    )
}

export default SearchSong