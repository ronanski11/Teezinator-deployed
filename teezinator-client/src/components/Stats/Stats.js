import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import LifeTimeStats from "../LifetimeStats/LifeTimeStats";
import WeeklyStats from "../WeeklyStats/WeeklyStats";
import DailyStats from "../DailyStats/DailyStats";

// Mock data for the bar chart

const Stats = () => {
  return (
    <div>
      <Navbar />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "5%",
        }}
      >
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <LifeTimeStats />
          <WeeklyStats />
        </div>
        <DailyStats />
      </div>
      <Footer />
    </div>
  );
};

export default Stats;
