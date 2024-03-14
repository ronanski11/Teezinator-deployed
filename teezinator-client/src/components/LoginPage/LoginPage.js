import React, { useState, useEffect } from "react";
import axios from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../../RequireAuth";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormHelperText,
} from "@mui/material";
import Footer from "../Footer/Footer";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("TeezinatorToken");
    if (token && isTokenValid(token)) {
      navigate("/"); // Redirect to homepage if token is valid
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth/authenticate",
        {
          username,
          password,
        }
      );
      const token = response.data.token;
      setCookie("TeezinatorToken", token, 1); // Store the token for 1 day

      navigate("/"); // Redirect to the homepage
    } catch (err) {
      setError("Failed to login");
      console.error(err);
    }
  };

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

  const getCookie = (name) => {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Teezinator 🍵
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <FormControl fullWidth margin="normal">
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            {error && <FormHelperText error>{error}</FormHelperText>}
          </Box>
        </Box>
      </Container>{" "}
      <Footer />
    </div>
  );
};

export default LoginPage;
