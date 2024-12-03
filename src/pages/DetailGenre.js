import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { isSubset } from '../utils/compareArray';
import getUserInfo from '../utils/getUserInfo';
import { getGenreById } from '../apis/genre';
import { getFavoriteId } from '../apis/favoriteSong';
import SongCard from '../components/SongCard';

const DetailGenre = () => {
    const params = useParams();
    const { id } = params

    const [data, setData] = useState([]);
    const [favoriteUser, setFavoriteUser] = useState([]);
    const userInfo = getUserInfo();

    const handleGetDetailGenres = async () => {
        const response = await getGenreById(id)
        if (response.ok) {
            setData(response.data.songs)
        }
    }

    const fetchfavorite = async () => {
        const response = await getFavoriteId(userInfo._id)
        if (response.data) {
            setFavoriteUser(response.data.favoriteId)
        }
    }

    useEffect(() => {
        handleGetDetailGenres()
        fetchfavorite()
    }, []);

    return (
        <div>
            {data.map(song => (
                <SongCard
                    key={song._id}
                    id={song._id}
                    title={song.title}
                    imageUrl={song.imageUrl}
                    isFavorite={isSubset(favoriteUser, song.favoriteId)}
                />
            ))
            }
        </div>
    )
}

export default DetailGenre