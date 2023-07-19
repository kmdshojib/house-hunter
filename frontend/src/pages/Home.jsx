import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { homePageStart } from '../features/HomePageData/homePageDataSLice'
import { toast } from 'react-toastify'

const Home = () => {
    const dispatch = useDispatch()
    const { homeData, isLoading } = useSelector(state => state.homeData)
    const auth = useSelector(state => state?.auth)
    const jsonUser = JSON.parse(auth.user)

    console.log({ jsonUser })
    useEffect(() => {
        dispatch(homePageStart())
    }, [dispatch])

    console.log(homeData, isLoading)
    const handleBookings = () => {
        if(!jsonUser){
            toast.warning("Please Login in to book Property!")
        }
    }
    if (isLoading === true) {
        return <div>Loading ...</div>
    }
    return (
        isLoading ? <div>Loading ...</div> : <div className='m-5'>
            {/* rent card */}
            <div className='flex justify-center md:justify-between'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {homeData?.map((item) => {
                        const availableDate = new Date(item?.availableDate).toLocaleDateString();
                        return (
                            <div key={item?._id} className="max-w-xs rounded-md shadow-md bg-white text-gray-900">
                                <img
                                    src={item?.imgUrl}
                                    alt=""
                                    className="object-cover object-center w-full h-48 sm:h-64 rounded-t-md"
                                />
                                <div className="flex flex-col justify-between p-4 sm:p-6 space-y-4">
                                    <div className="space-y-2">
                                        <h2 className="text-xl sm:text-2xl font-semibold tracking-wide">{item.houseName}</h2>
                                        <p>Rent: {item.monthlyRent} Taka</p>
                                        <p>Dates: {availableDate}</p>
                                        <p>Location: {item?.address}, {item?.city}</p>
                                    </div>
                                    {
                                        jsonUser?.type === 'owner' ? <p>You can not book House with your owner account!Please create a renter account </p> : <button onClick={handleBookings}
                                            type="button"
                                            className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-blue-500 text-white"
                                        >
                                            Book now!
                                        </button>
                                    }
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home