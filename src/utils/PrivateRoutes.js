import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {
    let user = JSON.parse(localStorage.getItem('user'))

    return (
        user ? <Outlet/> : <Navigate to = '/'/>
    )
}

export default PrivateRoutes