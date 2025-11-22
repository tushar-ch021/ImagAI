import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Result = () => {
    const sampleImages = [
        
                assets.gemini_sam_1,
                assets.gemini_sam_2,
                assets.gemini_sam_3,
                assets.gemini_sam_4,
                assets.gemini_sam_5,
                assets.gemini_sam_6
    ];

    const [currentSampleIndex, setCurrentSampleIndex] = useState(0);
    const [image, setImage] = useState(sampleImages[0]);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');

    const { generateImage } = useContext(AppContext);

    // Auto-rotate sample images every 3 seconds
    useEffect(() => {
        if (!isImageLoaded) {
            const interval = setInterval(() => {
                setCurrentSampleIndex((prev) => {
                    const nextIndex = (prev + 1) % sampleImages.length;
                    setImage(sampleImages[nextIndex]);
                    return nextIndex;
                });
            }, 9000);

            return () => clearInterval(interval);
        }
    }, [isImageLoaded]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (input) {
            const generatedImage = await generateImage(input);
            if (generatedImage) {
                setIsImageLoaded(true);
                setImage(generatedImage);
            }
        }
        setLoading(false);
    };

    return (
        <motion.form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center px-4'
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className='w-full max-w-lg'>
                <div className='relative'>
                    <motion.img 
                        key={image}
                        src={image} 
                        alt="" 
                        className='w-full max-w-sm mx-auto rounded'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
                </div>
                <p className={`text-center mt-2 ${!loading ? 'hidden' : ''}`}>Loading.....</p>
            </div>

            {!isImageLoaded &&
                <div className='flex w-full max-w-xl bg-neutral-500 dark:bg-gray-700 text-white text-sm p-0.5 mt-10 rounded-full'>
                    <input 
                        onChange={e => setInput(e.target.value)} 
                        value={input} 
                        type="text" 
                        placeholder='Describe what you want to generate' 
                        className='flex-1 bg-transparent outline-none ml-4 sm:ml-8 placeholder-color text-sm' 
                    />
                    <button type='submit' className='bg-zinc-900 dark:bg-gray-900 px-6 sm:px-10 md:px-16 py-3 rounded-full text-sm'>Generate</button>
                </div>
            }

            {isImageLoaded &&
                <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
                    <p onClick={() => { setIsImageLoaded(false); setImage(sampleImages[0]); }} className='bg-transparent border border-zinc-900 dark:border-gray-500 text-black dark:text-white px-6 sm:px-8 py-3 rounded-full cursor-pointer text-sm'>Generate Another</p>
                    <a href={image} download className='bg-zinc-900 dark:bg-gray-700 px-8 sm:px-10 py-3 rounded-full cursor-pointer text-sm'>Download</a>
                </div>
            }
        </motion.form>
    );
};

export default Result;
