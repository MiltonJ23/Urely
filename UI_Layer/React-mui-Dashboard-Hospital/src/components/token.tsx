import { jwtDecode } from "jwt-decode";  // Default import

const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<{ exp?: number }>(token); // Ensure type safety

    if (!decodedToken.exp) {
      return true; // No expiration claim means it's invalid or doesn't expire
    }

    return Date.now() >= decodedToken.exp * 1000;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Assume expired if decoding fails
  }
};

export default isTokenExpired;