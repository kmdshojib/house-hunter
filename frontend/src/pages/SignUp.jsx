import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import instance from './../api/axios';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const handleFormSubmit = async (data) => {
        try {
            const response = await instance.post("/users/signup", data);
            if (response.status === 200) {
                navigate("/signin")
            }
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white text-gray-800 shadow-lg mx-auto mt-16">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
                <p className="text-sm text-gray-400">Sign Up to create your account.</p>
            </div>
            <form noValidate="" action="" className="space-y-12" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm">Full Name</label>
                        <input {...register("name", { required: true })} type="text" name="name" id="name" placeholder="Name" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                        <input type="email" name="email" id="email" placeholder="eample@mail.com" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800" required
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="accountType" className="block mb-2 text-sm">Account Type</label>
                        <select name="accountType" id="accountType" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800" required {...register("type", { required: true })}>
                            <option value="owner">Owner</option>
                            <option value="renter">Renter</option>
                        </select>
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="password" className="text-sm">Password</label>
                        </div>
                        <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800" required
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>
                </div>
                <div className="space-y-2">
                    <div>
                        <button type="submit" className="w-full px-8 py-3 font-semibold rounded text-white btn-primary ">Sign up</button>
                    </div>
                    <p className="px-6 text-sm text-center text-gray-400">Have an account?
                        <Link to="/signin" className="hover:underline text-primary"> Sign In</Link>.
                    </p>
                </div>
            </form>
        </div>
    )
}

export default SignUp