import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Categories = () => {
    // selec * from categries
    const categries = [
        { title: "A", id: "1" }
    ]
    return (
        <>
            {categries.map(category => {
                return (
                    <NavLink to={`/categories/${category.id}`}>Categories </NavLink>
                )
            })}
            <Outlet />
        </>

    )
}

export default Categories