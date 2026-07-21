import axiosInstance from "../axios";
import type { AxiosResponse } from "axios";
import type { User } from "@/store/auth";

interface LoginResponse {
  user: User;
  token: string;
}

type AuthAPIType = {
  login: (
    email: string,
    password: string,
  ) => Promise<AxiosResponse<LoginResponse>>;
  getUser: () => Promise<User>;
  //   confirmAuth: (token: string) => Promise<any>;
  //   oAuthSignIn: (token: string) => Promise<any>;
  //   checkEmail: (email: string) => Promise<any>;
  //   resendToken: (email: string) => Promise<any>;
  //   updateProfile: (profileData: any) => Promise<any>;
  //   verifyEmail: (token: string) => Promise<any>;
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
};

export default AuthService;
