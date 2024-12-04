import React, { useEffect, useState } from 'react'
import { useGetSongBySearch } from '../context/songContext';
import { getFavoriteId } from '../apis/favoriteSong';
import getUserInfo from '../utils/getUserInfo';
import SongCard from '../components/SongCard';
import { isSubset } from '../utils/compareArray';

const SearchSong = () => {
    const { song } = useGetSongBySearch();
    const userInfo = getUserInfo();
    const [favoriteUser, setFavoriteUser] = useState([]);

    const fetchfavorite = async () => {
        const response = await getFavoriteId(userInfo._id)
        if (response.data) {
            setFavoriteUser(response.data.favoriteId)
        }
    }

    useEffect(() => {
        if (userInfo)
            fetchfavorite()
    }, []);

    return (
        <div style={{ padding: 24, gap: '1rem', display: 'flex', flexWrap: 'wrap', backgroundColor: 'white', width: '100%' }}>
            {song.map(item => {
                return (
                    <SongCard
                        key={item._id}
                        id={item._id}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        isFavorite={isSubset(favoriteUser, item.favoriteId)}
                    />
                )
            }
            )}
        </div>
    )
}

export default SearchSong