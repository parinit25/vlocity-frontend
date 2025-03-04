import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.exp * 1000 > Date.now()) {
        return parsedUser;
      } else {
        localStorage.removeItem("user");
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    console.log("User in AuthContext:", user);
    const checkToken = setInterval(() => {
      if (user && isTokenExpired()) {
        refreshToken();
      }
    }, 60000);
    return () => clearInterval(checkToken);
  }, [user]);

  const getUserData = async (accessToken) => {
    try {
      const decodedToken = jwtDecode(accessToken);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/auth/profile`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const updatedUser = { ...data.user, accessToken, exp: decodedToken.exp };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      alert("Error fetching user data. Please try again.");
    }
  };

  const refreshToken = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/refreshToken`
      );
      getUserData(data.accessToken);
    } catch (error) {
      console.error("Token refresh error:", error);
      alert("Session expired. Please log in again.");
      logout();
    }
  };

  const login = async (formData) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
        formData
      );
      localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
      getUserData(data.accessToken);
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const signup = async (formData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/signup`,
        formData
      );
      await login({ email: formData.email, password: formData.password });
    } catch (error) {
      console.error("Signup error:", error);
      alert(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isTokenExpired = () => {
    return !user || !user.exp || user.exp * 1000 < Date.now();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isTokenExpired,
        signup,
        refreshToken,
        getUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
