import { userType } from "@/types/user";
import React from "react";
import { getRequest } from "./fetchRequest";
import { setToLocalStorage } from "./localStorgeRequest";

const refreshUser = async (setUser: (user: userType) => void) => {
  const res = await getRequest({ url: "/api/me" });
  if (res.user) {
    setUser(res.user);
    setToLocalStorage("user", res.user);
  }
};

export default refreshUser;
