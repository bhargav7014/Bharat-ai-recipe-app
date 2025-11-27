import React, { useEffect } from "react";
import { getUser } from "../storage/storage";

export default function AuthLoading({ navigation }) {
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const user = await getUser();
    if (user) navigation.replace("Main");
    else navigation.replace("Login");
  };

  return null;
}
