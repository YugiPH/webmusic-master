import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { getGenres } from '../apis/genre';

const Genre = () => {
    const [data, setData] = useState([]);

    const handleGetListGenres = async () => {
        const response = await getGenres()
        if (response.ok) {
            setData(response.data)
        }
    }

    useEffect(() => {
        handleGetListGenres()
    }, []);
    return (
        <>
            {data.map(genre => {
                return (
                    <NavLink key={genre._id} to={`/genre/${genre._id}`}>{genre.name} </NavLink>
                )
            })}
            <Outlet />
        </>

    )
}

export default Genre