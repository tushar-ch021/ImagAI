import React, { useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const { user, setShowLogin, logout, dailyGenerations, credit, theme, toggleTheme } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Navbar - user state:', user);
        console.log('Navbar - dailyGenerations:', dailyGenerations);
        if (user && credit === 0) {
            // toast.info('You have no credits left. Please purchase a subscription.');
        }
    }, [user, dailyGenerations, credit]);

    return (
        <div className='flex items-center justify-between py-4'>
            <Link to='/'>
                <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40 dark:invert' />
            </Link>

            <div className='flex items-center gap-4'>
                <button onClick={toggleTheme} className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>

                {user ?
                    <div className='flex items-center gap-2 sm:gap-3'>
                        <button onClick={() => navigate('/buy')} className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
                            <p className='text-xs sm:text-sm font-medium'>Pricing</p>
                        </button>
                        <div className='flex items-center gap-2 bg-purple-100 dark:bg-purple-900/50 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full'>
                            {credit > 0 ? (
                                <p className='text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200'>Credits: {credit}</p>
                            ) : (
                                <p className='text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200'>Daily: {Math.max(0, 5 - dailyGenerations)}/5</p>
                            )}
                        </div>
                        <p className='text-gray-800 dark:text-white max-sm:hidden pl-4'>Hi, {user.name}</p>
                        <div className='relative group'>
                            <img src={assets.profile_icon} className='w-8 drop-shadow' alt="" />
                            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                                <ul className='list-none m-0 p-2 bg-white dark:bg-gray-800 rounded-md border dark:border-gray-700 text-sm'>
                                    <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded'>Logout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='flex items-center gap-2 sm:gap-5'>
                        <p onClick={() => navigate('/buy')} className='cursor-pointer dark:text-white'>Pricing</p>
                        <button onClick={() => setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full'>Login</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;
