import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import LifetimeLeaderboard from "../LifetimeLeaderboard/LifetimeLeaderboard";
// Mock data for the bar chart

const Leaderboard = () => {
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
        <LifetimeLeaderboard />
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        ></div>
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboard;
