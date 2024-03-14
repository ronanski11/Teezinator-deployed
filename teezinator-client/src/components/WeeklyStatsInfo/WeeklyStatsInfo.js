import React, { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress, // Import CircularProgress for loading indicator
} from "@mui/material";
import moment from "moment";

const TeaStatsTable = ({ week }) => {
  const [consumedTeas, setConsumedTeas] = useState([]);
  const [loading, setLoading] = useState(false); // Initialize loading state

  useEffect(() => {
    setLoading(true); // Start loading before fetching data
    axios
      .get("/stats/getWeeklyInfo", { params: { week } })
      .then((response) => {
        setConsumedTeas(response.data);
      })
      .catch((error) => console.error("There was an error!", error))
      .finally(() => setLoading(false)); // Stop loading regardless of the outcome
  }, [week]);

  const formatTime = (time) => {
    return (
      getDayOfWeek(moment(time).format("DD-MM-YYY")) +
      moment(time).format(" | HH:mm")
    );
  };

  const getDayOfWeek = (day) => {
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

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Take up full viewport height
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ margin: "1rem", width: "fit-content" }}>
      <h1 style={{ margin: "10px" }}>Tee stats Woche {week}</h1>
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
          width: "fit-content", // Adjust width as needed
          margin: "10px",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="consumed teas table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Tea Name</TableCell>
                <TableCell align="center">Time Consumed</TableCell>
                <TableCell align="center">Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consumedTeas.map((tea) => (
                <TableRow
                  key={tea.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {tea.tea.name}
                  </TableCell>
                  <TableCell align="center">{formatTime(tea.time)}</TableCell>
                  <TableCell align="center">
                    {tea.image ? (
                      <img
                        src={tea.image}
                        alt={tea.tea.name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    ) : (
                      "No image"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default TeaStatsTable;
