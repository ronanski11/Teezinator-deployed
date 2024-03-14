import React from "react";
import Navbar from "../Navbar/Navbar";
import Homepage from "../Homepage/Homepage";
import Footer from "../Footer/Footer";

function Home() {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <Homepage></Homepage>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default Home;
