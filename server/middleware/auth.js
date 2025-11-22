import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.headers;

    console.log('Auth middleware - token received:', token ? 'Yes' : 'No');

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Auth middleware - token decoded:', tokenDecode);

        if (tokenDecode.id) {
            // Attach userId directly to the request object (not body)
            req.userId = tokenDecode.id;
            console.log('Auth middleware - userId set to:', req.userId);
        } else {
            console.log('Auth middleware - No id in token');
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }

        next();

    } catch (error) {
        console.log('Auth middleware - Error:', error.message);
        res.json({ success: false, message: error.message });
    }
};

export default userAuth;
