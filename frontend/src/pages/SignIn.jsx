import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice';

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleFormSubmit = async (data) => {
        dispatch(login(data))
    }

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    return (
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white text-gray-800 shadow-lg mx-auto mt-16">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
                <p className="text-sm text-gray-400">Sign In to access your account.</p>
            </div>
            <form noValidate="" action="" className="space-y-12" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="space-y-4">

                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                        <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800" required
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="password" className="text-sm">Password</label>
                        </div>
                        <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-800" required
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <div>
                        <button type="submit" className="w-full px-8 py-3 font-semibold rounded text-white btn-primary ">Sign In</button>
                    </div>
                    <p className="px-6 text-sm text-center text-gray-400">Don't Have an account?
                        <Link to="/signup" className="hover:underline text-primary "> Sign Up</Link>.
                    </p>
                </div>
            </form>
        </div>
    )
}

export default SignIn;