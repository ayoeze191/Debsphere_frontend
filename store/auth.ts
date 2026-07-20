import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface User {
  _id?: string;
  email: string;
  referralCode: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  countryOfResidence?: string;
  emailVerified: boolean;
  nameOnCertificate?: string;
  profileImage?: string;
  favoriteCourses?: string[];
  points?: number;
  referredUsers?: string[];
}

interface Token {
  token: string;
}

interface AuthState {
  user: User | null;
  token: Token | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
  getInitials: () => string;
  logout: (callback?: () => void) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
        setToken: (token) => {
          localStorage.setItem("token", token);
          set({ token: { token } });
        },
        getInitials: () => {
          const user = get().user;
          const firstName = user?.firstName;
          const lastName = user?.lastName;
          const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
          return initials;
        },
        logout: (callback) => {
          if (callback) callback();
          localStorage.removeItem("token");
          set({ user: null, token: null });
        },
      }),
      { name: "authStore" },
    ),
  ),
);
