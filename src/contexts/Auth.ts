import { createContext } from "react";

export interface User {
  username: string;
  token: string;
}

export interface UserInput {
  username: string;
  password: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  Authenticate: (user: UserInput) => Promise<void>;
  Register: (user: UserInput) => Promise<void>;
  Logout: () => void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);
