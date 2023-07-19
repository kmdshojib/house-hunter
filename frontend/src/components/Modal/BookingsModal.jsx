import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import instance from '../../api/axios';
import { toast } from 'react-toastify';
import PhoneInput from "react-phone-input-2";
import { useNavigate } from 'react-router-dom';


const BookingsModal = ({ houseName, houseLoaction, email, name, userId }) => {
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm();

    const { isLoading } = useSelector(state => state.auth);
    const navigate = useNavigate()

    const addBookings = (data) => {
        const { email, name, phoneNumber } = data;

        const bookingData = {
            email,
            name,
            phoneNumber,
            houseLoaction,
            houseName,
            userId
        }

        instance.post(`bookings/bookings`, bookingData)
            .then(response => {
                if (response) {
                    toast.success(response.message)
                    navigate("/dashboard")
                    reset()
                }
            }).catch(error => {
                console.log({ error })
            })
    };
    if (isLoading) {
        return <div>Loading ...</div>
    }
    return (
        <>
            <input type="checkbox" id="bookingModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label htmlFor="bookingModal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-center">Add Home</h3>
                    <form onSubmit={handleSubmit(addBookings)}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="Name" className="block mb-2 text-sm"> Name</label>
                                <input
                                    type="text"
                                    name="Name"
                                    id="Name"
                                    placeholder=" Name"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800"
                                    {...register('name', { required: ' Name is required', pattern: { message: 'Invalid  Name' } })}
                                    defaultValue={name} readOnly
                                />
                                {errors.houseName && <p className="text-red-500 text-xs">{errors.houseName.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email address"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800"
                                    {...register('email', { required: 'Email address is required', pattern: { message: 'Invalid Email address' } })}
                                    defaultValue={email}

                                />
                                {errors.email && <p className="text-red-500 text-xs">{errors.houseName.message}</p>}
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

                        </div>

                        <div className="space-y-2 mt-3">
                            <div>
                                <button type="submit" className="w-full px-8 py-3 font-semibold rounded text-white btn-primary">Book Now!</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>

    )
}

export default BookingsModal