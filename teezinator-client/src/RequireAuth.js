import React from "react";
import { Navigate } from "react-router-dom";

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    // Decode the token payload
    const base64Url = token.split(".")[1]; // Payload part
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const { exp } = JSON.parse(jsonPayload);

    // Get the current time in seconds
    const currentTime = Date.now() / 1000;

    // Check if the token has expired
    return exp > currentTime;
  } catch (error) {
    // Handle decoding error or invalid token
    console.error("Error validating token:", error);
    return false;
  }
};

const RequireAuth = ({ children }) => {
  // Retrieve token from cookies
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  const tokenCookie = cookies.find((cookie) =>
    cookie.startsWith("TeezinatorToken=")
  );
  const token = tokenCookie ? tokenCookie.split("=")[1] : null;

  if (!isTokenValid(token)) {
    // Redirect to the login page
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
