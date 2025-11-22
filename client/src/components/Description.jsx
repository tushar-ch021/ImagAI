import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Description = () => {
    // All Gemini sample images
    const geminiImages = [
        assets.gemini_sam_1,
        assets.gemini_sam_2,
        assets.gemini_sam_3,
        assets.gemini_sam_4,
        assets.gemini_sam_5,
        assets.gemini_sam_6,
    ];
    const sampleImages = [
        assets.sample_img1,
        assets.sample_img2,
        assets.sample_img3,
        assets.sample_img4,
        
    ];

    // ----- Hero image rotation -----
    const [currentImgIdx, setCurrentImgIdx] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImgIdx(prev => (prev + 1) % geminiImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // ----- Sample gallery rotation -----
    const [galleryStartIdx, setGalleryStartIdx] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setGalleryStartIdx(prev => (prev + 1) % sampleImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className='flex flex-col items-center justify-center my-12 sm:my-24 p-4 sm:p-6 md:px-28'
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 text-neutral-800 dark:text-white text-center'>
                Create AI Images
            </h1>
            <p className='text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-center text-sm sm:text-base'>
                Turn your imagination into visuals
            </p>

            <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center w-full'>
                <img
                    src={geminiImages[currentImgIdx]}
                    alt=''
                    className='w-full sm:w-80 xl:w-96 rounded-lg'
                />
                <div className='text-center md:text-left'>
                    <h2 className='text-xl sm:text-2xl md:text-3xl font-medium max-w-lg mb-4 text-neutral-800 dark:text-white'>
                        Introducing the AI‑Powered Text to Image Generator
                    </h2>
                    <p className='text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base'>
                        Easily bring your ideas to life with our free AI image generator. Whether you need
                        stunning visuals or unique imagery, our tool transforms your text into high‑quality
                        images in just a few clicks. Imagine it, describe it, and watch it come to life instantly.
                    </p>
                    <p className='text-gray-600 dark:text-gray-300 text-sm sm:text-base'>
                        Simply type in a text prompt, and our cutting‑edge AI will generate high‑resolution
                        images that match your description. From realistic portraits to abstract art, the
                        possibilities are endless.
                    </p>
                </div>
            </div>

            {/* Sample Gallery */}
            <div className='mt-12 sm:mt-16 w-full'>
                <h3 className='text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-neutral-800 dark:text-white text-center'>
                    Sample Creations
                </h3>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4'>
                    {Array.from({ length: 4 }).map((_, i) => {
                        const imgIdx = (galleryStartIdx + i) % sampleImages.length;
                        return (
                            <motion.img
                                key={i}
                                src={sampleImages[imgIdx]}
                                alt={`Sample ${i + 1}`}
                                className='w-full rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer'
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            />
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default Description;
