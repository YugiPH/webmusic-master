import { createContext, useState, useContext } from "react";

const SongContext = createContext({
    search: "",
    setSearch: () => { }
});

export const SongProvider = ({ children }) => {
    const [song, setSong] = useState("");

    return (
        <SongContext.Provider value={{ song, setSong }}>
            {children}
        </SongContext.Provider>
    );
};

export const useGetSongBySearch = () => {
    return useContext(SongContext);
};
