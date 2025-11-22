import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credit, setCredit] = useState(false);
    const [dailyGenerations, setDailyGenerations] = useState(0);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
        setCredit(false);
        setDailyGenerations(0);
    };

    const loadCreditsData = async (authToken) => {
        try {
            const tokenToUse = authToken || token;
            console.log('Loading credits data with token:', tokenToUse);
            const { data } = await axios.get(backendUrl + '/api/user/credits', { headers: { token: tokenToUse } });

            console.log('Credits data response:', data);

            if (data.success) {
                setCredit(data.credits);
                setUser(data.user);
                setDailyGenerations(data.user.dailyGenerations || 0);
        // Reset daily limit for free users after 12 pm if they haven't generated today
        const now = new Date();
        if (now.getHours() >= 12) {
            const lastGen = data.user.lastGenerationDate ? new Date(data.user.lastGenerationDate) : null;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (!lastGen || lastGen < today) {
                // It's a new day after noon – give free users fresh quota
                setDailyGenerations(0);
            }
        }
            } else {
                // If token is invalid, logout
                console.log('Token invalid, logging out');
                logout();
            }

        } catch (error) {
            console.log('Error loading credits:', error);
            // Only logout if it's an authentication error
            if (error.response && error.response.status === 401) {
                logout();
            }
        }
    };

    const generateImage = async (prompt, authToken) => {
    try {
        const tokenToUse = authToken || token;
        console.log('Generating image with token:', tokenToUse);
        const { data } = await axios.post(backendUrl + '/api/image/generate-image', { prompt }, { headers: { token: tokenToUse } });

        if (data.success) {
            // Refresh credits after successful generation
            await loadCreditsData(tokenToUse);
            return data.resultImage;
        } else {
            toast.error(data.message);
            // Refresh credits on failure as well (e.g., out of credits)
            await loadCreditsData(tokenToUse);
            if (data.creditBalance === 0) {
                navigate('/buy');
            }
            if (data.limitReached) {
                navigate('/buy');
            }
        }
    } catch (error) {
        console.error('Image generation error:', error);
        toast.error(error.message);
    }
};

    useEffect(() => {
        if (token) {
            console.log('Token found, loading credits data');
            loadCreditsData();
        }
    }, [token]);

    const value = {
        user, setUser,
        showLogin, setShowLogin,
        backendUrl,
        token, setToken,
        credit, setCredit,
        dailyGenerations, setDailyGenerations,
        loadCreditsData,
        logout,
        generateImage,
        theme, toggleTheme
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
