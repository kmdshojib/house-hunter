import React, { useEffect } from 'react';
import AddHomeModal from '../Modal/AddHomeModal';
import { useDispatch, useSelector } from 'react-redux';

import instance from '../../api/axios';
import { toast } from 'react-toastify';
import UpdateHomeModal from '../Modal/UpdateHomeModal';
import { getHomeByIdStart } from '../../features/gethomebyid/getHomebyIdSlice';


const OwnerDashboard = () => {
  const data = useSelector((state) => state);
  const dispatch = useDispatch()

  const { auth } = data;
  const { getHomeById } = data;
  const { isLoading } = getHomeById;
  const { user } = auth;
  const userData = JSON.parse(user)

  useEffect(() => {
    dispatch(getHomeByIdStart(userData._id))

  }, [dispatch, userData._id])

  console.log({ getHomeById, isLoading })
  const handleDelete = (id) => {
    console.log(id)

    instance
      .delete(`/home/deleteHome/${id}`)
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          toast.success("Deleted successfully!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };



  return (
    <div className="mr-4 ml-4">
      {/* dashboard header */}
      <div className="flex justify-between mt-5 mb-5">
        <div>
          <h3 className="text-center mt-1 text-2xl">Hello, {userData.name}</h3>
        </div>
        <div>
          <label htmlFor="addHomeModal" className="btn btn-primary">Add Home</label>
          <AddHomeModal />
        </div>
      </div>
      <hr />
      {/* table */}
      <div className='mt-3 mb-5'>
        <div className="overflow-x-auto">
          {getHomeById?.getDataById?.length > 0 ?
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>House Name</th>
                  <th>City & Address</th>
                  <th>Edit Your Home</th>
                  <th>Delete Your Home</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">Loading ...</td>
                  </tr>
                ) : (
                  getHomeById?.getDataById?.map((item, index) => (
                    <tr className="hover:bg-gray-100" key={index}>
                      <th>{index + 1}</th>
                      <td className="truncate">{item.houseName}</td>
                      <td className="truncate">{item.city}, {item.address}</td>
                      <td className="truncate cursor-pointer">
                        <label htmlFor="updateHomeModal" className="text-blue-500 underline">Edit</label>
                        <UpdateHomeModal
                          id={item._id}
                          houseName={item.houseName}
                          address={item.address}
                          availableDate={item.availableDate}
                          city={item.city}
                          bathrooms={item.bathrooms}
                          roomSize={item.roomSize}
                          imgUrl={item.imgUrl}
                          rent={item.monthlyRent}
                          phoneNumber={item.phoneNumber}
                          description={item.description}
                          bedrooms={item.bedrooms}
                          userId={item.userId}
                        />
                      </td>
                      <td onClick={() => handleDelete(item._id)} className="truncate cursor-pointer">
                        <span className="text-red-500 underline">Delete</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            : <div>No Propertices yet! Pease CLick Add home to add new Propertice!</div>
          }
        </div>
      </div>
    </div>

  );
};

export default OwnerDashboard;