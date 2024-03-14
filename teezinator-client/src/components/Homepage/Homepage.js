import React, { useState, useEffect } from "react";
import axios from "../../axiosInstance";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from "@mui/material";

function Homepage() {
  const [teas, setTeas] = useState([]);
  const [topTeasMap, setTopTeasMap] = useState({});

  useEffect(() => {
    const fetchTopTeasByUser = async () => {
      try {
        // First, get the top teas by user
        const topTeasResponse = await axios.get("stats/getTopTeasByUser");
        const topTeasMap = topTeasResponse.data;
        setTopTeasMap(topTeasMap);

        // Then, get all teas
        const allTeasResponse = await axios.get("tea/getall");
        const allTeas = allTeasResponse.data;

        // Filter and sort all teas based on topTeasMap
        const filteredAndSortedTeas = allTeas
          .filter((tea) => Object.keys(topTeasMap).includes(tea.id))
          .sort((a, b) => {
            const aIndex = Object.keys(topTeasMap).indexOf(a.id);
            const bIndex = Object.keys(topTeasMap).indexOf(b.id);
            return aIndex - bIndex;
          });

        setTeas(filteredAndSortedTeas);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchTopTeasByUser();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ mt: 4, mb: 2 }}
      >
        Top Teas
      </Typography>
      <Grid container spacing={4}>
        {teas.map((tea, index) => (
          <Grid item xs={12} sm={6} md={4} key={tea.id}>
            <Card>
              <CardMedia
                component="img"
                sx={{ height: 300, objectFit: "cover" }}
                image={`data:image/jpeg;base64,${tea.image}`}
                alt={tea.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {index + 1}. {tea.name}
                </Typography>
                {/* Display the number of times consumed in a visually appealing way */}
                <Chip label={`Consumed ${topTeasMap[tea.id]} times`} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Homepage;
