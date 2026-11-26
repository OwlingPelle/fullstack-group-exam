import type { MiddlewareObj } from "@middy/core";
import createError from "http-errors";
import type { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.mjs";

type AuthenticatedEvent = {
    headers?: Record<string, string | undefined>;
    user?: string | JwtPayload;
};

export const authenticateUser = (): MiddlewareObj<AuthenticatedEvent> => ({
    before: (request) => {
        const authHeader = request.event.headers?.authorization;
        if (!authHeader) {
            throw createError(401, "Token is missing");
        }

        const [scheme, token] = authHeader.split(/\s+/);
        if (scheme?.toLowerCase() !== "bearer" || !token) {
            throw createError(401, "Token is missing");
        }

        request.event.user = verifyToken(token);
    }
});