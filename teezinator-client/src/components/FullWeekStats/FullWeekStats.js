import React, { useState, useEffect } from "react";
import axios from "../../axiosInstance";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import DayStats from "../DayStats/DayStats";
import { useSearchParams } from "react-router-dom";
import WeeklyStatsInfo from "../WeeklyStatsInfo/WeeklyStatsInfo";

const FullWeekStats = () => {
  const [searchParams] = useSearchParams();
  const [weeklyStats, setWeeklyStats] = useState({});
  const [teas, setTeas] = useState([]);
  const [statsDoneLoading, setStatsDoneLoading] = useState(false);

  // Get the 'week' query parameter from the URL
  const week = searchParams.get("week");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch weekly stats
        const weeklyStatsResponse = await axios.get(
          `/stats/weekly?week=${week}`
        );
        setWeeklyStats(weeklyStatsResponse.data);

        // Extract unique tea IDs from weekly stats
        const uniqueTeaIds = Object.values(weeklyStatsResponse.data).reduce(
          (acc, curr) => {
            Object.keys(curr).forEach((id) => {
              if (!acc.includes(id)) {
                acc.push(id);
              }
            });
            return acc;
          },
          []
        );

        // Fetch teas by their IDs if there are any unique IDs
        if (uniqueTeaIds.length > 0) {
          const teasResponse = await axios.get(
            `/tea/getMultipleById?ids=${uniqueTeaIds}`,
            {}
          );
          setTeas(teasResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [week]);

  return (
    <div>
      <Navbar />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <WeeklyStatsInfo week={week} />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignContent: "left",
            gap: "5%",
          }}
        >
          {Object.entries(weeklyStats).map(([day, stats]) => (
            <DayStats key={day} day={day} teas={teas} teaStats={stats} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FullWeekStats;
