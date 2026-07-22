import axiosInstance from "../axios";
import type { AxiosResponse } from "axios";
import type { User } from "@/store/auth";

interface LoginResponse {
  user: User;
  token: string;
}

// interface SignupResponse {

// }
interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
type AuthAPIType = {
  login: (
    email: string,
    password: string,
  ) => Promise<AxiosResponse<LoginResponse>>;
  getUser: () => Promise<User>;
  signup: (payload: SignupPayload) => Promise<AxiosResponse<User>>;
};

const AuthService: AuthAPIType = {
  login: async (email: string, password: string) => {
    return await axiosInstance.post("/auth/login", {
      email,
      password,
    });
  },
  getUser: async () => {
    return (await axiosInstance.get("auth/user")).data;
  },
  signup: async (payload: SignupPayload) => {
    return await axiosInstance.post("/auth/register", payload);
  },
};

export default AuthService;
