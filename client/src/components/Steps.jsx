import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Steps = () => {
    return (
        <motion.div className='flex flex-col items-center justify-center my-16 sm:my-32 px-4'
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 text-neutral-800 dark:text-white text-center'>How it works</h1>
            <p className='text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-center'>Transform Words Into Stunning Images</p>

            <div className='space-y-4 w-full max-w-3xl'>
                <motion.div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 px-4 sm:px-8 bg-white/20 dark:bg-gray-800/50 shadow-md border dark:border-gray-700 cursor-pointer hover:scale-105 transition-all duration-500 rounded-lg'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <img src={assets.step_icon_1} alt="" width={30} className='flex-shrink-0 hidden sm:block dark:invert' />
                    <div>
                        <h2 className='text-lg sm:text-xl font-medium text-neutral-800 dark:text-white'>Describe Your Vision</h2>
                        <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300'>Type a phrase, sentence, or paragraph that describes the image you want to create.</p>
                    </div>
                </motion.div>

                <motion.div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 px-4 sm:px-8 bg-white/20 dark:bg-gray-800/50 shadow-md border dark:border-gray-700 cursor-pointer hover:scale-105 transition-all duration-500 rounded-lg'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <img src={assets.step_icon_2} alt="" width={30} className='flex-shrink-0 hidden sm:block dark:invert' />
                    <div>
                        <h2 className='text-lg sm:text-xl font-medium text-neutral-800 dark:text-white'>Watch the Magic</h2>
                        <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300'>Our AI-powered engine will transform your text into a high-quality, unique image in seconds.</p>
                    </div>
                </motion.div>

                <motion.div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 px-4 sm:px-8 bg-white/20 dark:bg-gray-800/50 shadow-md border dark:border-gray-700 cursor-pointer hover:scale-105 transition-all duration-500 rounded-lg'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <img src={assets.step_icon_3} alt="" width={30} className='flex-shrink-0 hidden sm:block dark:invert' />
                    <div>
                        <h2 className='text-lg sm:text-xl font-medium text-neutral-800 dark:text-white'>Download & Share</h2>
                        <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300'>Instantly download your creation or share it with the world in just one click.</p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Steps;
