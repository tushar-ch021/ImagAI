import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Upcoming = () => {
    const navigate = useNavigate();

    return (
        <motion.div 
            className='min-h-[80vh] flex flex-col items-center justify-center px-4 text-center'
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className='bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-md w-full'>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <img src={assets.logo_icon} alt="Logo" className='w-16 h-16 mx-auto mb-6 dark:invert' />
                </motion.div>
                
                <h1 className='text-3xl font-bold text-gray-800 dark:text-white mb-4'>Coming Soon!</h1>
                <p className='text-gray-600 dark:text-gray-300 mb-8'>
                    We are working hard to bring you this feature. The payment gateway integration is currently under development and will be available shortly.
                </p>

                <button 
                    onClick={() => navigate('/')}
                    className='bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-300'
                >
                    Back to Home
                </button>
            </div>
        </motion.div>
    );
};

export default Upcoming;
