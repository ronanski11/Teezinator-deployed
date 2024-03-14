import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import Home from "./components/Home/Home";
import RequireAuth from "./RequireAuth";
import "./App.css";
import Stats from "./components/Stats/Stats";
import AddTea from "./components/AddTea/AddTea";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import FullWeekStats from "./components/FullWeekStats/FullWeekStats";

function App() {
  // State to manage theme mode

  // Create a theme instance based on the current mode
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const ProtectedRoutes = () => {
    return (
      <RequireAuth>
        <Outlet />
      </RequireAuth>
    );
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />{" "}
      {/* Normalize CSS and apply baseline styles based on the theme */}
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* Wrap the routes that require authentication under a single ProtectedRoutes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/addTea" element={<AddTea />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/week" element={<FullWeekStats />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
