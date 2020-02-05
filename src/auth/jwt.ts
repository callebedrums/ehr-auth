
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = 'very-long-secret-string-to-generate-jwt-tokens';

const identifyToken = (token: string, attr: string, req: Request, res: Response, next: NextFunction) => {
    jwt.verify(token, secret, (err: any, payload: any) => {
        if (err) {
            // if the token is invalid, reject the call
            return res.status(403).json({ status: 'error', message: 'invalid token' });;
        }

        (req as any)[attr] = payload;

        next();
    });
};

export const authorizationJWT = (payload: any) => jwt.sign({ type: 'authorization', ...payload }, secret, { expiresIn: 60 }); // 1 minute
export const authenticationJWT = (payload: any) => jwt.sign({ type: 'authentication', ...payload }, secret, { expiresIn: 15 * 60 }); // 15 minutes
export const refreshJWT = (payload: any) => jwt.sign({ type: 'refresh', ...payload }, secret, { expiresIn: 24 * 60 * 60 }); // 24 hours

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = /^[Bb]earer (.*)$/.exec(req.headers.authorization || '')[1] || '';
    identifyToken(token, 'authenticationPayload', req, res, next);
};

export const validateToken = async (token: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err: any, payload: any) => {
            if (err) {
                return reject(err);
            }

            resolve(payload);
        });
    });
};