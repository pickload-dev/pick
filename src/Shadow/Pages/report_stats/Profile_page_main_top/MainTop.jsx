import React, { useState, useContext, useEffect } from "react";
import "./maintop.css";
import personprofileicon from "../../../images/profilepersonicon.png";
import staricon from "../../../images/staricon.png";
import barsicon from "../../../images/barsicon.png";
import fleeticons from "../../../images/fleeticons.png";
import cashicon from "../../../images/cashicon.png";
import notFleetManager from "../../../images/becomefleetmanagerimage.png";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { RiderContext } from "../../Contexts/RiderContext";
import { useNavigate } from "react-router-dom";

export const MainTop = (props) => {
  const navigate = useNavigate();
  const { fleet_manager_vehicles, rating, delivery_agent_type } =
    props?.riderdata;
  const value = useContext(RiderContext);
  const { typeAccount, riderdata } = value;
  useEffect(() => {
    console.log(riderdata);
  });
  const number = riderdata?.phone_no;

  // const {no_of_bikes, no_of_buses, no_of_cars, no_of_trucks} = fleet_manager_vehicles;
  // const {total_rating} = rating
  // const [fleetManger, setFleetManger] = useState(true);
  // console.log(delivery_agent_type)
  return (
    <div className="profile-page-top-container">
      <div className="profile-page-top">
        <Link to="/agent-profile">
          <div className="pages">
            <h3>PROFILE INFORMATION</h3>
            <div className="profile-icons">
              <div className="half-circle green-color">
                <img
                  src={personprofileicon}
                  alt="icon"
                  className="profile-small-icon"
                />
              </div>
            </div>
          </div>
        </Link>
        {/* conditional statement to check if fleet manager or not  */}

        {typeAccount === "Fleet" ? (
          <Link to="/earnings">
            <div className="pages">
              <h3>FLEET EARNINGS</h3>
              <div className="profile-icons">
                <div className="half-circle yellow-color">
                  <img src={cashicon} alt="icon" />
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <Link to="/my-earning">
            <div className="pages">
              <h3>My Earnings</h3>
              <div className="profile-icons">
                <div className="half-circle yellow-color">
                  <img src={cashicon} alt="icon" />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* conditional statement to check if fleet manager or not  */}

        {typeAccount === "Fleet" ? (
          <Link to="/fleet-stat">
            <div className="pages">
              <h3>FLEET STATISTICS</h3>
              <div className="profile-icons">
                <div className="half-circle gray-color">
                  <img src={barsicon} alt="icon" />
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <Link to="/my-statistics">
            <div className="pages">
              <h3>STATISTICS</h3>
              <div className="profile-icons">
                <div className="half-circle gray-color">
                  <img src={barsicon} alt="icon" />
                </div>
              </div>
            </div>
          </Link>
        )}

        <div
          className="pages"
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate(typeAccount == "Fleet" ? "/view-fleet" : "/view-reviews")
          }
        >
          {typeAccount !== "Fleet" ? (
            <>
              {" "}
              <h3>MY RATING </h3>
              <span>
                &nbsp;{" "}
                {rating?.rating_count > 0
                  ? Math.round(rating?.total_rating / rating?.rating_count)
                  : 0}
              </span>
            </>
          ) : (
            <h3>FLEET</h3>
          )}
          <div className="profile-icons">
            <div className="half-circle green-color">
              <img
                src={typeAccount !== "Fleet" ? staricon : fleeticons}
                alt="icon"
              />
            </div>
          </div>
        </div>

        {/* conditional statement to check if fleet manager or not  */}

        {typeAccount === "Fleet" ? (
          <div className="pages span-two">
            <h3 className="special-h3">MY FLEET</h3>
            <div className="profile-icons">
              <div className="half-circle yellow-color">
                <img src={fleeticons} alt="icon" className="profile-big-icon" />
              </div>
            </div>
            <div className="transportations">
              <ul>
                <li>
                  {fleet_manager_vehicles &&
                    fleet_manager_vehicles?.no_of_bikes}{" "}
                  Bikes
                </li>
                <li>
                  {fleet_manager_vehicles && fleet_manager_vehicles?.no_of_cars}{" "}
                  Cars
                </li>
              </ul>
              <ul>
                <li>
                  {fleet_manager_vehicles &&
                    fleet_manager_vehicles?.no_of_buses}{" "}
                  Buses
                </li>
                <li>
                  {fleet_manager_vehicles &&
                    fleet_manager_vehicles?.no_of_trucks}{" "}
                  Trucks
                </li>
              </ul>
            </div>
          </div>
        ) : typeAccount === "Agent" && riderdata?.fleet_manager_id == "" ? (
          <div className="pages span-two">
            <div className="become-a-fleet-manager-wrapper">
              <div className="become-fleet-manager-left-side">
                <div className="Not-fleet-manager-image">
                  <img src={notFleetManager} alt="" />
                </div>
              </div>
              <div className="Not-fleet-manager-text-container">
                <h4>Upgrade your profile to a Fleet Manager</h4>
                <button
                  className="become-fleet-manager-button"
                  onClick={() =>
                    navigate("/upgrade", { state: { num: number } })
                  }
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="pages span-two">
            <div className="become-a-fleet-manager-wrapper">
              <div className="become-fleet-manager-left-side">
                <div className="Not-fleet-manager-image">
                  <img src={notFleetManager} alt="" />
                </div>
              </div>
            </div>
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
};
