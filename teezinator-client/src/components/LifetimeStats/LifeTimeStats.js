import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "../../axiosInstance";

// Mock data for the bar chart

const BarChartMock = () => {
  const [teas, setTeas] = useState([]);
  const [teaStats, setTeaStats] = useState({});
  const [maxValue, setMaxValue] = useState(0);
  const [loading, setLoading] = useState(true); // State to handle loading status

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const statsResponse = await axios.get("stats/getTotalStatsByUser");
        setTeaStats(statsResponse.data);
        const maxStatValue = Math.max(...Object.values(statsResponse.data));
        setMaxValue(maxStatValue);

        const teasResponse = await axios.get("tea/getall");
        setTeas(teasResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
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

  const doesTeaExist = (teaId) => {
    if (teaStats[teaId] === undefined) {
      return "none";
    } else {
      return "flex";
    }
  };

  const calculateWidthPercentage = (teaId) => {
    if (teaStats[teaId] === undefined || maxValue === 0) {
      return "max-content";
    }

    const value = teaStats[teaId] || 0;
    // Calculate the height percentage relative to the maxValue
    return (value / maxValue) * 100 + "%";
  };

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
        {teas.map((tea, index) => (
          <div
            className="stats-row-container"
            key={tea.id}
            style={{
              display: doesTeaExist(tea.id),
              alignItems: "center",
              width: "100%",
            }} // Use flexbox for horizontal layout of each bar
          >
            <p style={{ color: "white", width: "100px", textAlign: "right" }}>
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

export default BarChartMock;
