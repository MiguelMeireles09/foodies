import { router } from "next/router";
import { useEffect } from "react";

export default function protectPage() {
  useEffect(() => {
    // Check if localStorage is available (client-side only)
    if (typeof window !== "undefined") {
      // Check if token exists in localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("tokenperfil:", token);
        // If token doesn't exist, redirect to login page
        router.push("/foodies/login");
      }
    }
  }, []);
}
