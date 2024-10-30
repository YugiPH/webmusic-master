import React from 'react'
import { useParams } from 'react-router-dom';

const CategoryDetail = () => {
    const params = useParams();
    const { categoryId } = params
    console.log("categoryId:", categoryId)
    return (
        <div>CategoryDetail {categoryId}</div>
    )
}

export default CategoryDetail