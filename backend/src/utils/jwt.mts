import jwt from 'jsonwebtoken';
import createError from 'http-errors';

type TokenPayload = {
    username: string;
    role: string;
};

const getJwtSecret = (): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw createError(500, 'JWT_SECRET is not configured');
    }
    return secret;
};

export const signToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, getJwtSecret(), { expiresIn: '1h' });
}

export const verifyToken = (token: string): string | jwt.JwtPayload => {
    const secret = getJwtSecret();
    try {
        return jwt.verify(token, secret);
    } catch {
        throw createError(401, 'Invalid token');
    }
}