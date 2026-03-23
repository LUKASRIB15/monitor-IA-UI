import { create } from "zustand";

export type UserDTO = {
  name: string;
  email: string;
  role: "STUDENT" | "INSTRUCTOR";
};

type AuthState = {
  userLogged: UserDTO | null;
  addUser: (data: UserDTO) => void;
  removeUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => {
  return {
    userLogged: null,
    addUser: (data: UserDTO) => {
      set({
        userLogged: data,
      });
    },
    removeUser: () => {
      set({
        userLogged: null,
      });
    },
  };
});
