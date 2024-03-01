import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { router } from "next/router";

export default function protectPage( children ) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Check if localStorage is available (client-side only)
      if (typeof window !== "undefined") {
        // Check if token exists in localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          // If token doesn't exist, redirect to login page
          router.push("/foodies/login");
          return;
        }

        // Fetch user data using the token
        try {
          const response = await fetch("/api/user/verificaToken", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            // User authenticated, continue rendering the page
            setLoading(false);
          } else {
            // If the GET request fails, redirect to login page
            router.push("/foodies/login");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Redirect to login page in case of an error
          router.push("/foodies/login");
        }
      }
    }

    fetchData();
  }, []);

  // Render children when not loading
  return <>{!loading && children}</>;
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
