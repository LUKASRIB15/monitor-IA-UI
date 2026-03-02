import { create } from "zustand";

type UserDTO = {
  name: string;
  email: string;
  role: "STUDENT" | "INSTRUCTOR";
};

type AuthState = {
  accessToken: string | null;
  userLogged: UserDTO | null;
  addUser: (data: UserDTO) => void;
  removeUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => {
  return {
    accessToken: null,
    userLogged: null,
    addUser: (data: UserDTO) => {
      set({
        userLogged: data,
      });
    },
    removeUser: () => {
      set({
        accessToken: null,
        userLogged: null,
      });
    },
  };
});
