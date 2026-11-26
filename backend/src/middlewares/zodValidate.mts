import type { MiddlewareObj } from "@middy/core";
import createError from "http-errors";
import type { ZodType } from "zod";

type EventWithBody = {
    body: unknown;
};

export const zodValidate = <T,>(schema: ZodType<T>): MiddlewareObj<EventWithBody> => ({
    before: (request) => {
        const result = schema.safeParse(request.event.body);
        if (!result.success) {
            throw createError(
                400,
                result.error.issues[0]?.message ?? "Invalid request body",
            );
        }
        request.event.body = result.data;
    }
});