export const getUserDetails = async () => {
    const token = sessionStorage.getItem("authToken");  
  
    if (!token) {
      console.error("Token is missing");
      return;
    }
  
    try {
      const response = await fetch("/api/auth/get-user", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
  
      const userData = await response.json();
      console.log(userData);  // Handle user data
    } catch (error) {
      console.error(error);
    }
  };
  