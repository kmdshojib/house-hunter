import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homePageStart, setCurrentPage } from '../features/HomePageData/homePageDataSLice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BookingsModal from '../components/Modal/BookingsModal';
import useTitle from '../hooks/useTitle';

const Home = () => {
    useTitle("Home")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { homeData, isLoading, currentPage } = useSelector((state) => state.homeData);
    const auth = useSelector((state) => state?.auth);
    const jsonUser = JSON.parse(auth.user);

    useEffect(() => {
        dispatch(homePageStart(currentPage));
    }, [dispatch, currentPage]);

    console.log(homeData, isLoading);
    const handleBookings = () => {
        if (!jsonUser) {
            toast.warning('Please Login in to book Property!');
            navigate('/signin');
        }
    };

    const handleNextPage = () => {
        dispatch(setCurrentPage(currentPage + 1));
    }

    const handlePreviousPage = () => {
        dispatch(setCurrentPage(currentPage - 1));
    };

    if (isLoading || homeData === null) {
        return <div>Loading ...</div>;
    }

    return (
        <div className='m-5'>
            {/* rent card */}
            <div className='flex justify-center md:justify-around'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                    {homeData.map((item) => {
                        const availableDate = new Date(item?.availableDate).toLocaleDateString();
                        return (
                            <div key={item?._id} className='max-w-xs rounded-md shadow-md bg-white text-gray-900'>
                                <img
                                    src={item?.imgUrl}
                                    alt=''
                                    className='object-cover object-center w-full h-48 sm:h-64 rounded-t-md'
                                />
                                <div className='flex flex-col justify-between p-4 sm:p-6 space-y-4'>
                                    <div className='space-y-2'>
                                        <h2 className='text-xl sm:text-2xl font-semibold tracking-wide'>{item.houseName}</h2>
                                        <p>Rent: {item.monthlyRent} Taka</p>
                                        <p>Dates: {availableDate}</p>
                                        <p>Location: {item?.address}, {item?.city}</p>
                                    </div>
                                    {jsonUser?.type === 'owner' ? (
                                        <p>You cannot book a house with your owner account! Please create a renter account.</p>
                                    ) : (
                                        <>
                                            <BookingsModal
                                                houseName={item.houseName}
                                                houseLoaction={item.address}
                                                email={jsonUser?.email}
                                                userId={jsonUser?._id}
                                                name={jsonUser?.name}
                                            />
                                            <label
                                                htmlFor="bookingModal"
                                                onClick={handleBookings}
                                                type='button'
                                                className='flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-blue-500 text-white'
                                            >
                                                Book now!
                                            </label>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='flex justify-center mt-5 mb-5'>
                <div className="join grid grid-cols-2 w-50">
                    <button onClick={handlePreviousPage} className="join-item btn btn-outline">Previous page</button>
                    <button onClick={handleNextPage} className="join-item btn btn-outline">Next</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
