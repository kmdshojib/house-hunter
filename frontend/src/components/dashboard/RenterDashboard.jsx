import React, { useEffect, useState } from 'react';
import { getBookingsByStart } from '../../features/bookings/bookingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import instance from '../../api/axios';
import { toast } from 'react-toastify';

const RenterDashboard = () => {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  const { auth } = data;
  const { user } = auth;
  const userData = JSON.parse(user);
  const booking = data.bookingData;

  const [noDataMessage, setNoDataMessage] = useState('');

  useEffect(() => {
    dispatch(getBookingsByStart(userData._id));
  }, [dispatch, userData._id]);

  const handleCancel = (id) => {
    instance
      .delete(`/bookings/deleteBookings/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (res.data.message === 'No Data Available') {
            setNoDataMessage('No bookings available');
          } else {
            dispatch(getBookingsByStart(userData._id));
            toast.success('Bookings deleted successfully');
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  if (booking.Loading) {
    return <div>Loading...</div>
  }
  return (
    <div className='ml-5 mr-5 mt-5'>

      {
        booking.getBookingsById.length === 0 ? <div className='text-xl text-center'>No Bookings yet! </div> : <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>House Name</th>
                <th>House Location</th>
                <th>Cancel Bookings</th>
              </tr>
            </thead>
            <tbody>

              {noDataMessage && (
                <tr>
                  <td colSpan="4" className="text-center">
                    {noDataMessage}
                  </td>
                </tr>
              )}

              {booking?.getBookingsById?.map((item, index) => (
                <tr key={index} className="hover">
                  <th>{index + 1}</th>
                  <td>{item.houseName}</td>
                  <td>{item.houseLoaction}</td>
                  <td onClick={() => handleCancel(item._id)} className="truncate cursor-pointer">
                    <span className="text-red-500 underline">Cancel</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
};

export default RenterDashboard;
