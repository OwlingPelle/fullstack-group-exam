export interface HttpResponse {
    statusCode: number;
    body: string;
}

export const sendResponse = <T extends object>(statusCode: number, body: T): HttpResponse => {
    return {
        statusCode,
        body: JSON.stringify(body)
    }
}