import { router, useRouter } from "next/router";
import { useEffect } from "react";
import { isAuthenticated } from "../auth";

export default function protectPage() {
  const router = useRouter();
  useEffect(() => {
    const isAuth = isAuthenticated;
    console.log("isAuth:", isAuth)
    if (!isAuth) {
      router.push("/foodies/login");
    }
  }, []);
}

