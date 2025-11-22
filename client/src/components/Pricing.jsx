import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Pricing = () => {
    const navigate = useNavigate();

    const plans = [
        {
            id: 'Basic',
            price: 10,
            credits: 100,
            desc: 'Best for trying out imagify'
        },
        {
            id: 'Advanced',
            price: 50,
            credits: 500,
            desc: 'Best for small business'
        },
        {
            id: 'Business',
            price: 250,
            credits: 5000,
            desc: 'Best for enterprise'
        }
    ];

    return (
        <motion.div className='min-h-[60vh] sm:min-h-[80vh] text-center py-6 sm:py-10 mb-8 sm:mb-12 px-4'
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <button className='border border-gray-400 px-6 sm:px-10 py-2 rounded-full mb-4 sm:mb-6 text-sm sm:text-base text-neutral-800 dark:text-white dark:border-gray-600'>Our Plans</button>
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-10 text-neutral-800 dark:text-white'>Choose the plan</h1>

            <div className='flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 text-left max-w-6xl mx-auto'>
                {plans.map((item, index) => (
                    <motion.div 
                        key={index} 
                        className='bg-white dark:bg-gray-800/50 drop-shadow-sm border dark:border-gray-700 rounded-lg py-8 sm:py-12 px-6 sm:px-8 text-gray-600 dark:text-gray-300 hover:scale-105 transition-all duration-500 w-full sm:w-auto sm:flex-1 sm:max-w-xs'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <img width={40} src={assets.logo_icon} alt="" className='dark:invert' />
                        <p className='mt-3 mb-1 font-semibold text-lg'>{item.id}</p>
                        <p className='text-sm'>{item.desc}</p>
                        <p className='mt-6'>
                            <span className='text-2xl sm:text-3xl font-medium'>${item.price}</span> <span className='text-sm'>/ {item.credits} credits</span>
                        </p>
                        <button onClick={() => navigate('/buy')} className='w-full bg-gray-800 dark:bg-gray-600 text-white mt-6 sm:mt-8 text-sm rounded-md py-2.5 hover:bg-gray-900 dark:hover:bg-gray-500 transition-colors'>Get Started</button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Pricing;
