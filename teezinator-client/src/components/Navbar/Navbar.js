import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ minHeight: "80px" }}>
        {" "}
        {/* Increase toolbar height */}
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
            <img
              src="images/TeezinatorLogo.png"
              alt="Logo"
              style={{
                height: "100px", // Adjust logo size if necessary
                marginRight: "10px",
                verticalAlign: "middle",
                padding: "10px",
              }}
            />
            Teezinator
          </a>
        </Typography>
        <Button
          color="inherit"
          href="/stats"
          sx={{
            backgroundColor: "rgba(255,255,255,0.1)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)",
            },
            margin: "0 25px",
            padding: "10px 20px",
            boxShadow: "0 2px 2px -1px rgba(0,0,0,0.2)",
          }}
        >
          Stats
        </Button>
        <Button
          color="inherit"
          href="/addTea"
          sx={{
            backgroundColor: "rgba(255,255,255,0.1)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)",
            },
            margin: "0 25px",
            padding: "10px 20px",
            boxShadow: "0 2px 2px -1px rgba(0,0,0,0.2)",
          }}
        >
          Add tea
        </Button>
        <Button
          color="inherit"
          href="/leaderboard"
          sx={{
            backgroundColor: "rgba(255,255,255,0.1)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)",
            },
            margin: "0 25px",
            padding: "10px 20px",
            boxShadow: "0 2px 2px -1px rgba(0,0,0,0.2)",
          }}
        >
          Leaderboard
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
