import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [state, setState] = useState('Login');
    const { setShowLogin, backendUrl, setToken, setUser, loadCreditsData } = useContext(AppContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (state === 'Login') {
                console.log('Attempting login with:', { email });
                const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
                
                console.log('Login response:', data);

                if (data.success) {
                    console.log('Login successful, setting token');
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    
                    // Load user credits data immediately with the new token
                    console.log('Loading user data...');
                    await loadCreditsData(data.token);
                    
                    toast.success('Login successful!');
                    
                    // Close modal after a short delay
                    setTimeout(() => {
                        setShowLogin(false);
                        console.log('Login modal closed');
                    }, 100);
                } else {
                    console.log('Login failed:', data.message);
                    toast.error(data.message);
                }
            } else {
                console.log('Attempting registration with:', { name, email });
                const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
                
                console.log('Registration response:', data);

                if (data.success) {
                    console.log('Registration successful, setting token');
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    
                    // Load user credits data immediately with the new token
                    console.log('Loading user data...');
                    await loadCreditsData(data.token);
                    
                    toast.success('Registration successful!');
                    
                    // Close modal after a short delay
                    setTimeout(() => {
                        setShowLogin(false);
                        console.log('Login modal closed');
                    }, 100);
                } else {
                    console.log('Registration failed:', data.message);
                    toast.error(data.message);
                }
            }
        } catch (error) {
            console.error('Login/Registration error:', error);
            toast.error(error.response?.data?.message || error.message || 'An error occurred');
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm flex justify-center items-center p-4'>
            <motion.form onSubmit={onSubmitHandler}
                initial={{ opacity: 0.2, y: 50 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='relative bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-xl text-slate-500 dark:text-gray-300 w-full max-w-md shadow-xl'>
                <h1 className='text-center text-xl sm:text-2xl text-neutral-700 dark:text-white font-medium'>{state}</h1>
                <p className='text-xs sm:text-sm text-center dark:text-gray-400'>Welcome back! Please sign in to continue</p>

                {state !== 'Login' && <div className='border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                    <img src={assets.profile_icon} alt="" className='w-5 dark:invert' />
                    <input onChange={e => setName(e.target.value)} value={name} className='outline-none text-sm bg-transparent w-full dark:text-white dark:placeholder-gray-400' type="text" placeholder='Full Name' required />
                </div>}

                <div className='border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.email_icon} alt="" className='w-5 dark:invert' />
                    <input onChange={e => setEmail(e.target.value)} value={email} className='outline-none text-sm bg-transparent w-full dark:text-white dark:placeholder-gray-400' type="email" placeholder='Email id' required />
                </div>

                <div className='border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.lock_icon} alt="" className='w-5 dark:invert' />
                    <input onChange={e => setPassword(e.target.value)} value={password} className='outline-none text-sm bg-transparent w-full dark:text-white dark:placeholder-gray-400' type="password" placeholder='Password' required />
                </div>

                <p className='text-xs sm:text-sm text-blue-600 dark:text-blue-400 my-4 cursor-pointer'>Forgot password?</p>

                <button className='bg-blue-600 dark:bg-blue-500 w-full text-white py-2 rounded-full text-sm sm:text-base hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors'>{state === 'Login' ? 'login' : 'create account'}</button>

                {state === 'Login' ? <p className='mt-5 text-center text-xs sm:text-sm dark:text-gray-400'>Don't have an account? <span className='text-blue-600 dark:text-blue-400 cursor-pointer' onClick={() => setState('Sign Up')}>Sign up</span></p>
                    :
                    <p className='mt-5 text-center text-xs sm:text-sm dark:text-gray-400'>Already have an account? <span className='text-blue-600 dark:text-blue-400 cursor-pointer' onClick={() => setState('Login')}>Login</span></p>}

                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer w-6 dark:invert' alt="" />
            </motion.form>
        </div>
    );
};

export default Login;
