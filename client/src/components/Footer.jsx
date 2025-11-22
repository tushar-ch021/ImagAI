import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <div className='flex items-center justify-between gap-4 py-3 mt-20'>
            <img src={assets.logo} alt="" width={190} className='dark:invert' />
            <p className='flex-1 border-l border-gray-400 dark:border-gray-600 pl-4 text-sm text-gray-500 dark:text-gray-400 max-sm:hidden'>Copyright @Tushar Chaudhary | All right reserved.</p>
            <div className='flex gap-2.5'>
                <img src={assets.facebook_icon} alt="" width={30} className='dark:invert' />
                <img src={assets.twitter_icon} alt="" width={30} className='dark:invert' />
                <img src={assets.instagram_icon} alt="" width={30} className='dark:invert' />
            </div>
        </div>
    );
};

export default Footer;
