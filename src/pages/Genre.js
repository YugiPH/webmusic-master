import React, { useEffect, useState } from 'react'
import { getGenres } from '../apis/genre';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const Genre = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate()

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
        <div style={{ backgroundColor: 'white', width: '100%', padding: 24, gap: '1rem', display: 'flex', flexWrap: 'wrap' }}>
            {data.map(genre => {
                return (
                    <Card
                        key={genre._id}
                        style={{ cursor: 'pointer', height: 'fit-content', width: '200px', display: 'flex', justifyContent: 'center', backgroundColor: '#31a2fb' }}
                        onClick={() => navigate(`/genre/${genre._id}`)} >
                        <h2 style={{ color: 'white' }}>{genre.name} </h2>
                    </Card>
                )
            })}
        </div>

    )
}

export default Genre