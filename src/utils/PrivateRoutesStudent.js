import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutesStudent() {
    let user = JSON.parse(localStorage.getItem('user'))

    return (
        !user?.isStaff? <Outlet/> : <Navigate to = '/'/>
    )
}

export default PrivateRoutesStudent