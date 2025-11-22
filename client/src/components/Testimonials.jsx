import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Testimonials = () => {

    const testimonialsData = [
        {
            name: 'Donald Jackman',
            role: 'Graphic Designer',
            stars: 5,
            text: 'I\'ve been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.'
        },
        {
            name: 'Richard Nelson',
            role: 'Content Creator',
            stars: 4,
            text: 'I\'ve been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.'
        },
        {
            name: 'James Washington',
            role: 'Co-Founder',
            stars: 5,
            text: 'I\'ve been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.'
        }
    ];

    return (
        <motion.div className='flex flex-col items-center justify-center my-12 sm:my-20 py-8 sm:py-12 px-4'
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 text-neutral-800 dark:text-white text-center'>Customer testimonials</h1>
            <p className='text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 text-center text-sm sm:text-base'>What Our Users Are Saying</p>

            <div className='flex flex-col sm:flex-row flex-wrap justify-center gap-6 w-full max-w-6xl'>
                {testimonialsData.map((item, index) => (
                    <motion.div 
                        key={index} 
                        className='bg-white/20 dark:bg-gray-800/50 p-8 sm:p-12 rounded-lg shadow-md border dark:border-gray-700 w-full sm:w-80 cursor-pointer hover:scale-105 transition-all duration-700'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className='flex flex-col items-center'>
                            <img src={assets.profile_icon} alt="" className='rounded-full w-14 dark:invert' />
                            <h2 className='text-lg sm:text-xl font-semibold mt-3 text-neutral-800 dark:text-white'>{item.name}</h2>
                            <p className='text-gray-600 dark:text-gray-400 mb-4 text-sm'>{item.role}</p>
                            <div className='flex mb-4'>
                                {Array(item.stars).fill().map((_, i) => (
                                    <img key={i} src={assets.rating_star} alt="" />
                                ))}
                            </div>
                            <p className='text-center text-sm text-gray-700 dark:text-gray-300'>{item.text}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Testimonials;
