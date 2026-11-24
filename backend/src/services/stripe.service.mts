// Stripe anropet
// Ai ville göra any - jag böt till att det blev secret och string.
// Tydligt interface för vad ett lyckat svar ska innehålla.
export interface SuccessBody {
  clientSecret: string;
}

// Skicka tillbaka ett lyckat svar.
export const successResponse = (body: SuccessBody) => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Aceess-Controll-Allow-Headers": "Content-Type",
      "Access-Controll-Allow-Methods": "OPTIONS,POST",
    },
    body: JSON.stringify(body),
  };
};

// Skicka tillbaks ett fel.
export const errorResponse = (statusCode: number, message: string) => {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST",
    },
  };
};
