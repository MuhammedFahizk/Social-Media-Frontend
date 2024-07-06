import { useEffect, useState } from "react";
import { verifyUser } from "../auth/authUser";

const useAuthenticatedRedirect = () => {
  const [loading, setLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await verifyUser(); // Your authentication verification function
        console.log("Verification response:", res);
        setIsTokenValid(true); // Set authentication status based on verification
      } catch (error) {
        console.error("Verification error:", error);
        setIsTokenValid(false); // Set authentication status to false if verification fails
      } finally {
        setLoading(false); // Set loading state to false once verification is done
      }
    };

    checkToken();
  }, []);

  return { isTokenValid, loading };
};

export default useAuthenticatedRedirect;
