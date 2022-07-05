import * as jwt from 'jsonwebtoken';

export const verifyToken = (token, secret) =>
    jwt.verify(token, secret, (err, decode) => {
        if (err) {
            return false;
        }
        return decode;
    });

export const generateToken = (id: number, secret) => {
    return jwt.sign(id, secret);
};
