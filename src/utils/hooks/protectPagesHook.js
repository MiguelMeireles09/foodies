// useProtectPage.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProtectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/foodies/login");
          return;
        }
        try {
          const response = await fetch("/api/user/verificaToken", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setUserData(data); // Set user data on success
            setLoading(false);
          } else {
            router.push("/foodies/login");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          router.push("/foodies/login");
        }
      }
    }

    fetchData();
  }, []);

  return { loading, userData };
}












// export default function protectPage() {
//   useEffect(() => {
//     // Check if localStorage is available (client-side only)
//     if (typeof window !== "undefined") {
//       // Check if token exists in localStorage
//       const token = localStorage.getItem("token");
//       console.log("tokenperfil:", token);
//       if (!token) {
//         console.log("tokenperfil:", token);
//         // If token doesn't exist, redirect to login page
//         router.push("/foodies/login");
//       }
//     }
//   }, []);
// }
