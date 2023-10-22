import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import Navbar from "../../component/navbar/navbar";
function Dashboard() {
  return (
    <Navbar>
      <div class="dashboardContainer">
        <p className="nameOfUser">Hi</p>
        <p className="nameOfUser">Welcome,</p>
        <p className="nameOfUser">To My TODO APP</p>
        <Link to="/create">
          <button class="button-89" role="button">
            Lets Go
          </button>
        </Link>
      </div>
    </Navbar>
  );
}

export default Dashboard;
