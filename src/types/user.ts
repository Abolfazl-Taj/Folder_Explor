import { Dispatch, SetStateAction } from "react";

export type userType = {
  id: string;
  email: string;
};

export type userContextType = {
  user: userType | null | undefined;
  setUser: Dispatch<SetStateAction<userType | null | undefined>>;
};
