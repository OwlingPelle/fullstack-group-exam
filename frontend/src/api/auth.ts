export type AccountRole = "admin" | "staff" | "customer";

export type AuthSession = {
  username: string;
  token: string;
  role: AccountRole;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type RegistrationInput = {
  username: string;
  password: string;
  email: string;
};

export type RegistrationResponse = {
  success: true;
  message: string;
  user: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeRole(role: string): AccountRole {
  switch (role.trim().toLowerCase()) {
    case "admin":
      return "admin";
    case "staff":
    case "personnel":
      return "staff";
    case "customer":
      return "customer";
    default:
      throw new Error("This account has an unsupported role.");
  }
}

async function postJson(path: string, payload: unknown, fallbackMessage: string): Promise<unknown> {
  const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");
  if (!apiUrl) {
    throw new Error("Set VITE_API_URL in frontend/.env.local to your deployed backend URL.");
  }

  const response = await fetch(`${apiUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const rawResponse = await response.text();
  let data: unknown;
  try {
    data = rawResponse ? JSON.parse(rawResponse) : {};
  } catch {
    data = { message: rawResponse };
  }

  if (!response.ok) {
    const message = isRecord(data) && typeof data.message === "string"
      ? data.message
      : fallbackMessage;
    throw new Error(message);
  }

  return data;
}

export async function login(credentials: LoginCredentials): Promise<AuthSession> {
  const data = await postJson("/login", credentials, "Could not sign in.");
  if (
    !isRecord(data) ||
    typeof data.token !== "string" ||
    typeof data.role !== "string"
  ) {
    throw new Error("The backend login response is missing account information.");
  }

  return {
    username: credentials.username,
    token: data.token,
    role: normalizeRole(data.role),
  };
}

export async function register(user: RegistrationInput): Promise<RegistrationResponse> {
  const data = await postJson("/register", user, "Could not create account.");
  if (
    !isRecord(data) ||
    data.success !== true ||
    typeof data.message !== "string" ||
    typeof data.user !== "string"
  ) {
    throw new Error("The backend registration response is invalid.");
  }

  return {
    success: true,
    message: data.message,
    user: data.user,
  };
}