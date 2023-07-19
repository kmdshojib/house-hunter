import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import instance from './../../api/axios';
import { toast } from 'react-toastify';
import PhoneInput from "react-phone-input-2";
import { getHomeByIdStart } from '../../features/gethomebyid/getHomebyIdSlice';

const AddHomeModal = () => {
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.auth);

    const jsonUser = JSON.parse(user)

    const addHome = (data) => {
        const { houseName, address, availableDate, city, bathrooms, roomSize, picture, rent, phoneNumber, description, bedrooms } = data;
        const homeData = {
            houseName,
            address,
            city,
            description,
            imgUrl: picture,
            monthlyRent: rent,
            phoneNumber,
            roomSize,
            bedrooms,
            bathrooms,
            availableDate,
            userId: jsonUser._id
        };
        instance.post("/home/addHome", homeData)
            .then(res => {
                if (res) {
                    reset()
                    dispatch(getHomeByIdStart(jsonUser._id))
                    toast.success("Home added successfully!")
                }
            }).catch(eror => {
                console.error(eror)
            })
        console.log({ homeData })
    };
    if (isLoading) {
        return <div>Loading ...</div>
    }
    return (
        <>
            <input type="checkbox" id="addHomeModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label htmlFor="addHomeModal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-center">Add Home</h3>
                    <form onSubmit={handleSubmit(addHome)}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="houseName" className="block mb-2 text-sm">House Name</label>
                                <input
                                    type="text"
                                    name="houseName"
                                    id="houseName"
                                    placeholder="House Name"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800"
                                    {...register('houseName', { required: 'House Name is required', pattern: { message: 'Invalid Home Name' } })}
                                />
                                {errors.houseName && <p className="text-red-500 text-xs">{errors.houseName.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="address" className="block mb-2 text-sm">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    placeholder="Address"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800"
                                    {...register('address', { required: 'Address is required', pattern: { message: 'Invalid Home address' } })}
                                />
                                {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="date" className="block mb-2 text-sm">Available Date</label>
                                <input
                                    type="date"
                                    name="availableDate"
                                    id="availableDate"
                                    placeholder="Available Date"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800"
                                    {...register('availableDate', { required: 'Date is required.', pattern: { message: 'Invalid Dates.' } })}
                                />
                                {errors.availableDate && <p className="text-red-500 text-xs">{errors.availableDate.message}</p>}
                            </div>


                            <div>
                                <label htmlFor="city" className="block mb-2 text-sm">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    placeholder="City"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800"
                                    {...register('city', { required: 'City is required' })}
                                />
                                {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="bedrooms" className="block mb-2 text-sm">Bedrooms</label>
                                <input
                                    type="number"
                                    name="bedrooms"
                                    id="bedrooms"
                                    placeholder="Number of Bedrooms"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800"
                                    {...register('bedrooms', { required: 'Number of Bedrooms is required' })}
                                />
                                {errors.bathrooms && <p className="text-red-500 text-xs">{errors.bathrooms.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="bathrooms" className="block mb-2 text-sm">Bathrooms</label>
                                <input
                                    type="number"
                                    name="bathrooms"
                                    id="bathrooms"
                                    placeholder="Number of Bathrooms"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800"
                                    {...register('bathrooms', { required: 'Number of Bathrooms is required' })}
                                />
                                {errors.bathrooms && <p className="text-red-500 text-xs">{errors.bathrooms.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="roomSize" className="block mb-2 text-sm">Room Size</label>
                                <input
                                    type="text"
                                    name="roomSize"
                                    id="roomSize"
                                    placeholder="Room Size"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800"
                                    {...register('roomSize', { required: 'Room Size is required' })}
                                />
                                {errors.roomSize && <p className="text-red-500 text-xs">{errors.roomSize.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="picture" className="block mb-2 text-sm">Image URL</label>
                                <input
                                    type="text"
                                    name="picture"
                                    id="picture"
                                    placeholder='Image URL'
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800"
                                    {...register('picture', { required: 'Picture is required' })}
                                />
                                {errors.picture && <p className="text-red-500 text-xs">{errors.picture.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="rent" className="block mb-2 text-sm">Rent per Month</label>
                                <input
                                    type="number"
                                    name="rent"
                                    id="rent"
                                    placeholder="Rent per Month"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800"
                                    {...register('rent', { required: 'Rent per Month is required' })}
                                />
                                {errors.rent && <p className="text-red-500 text-xs">{errors.rent.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="phoneNumber" className="block mb-2 text-sm">Phone Number</label>
                                <Controller
                                    control={control}
                                    name="phoneNumber"
                                    rules={{ required: 'Phone Number is required' }}
                                    render={({ field }) => (
                                        <PhoneInput
                                            country="bd"
                                            placeholder="Phone Number"
                                            className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    placeholder="Description"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800"
                                    {...register('description', { required: 'Description is required' })}
                                />
                                {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2 mt-3">
                            <div>
                                <button type="submit" className="w-full px-8 py-3 font-semibold rounded text-white btn-primary">Add Home</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>

    )
}

export default AddHomeModal