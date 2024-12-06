import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    // Creating the token
    const token = jwt.sign({userId},
     process.env.JWT_SECRET,
    {expiresIn: '30d'});

    //Set jwt as an HTTP-only cookie
    // Setting the token 
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    return token
}

export default generateToken;