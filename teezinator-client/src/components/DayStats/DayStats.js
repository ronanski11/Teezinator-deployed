import { Box } from "@mui/system";
import React from "react";
import { CircularProgress } from "@mui/material";

const DayStats = ({ teaStats, teas, day }) => {
  const calculateWidthPercentage = (teaId) => {
    const maxValue = Math.max(...Object.values(teaStats));
    if (!teaStats[teaId] || maxValue === 0) {
      return "max-content";
    }
    const value = teaStats[teaId] || 0;
    return (value / maxValue) * 100 + "%";
  };

  const doesTeaExist = (teaId) => {
    // Check if teaStats is an object and not null
    if (typeof teaStats === "object" && teaStats !== null) {
      return teaId in teaStats ? "flex" : "none";
    } else {
      // Handle the case where teaStats is not an object
      console.error("teaStats is not an object:", teaStats);
      return "none"; // or any other fallback you deem appropriate
    }
  };

  const getDayOfWeek = (day) => {
    // Convert Day-Month-Year to a format JavaScript understands (Month-Day-Year)
    const parts = day.split("-");
    const formattedDate = `${parts[1]}-${parts[0]}-${parts[2]}`;
    const date = new Date(formattedDate);
    const days = [
      "Sonntag",
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
    ];

    return days[date.getDay()];
  };

  const dayOfWeek = getDayOfWeek(day);

  day = day.replace(/-/g, ".");

  const sortedTeas = [...teas].sort((a, b) => {
    const statsA = teaStats[a.id] || 0;
    const statsB = teaStats[b.id] || 0;
    return statsB - statsA; // Sort in descending order
  });

  return (
    <div style={{ margin: "1rem" }}>
      <h1 style={{ margin: "10px" }}>
        {dayOfWeek} | {day}
      </h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Adjust the main axis to vertical
          justifyContent: "center",
          gap: "10px", // Adjust gap for vertical spacing
          alignItems: "center", // Align items centrally along the cross axis
          height: "auto", // Adjust height to auto to accommodate the content
          backgroundColor: "#1c1c1c",
          borderRadius: "5px",
          padding: "25px",
          width: "100%", // Adjust width as needed
        }}
      >
        {sortedTeas.map((tea, index) => (
          <div
            className="stats-row-container"
            key={tea.id}
            style={{
              display: doesTeaExist(tea.id),
              alignItems: "center",
              width: "100%",
            }} // Use flexbox for horizontal layout of each bar
          >
            <p style={{ color: "white", width: "150px", textAlign: "right" }}>
              {tea.name}
            </p>
            <div className="stats-bar-container">
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "70px", // Fixed height for the horizontal bars
                  // Use calculateWidthPercentage to dynamically set the width
                  width: `${calculateWidthPercentage(tea.id)}`,
                  backgroundColor: tea.colour || "grey",
                  borderRadius: "5px",
                  textAlign: "center",
                  color: "black", // Keep text color for visibility
                  marginLeft: "10px", // Add some margin to separate label from the bar
                }}
              >
                <span
                  style={{
                    marginLeft: "15px",
                    color: "white",
                    fontSize: "30px",
                  }}
                >
                  {teaStats[tea.id] || 0}
                </span>
                <img
                  src={`data:image/jpeg;base64,${tea.image}`}
                  style={{ height: "100%", borderRadius: "5px" }}
                  alt={`Tea ${tea.name}`}
                ></img>
              </Box>
            </div>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default DayStats;
