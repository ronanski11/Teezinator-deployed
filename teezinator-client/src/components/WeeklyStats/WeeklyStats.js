import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button, CircularProgress } from "@mui/material";
import axios from "../../axiosInstance";

const WeeklyStats = () => {
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [maxValue, setMaxValue] = useState(0);
  const [loading, setLoading] = useState(true); // State to handle loading status

  useEffect(() => {
    const fetchWeeklyStats = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get("stats/getTotalWeeklyStatsByUser");
        // Assuming the response data is in the desired Map format or needs conversion
        const data = response.data;
        // Convert object to an array format suitable for rendering
        const statsArray = Object.entries(data).map(
          ([week, totalTeaDrank]) => ({
            week,
            totalTeaDrank,
          })
        );
        setWeeklyStats(statsArray);

        // Find the maximum value among the teaStats
        const maxStatValue = Math.max(
          ...statsArray.map((stat) => stat.totalTeaDrank)
        );
        setMaxValue(maxStatValue);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchWeeklyStats();
  }, []);

  if (loading) {
    return (
      <div className="lifetime-stats-container">
        <h1 style={{ margin: "10px" }}>Lifetime stats</h1>
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
          <p style={{ margin: "30px", color: "white" }}>Loading</p>{" "}
          <CircularProgress /> {/* Loading indicator */}
        </Box>
      </div>
    );
  }

  const calculateWidthPercentage = (totalTeaDrank) => {
    if (maxValue === 0) return "0%";
    return `${(totalTeaDrank / maxValue) * 100}%`;
  };

  return (
    <div className="lifetime-stats-container">
      <h1 style={{ margin: "10px" }}>Weekly stats</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          alignItems: "center",
          height: "auto",
          backgroundColor: "#1c1c1c",
          borderRadius: "5px",
          padding: "25px",
          width: "100%",
        }}
      >
        {weeklyStats.map((weeklyStat, index) => (
          <div
            className="stats-row-container"
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p style={{ color: "white", width: "100px", textAlign: "right" }}>
              {weeklyStat.week}
            </p>
            <div className="stats-bar-container">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "40px",
                  width: calculateWidthPercentage(weeklyStat.totalTeaDrank),
                  backgroundColor: "grey",
                  borderRadius: "5px",
                  textAlign: "center",
                  color: "black",
                  marginLeft: "10px",
                }}
              >
                <span
                  style={{
                    marginLeft: "15px",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  {weeklyStat.totalTeaDrank}
                </span>
              </Box>
            </div>
            <Button
              color="inherit"
              href={`/week?week=${weeklyStat.week}`}
              sx={{
                backgroundColor: "rgba(255,255,255,0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
                margin: "0 10px",
                padding: "10px 15px",
                boxShadow: "0 2px 2px -1px rgba(0,0,0,0.2)",
                whiteSpace: "nowrap", // Prevents text from wrapping to a new line
              }}
            >
              See more
            </Button>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default WeeklyStats;
