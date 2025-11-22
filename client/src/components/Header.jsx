import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { motion } from "framer-motion";
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { user, setShowLogin } = useContext(AppContext);
    const navigate = useNavigate();
    const [displayText, setDisplayText] = useState('');
    const fullText = 'Best text to image generator';
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    // Sample images array
    const sampleImages = [
        assets.gemini_sam_1,
        assets.gemini_sam_2,
        assets.gemini_sam_3,
        assets.gemini_sam_4,
        assets.gemini_sam_5,
        assets.gemini_sam_6
    ];

    const [currentImageSet, setCurrentImageSet] = useState(0);

    // Auto-rotate images every 3 seconds
    useEffect(() => {
        const imageInterval = setInterval(() => {
            setCurrentImageSet((prev) => (prev + 1) % sampleImages.length);
        }, 3000);

        return () => clearInterval(imageInterval);
    }, []);

    // Typewriter effect
    useEffect(() => {
        const handleType = () => {
            const i = loopNum % 1;
            const currentText = fullText;

            setDisplayText(
                isDeleting
                    ? currentText.substring(0, displayText.length - 1)
                    : currentText.substring(0, displayText.length + 1)
            );

            setTypingSpeed(isDeleting ? 50 : 150);

            if (!isDeleting && displayText === currentText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, loopNum, typingSpeed]);

    const onClickHandler = () => {
        if (user) {
            navigate('/result');
        } else {
            setShowLogin(true);
        }
    };

    return (
        <motion.div className='flex flex-col justify-center items-center text-center my-20'
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <motion.div className='text-stone-600 dark:text-gray-300 inline-flex text-center gap-2 bg-white dark:bg-gray-800 px-6 py-1 rounded-full border border-neutral-500 dark:border-gray-600'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <p className='min-w-[280px] text-left'>
                    {displayText}
                    <span className='animate-pulse'>|</span>
                </p>
                <img src={assets.star_icon} alt="" />
            </motion.div>

            <motion.h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center text-neutral-800 dark:text-white'>Turn your ideas to <motion.span className='text-blue-600 dark:text-blue-500'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 2 }}
            >image</motion.span>, in seconds.</motion.h1>

            <motion.p className='text-center max-w-xl mx-auto mt-5 text-gray-800 dark:text-gray-300'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen.</motion.p>

            <motion.button onClick={onClickHandler} className='sm:text-lg text-white bg-black dark:bg-gray-700 w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
            >
                Generate Images
                <img className='h-6' src={assets.star_group} alt="" />
            </motion.button>

            <motion.div className='flex flex-wrap justify-center mt-16 gap-3'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                {Array(6).fill('').map((item, index) => {
                    const imageIndex = (currentImageSet + index) % sampleImages.length;
                    return (
                        <motion.img
                            key={index}
                            whileHover={{ scale: 1.05, duration: 0.1 }}
                            className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
                            src={sampleImages[imageIndex]}
                            alt={`Sample ${imageIndex + 1}`}
                            width={70}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    );
                })}
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className='mt-2 text-neutral-600 dark:text-gray-400'>Generated images from ImagAI</motion.p>
        </motion.div>
    );
};

export default Header;
