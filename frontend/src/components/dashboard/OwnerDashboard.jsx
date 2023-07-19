import React, { useEffect, useState } from 'react';
import AddHomeModal from '../Modal/AddHomeModal';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeByIdStart } from '../../features/gethomebyid/getHomebyIdSlice';
import instance from '../../api/axios';
import { toast } from 'react-toastify';


const OwnerDashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(true);
  const [homeData, setHomeData] = useState(data)
  const { auth } = data;
  const { user } = auth;
  const userData = JSON.parse(user)

  useEffect(() => {

    instance.get(`/home/gethomebyid/${userData._id}`)
      .then((result) => {
        const data = result.data;
        setHomeData(data)
        setIsLoading(false)
      }).catch(err => {
        console.log(err)
      })

  }, [userData])

  const handleDelete = (id) => {
    console.log(id)
    setIsLoading(true);
    instance
      .delete(`/home/deleteHome/${id}`)
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          toast.success("Deleted successfully!");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
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
                homeData.map((item, index) => (
                  <tr className="hover:bg-gray-100" key={index}>
                    <th>{index + 1}</th>
                    <td className="truncate">{item.houseName}</td>
                    <td className="truncate">{item.city}, {item.address}</td>
                    <td className="truncate cursor-pointer">
                      <span className="text-blue-500 underline">Edit</span>
                    </td>
                    <td onClick={() => handleDelete(item._id)} className="truncate cursor-pointer">
                      <span className="text-red-500 underline">Delete</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
};

export default OwnerDashboard;