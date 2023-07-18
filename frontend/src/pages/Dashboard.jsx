import React from 'react'
import { useSelector } from 'react-redux';
import OwnerDashboard from '../components/dashboard/OwnerDashboard';
import RenterDashboard from '../components/dashboard/RenterDashboard';

const Dashboard = () => {
    const { user, isLoading } = useSelector((state) => state.auth);


    if (isLoading) {
        return <div>Loading...</div>
    }
    const userData = JSON.parse(user)

    return (
        <>
            {
                userData.type === "owner" ? <OwnerDashboard /> : <RenterDashboard />
            }
        </>
    )
}

export default Dashboard