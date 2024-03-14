import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import axios from "../../axiosInstance";

const DailyStats = () => {
  const [dailyStats, setDailyStats] = useState([]);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    fetchDailyStats();
  }, []);

  const fetchDailyStats = async () => {
    const response = await axios.get("stats/getTotalDailyStatsByUser");
    // Assuming the response data is in the desired Map format or needs conversion
    const data = response.data;
    // Convert object to an array format suitable for rendering
    const statsArray = Object.entries(data).map(([day, totalTeaDrank]) => ({
      day,
      totalTeaDrank,
    }));
    setDailyStats(statsArray);

    // Find the maximum value among the teaStats
    const maxStatValue = Math.max(
      ...statsArray.map((stat) => stat.totalTeaDrank)
    );
    setMaxValue(maxStatValue);
  };

  const calculateWidthPercentage = (totalTeaDrank) => {
    if (maxValue === 0) return "0%";
    return `${(totalTeaDrank / maxValue) * 100}%`;
  };

  return (
    <div className="lifetime-stats-container">
      <h1 style={{ margin: "10px" }}>Daily stats</h1>
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
        {dailyStats.map((dailyStat, index) => (
          <div
            className="stats-row-container"
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p
              style={{
                color: "white",
                width: "100px",
                textAlign: "right",
                textWrap: "nowrap",
              }}
            >
              {dailyStat.day}
            </p>
            <div className="stats-bar-container">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "40px",
                  width: calculateWidthPercentage(dailyStat.totalTeaDrank),
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
                  {dailyStat.totalTeaDrank}
                </span>
              </Box>
            </div>
            <Button
              color="inherit"
              href="/leaderboard"
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

export default DailyStats;
