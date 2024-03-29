import React, { useContext, useEffect, useState } from "react";
import { DeliveryImages } from "../../Details info/DeliveryImages";
import locationimg from "../../../images/checkoutprogress.png";
import "./deliveryhistorydetails.css";
import { DeliverInfo } from "../../Details info/DeliverInfo";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RiderContext } from "../../Contexts/RiderContext";
import {
  DateConverter,
  EveryDateConverter,
  HourConverter,
  MinsConverter,
  TimeConverter,
} from "../../../../DateAndTimeConverter";
import { ReportReason2 } from "../../../../components/usersFlow/ReportReason";
import Popup from "../../../../components/javascript/Popup";
import Flag from "../../../images/flag.png";
import ThousandConverter from "../../../../components/javascript/ThousandConverter";
import ClipLoader from "react-spinners/ClipLoader";

const DeliveryHistoryDetailsAgent = () => {
  const [popupButton, setPopupButton] = useState(false);
  function convertMillisecondsToTime(ms) {
    const hours = Math.floor(ms / 3600000); // 1 Hour = 36000 Milliseconds
    const minutes = Math.floor((ms % 3600000) / 60000); // 1 Minute = 60000 Milliseconds
    const seconds = (ms % 60000) / 1000;

    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      if (remainingHours === 0) {
        return (
          days +
          (days > 1 ? " days, " : " day, ") +
          minutes +
          (minutes > 1 ? " minutes" : " minute")
        );
      } else {
        return (
          days +
          (days > 1 ? " days, " : " day, ") +
          remainingHours +
          (remainingHours > 1 ? " hours" : " hour")
        );
      }
    } else if (hours === 0 && minutes === 0) {
      return seconds.toFixed(0) + " seconds";
    } else if (hours === 0) {
      return (
        minutes +
        (minutes > 1 ? " minutes " : " minute ") +
        seconds.toFixed(0) +
        (seconds > 1 ? " seconds" : " second")
      );
    } else {
      const remainingHours = hours % 24;
      if (remainingHours === 0) {
        return (
          hours +
          (hours > 1 ? " hours, " : " hour, ") +
          minutes +
          (minutes > 1 ? " minutes" : " minute")
        );
      } else {
        return (
          hours +
          (hours > 1 ? " hours, " : " hour, ") +
          minutes +
          (minutes > 1 ? " minutes" : " minute")
        );
      }
    }
  }
  const location = useLocation();
  const value = useContext(RiderContext);
  const { token } = value;
  const [deliveryImages, setDeliveryImages] = useState([]);
  const [milli, setMilli] = useState("");

  const [loading, setLoading] = useState(true);
  const [deliveryDetails, setDeliveryDetails] = useState({});

  const Delivery_id = location.state.id;

  const fetchDeliveryDetails = async () => {
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_delivery/view_single_delivery",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: JSON.parse(token),
            delivery_id: Delivery_id,
          }),
        }
      );
      const data = await res.json();
      const results = await data;
      setLoading(false);
      console.log(results);
      setDeliveryDetails(results?.delivery);
      setDeliveryImages(results?.delivery.imgs);

      setMilli(results?.delivery.delivered_in);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(deliveryDetails);
  useEffect(() => {
    fetchDeliveryDetails();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="iii">
      <section className=" pending-delivery">
        <div className="history-wrapper">
          {loading ? (
            <div style={{ height: "1000px", backgroundColor: "white" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ClipLoader color={"#1AA803"} loading={loading} size={100} />
              </div>
            </div>
          ) : (
            <div className="specifics-details-section-1">
              <p style={{ color: "red", textAlign: "right" }}>
                {deliveryDetails?.delivery_status.is_cancelled === true
                  ? "Delivery cancelled"
                  : null}
              </p>
              <div className="summary-cost">
                <p>
                  <strong>
                    {deliveryDetails?.delivery_type == "instant"
                      ? "Instant"
                      : deliveryDetails?.delivery_type === "scheduled"
                      ? "Scheduled"
                      : null}{" "}
                    Delivery ID:
                  </strong>{" "}
                  {deliveryDetails?.parcel_code}{" "}
                </p>
                <p>
                  <strong>Item name:</strong> {deliveryDetails?.parcel_name}
                </p>
                <p>
                  <strong>Delivery agent name:</strong>{" "}
                  {deliveryDetails?.delivery_agent_name}
                </p>
                {deliveryDetails?.delivery_type === "scheduled" && (
                  <>
                    <p>
                      <strong>Pickup address:</strong>{" "}
                      {deliveryDetails?.pickup_address}
                    </p>
                    <p>
                      <strong>Drop off address:</strong>{" "}
                      {deliveryDetails?.drop_off_address}
                    </p>
                  </>
                )}

                <p>
                  <strong>Estimated Delivery Fee:</strong>{" "}
                  <span style={{ color: "#1ca905" }}>
                    &#8358;
                    {
                      <ThousandConverter
                        value={deliveryDetails?.delivery_cost_delivery_agent}
                      />
                    }
                  </span>
                </p>
              </div>

              <div className="estimatedtime">
                <h2>Item delivered in {convertMillisecondsToTime(milli)}</h2>
              </div>

              <div className="delivery-details-location">
                <div className="delivery-deatails-location-pickup">
                  <div className="location-img">
                    <img src={locationimg} alt="" />
                  </div>
                  <h3>Item picked up </h3>
                  {!deliveryDetails?.delivery_status?.is_started_at ? (
                    <div style={{ margin: "10px 0" }}>
                      Package not yet picked up
                    </div>
                  ) : (
                    <p>
                      <TimeConverter
                        value={deliveryDetails?.delivery_status?.is_started_at}
                      />{" "}
                      <DateConverter
                        value={deliveryDetails?.delivery_status?.is_started_at}
                      />
                    </p>
                  )}
                  <h3>Item dropped off </h3>
                  {deliveryDetails?.delivery_status?.is_completed_at === 0 ? (
                    <div style={{ margin: "10px 0" }}>
                      Package not yet dropped off
                    </div>
                  ) : (
                    <p>
                      <TimeConverter
                        value={
                          deliveryDetails?.delivery_status?.is_completed_at
                        }
                      />{" "}
                      <DateConverter
                        value={
                          deliveryDetails?.delivery_status?.is_completed_at
                        }
                      />
                    </p>
                  )}
                </div>
              </div>

              <div className="delivery-details-pictures specifics-images">
                {deliveryDetails?.imgs?.map((item, index) => (
                  <DeliveryImages key={index} rectangle={item} />
                ))}
              </div>
              {deliveryDetails?.delivery_confirmation_proof_urls.length > 0 ? (
                <>
                  <p>
                    <strong>Delivery confirmation proof</strong>
                  </p>
                  <div className="delivery-details-pictures specifics-images">
                    {deliveryDetails?.delivery_confirmation_proof_urls?.map(
                      (item, index) => (
                        <li key={index}>
                          <DeliveryImages rectangle={item} />
                        </li>
                      )
                    )}
                  </div>
                </>
              ) : null}

              {/* <div className="estimatedtime">
            <h2>
                {deliveryDetails?.delivered_in === 0 ? 

                "Delivery Not Completed" : 
                  <>
                "Item delivered in"  <span className="delivered-time"><HourConverter value={deliveryDetails?.delivered_in}/> hour <MinsConverter value={deliveryDetails?.delivered_in}/> minutes </span> 
                </>
                }    
            </h2>
          </div> */}
              {/* <div className="delivery-profile1">
                <div className="driver-profile-image">
                  <p>Delivery Details</p>
                  <div className="image">
                    <img src={deliveryDetails.delivery_agent_img} alt="" />
                  </div>
                </div>
                <div className="delivery-profile-details">
                  <table>
                    <thead>
                      <tr>
                        <th>Delivery Agent :</th>
                        <td>{deliveryDetails?.delivery_agent_name}</td>
                      </tr>
                      <tr>
                        <th>Delivery Vehicle :</th>
                        <td>{deliveryDetails.delivery_agent_vehicle_type}</td>
                      </tr>
                      <tr>
                        <th>Agent ID :</th>
                        <td>{deliveryDetails.delivery_agent_id}</td>
                      </tr>
                      <tr>
                        <th>Plate Number :</th>
                        <td>{deliveryDetails.delivery_agent_plate_no}</td>
                      </tr>
                      <tr>
                        <th>Phone Number :</th>
                        <td>{deliveryDetails.delivery_agent_phone_no}</td>
                      </tr>
                      <tr>
                        <th>Senders Contact:</th>
                        <td>+234{deliveryDetails.sender_phone_no}</td>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div> */}
              <div className="delivery-history-info">
                <DeliverInfo
                  key={deliveryDetails?._id}
                  sender={deliveryDetails?.sender_fullname}
                  sender_no={deliveryDetails?.sender_phone_no}
                  receiver={deliveryDetails?.reciever_name}
                  receiver_no={deliveryDetails?.reciever_phone_no}
                  parcel_name={deliveryDetails?.parcel_name}
                  parcel_type={deliveryDetails?.parcel_type}
                  description={deliveryDetails?.parcel_description}
                  instruction={deliveryDetails?.delivery_instructions}
                />
              </div>
              <br />

              {/* <div className="report-user">
            <div><img src={Flag} alt="" /></div>
            <p
              onClick={() => {
                navigate("/report");
              }}
            >
              Report this user
            </p>
          </div> */}
              <div className="report-user">
                <div>
                  <img src={Flag} alt="" />
                </div>
                <p
                  onClick={() => {
                    setPopupButton(true);
                  }}
                >
                  Report this user
                </p>
              </div>
            </div>
          )}
        </div>
        <Popup trigger={popupButton} setTrigger={setPopupButton}>
          <ReportReason2
            delivery_id={Delivery_id}
            parcel_code={deliveryDetails?.parcel_code}
            img_ids={deliveryDetails?.img_ids}
            imgs={deliveryImages?.join(", ")}
            agentName={deliveryDetails?.delivery_agent_name}
            delivery_agent_code={deliveryDetails?.delivery_agent_code}
            delivery_agent_id={deliveryDetails?.delivery_agent_id}
            delivery_agent_img={deliveryDetails?.delivery_agent_img}
            delivery_agent_img_id={deliveryDetails?.delivery_agent_img_id}
            delivery_agent_email={deliveryDetails?.delivery_agent_email}
            user_email={deliveryDetails?.sender_email}
            delivery_type={deliveryDetails?.delivery_type}
            sender_fullname={deliveryDetails?.sender_fullname}
            sender_id={deliveryDetails?.sender_id}
            sender_img={deliveryDetails?.sender_img}
            token={JSON.parse(token)}
          />
          {/* <ReportReason2 /> */}
        </Popup>
      </section>
    </div>
  );
};

export default DeliveryHistoryDetailsAgent;

export const ScheduledHistoryDetailsAgent = () => {
  const navigate = useNavigate();
  return (
    <section className=" user-dashboard pending-delivery pending-delivery specifics-1">
      <div className="history-wrapper">
        <div className="specifics-details-section-1">
          <h3>Scheduled Delivery ID: 7805097 </h3>
          <div className="delivery-details-pictures specifics-images">
            <DeliveryImages />
            <DeliveryImages />
            <DeliveryImages />
          </div>
          <h3>Delivery status</h3>
          <div className="delivery-details-location">
            <div className="delivery-deatails-location-pickup">
              <div className="location-img">
                <img src={locationimg} alt="" />
              </div>
              <h3>Item Received by Delivery Agent at the Pickup Location </h3>
              <p>Thursday March 25th at 9:30 PM</p>
              <h3>Item Received by User at the Drop off loaction </h3>
              <p>Thursday March 25th at 10:30 PM</p>
            </div>
          </div>
          <div className="estimatedtime">
            <h2>
              Item delivered in{" "}
              <span className="delivered-time">1 hour 20 minutes</span>{" "}
            </h2>
          </div>
          <div className="delivery-profile">
            <div className="driver-profile-image">
              <div className="image"></div>
              <p>View Profile</p>
            </div>
            <div className="delivery-profile-details">
              <table>
                <tr>
                  <th>Delivery Agent :</th>
                  <td>Peter Robinson</td>
                </tr>
                <tr>
                  <th>Delivery Vehicle :</th>
                  <td>Tesla Cyber Truck</td>
                </tr>
                <tr>
                  <th>Agent ID :</th>
                  <td>6788</td>
                </tr>
                <tr>
                  <th>Plate Number :</th>
                  <td>LSR4KMJ</td>
                </tr>
                <tr>
                  <th>Phone Number :</th>
                  <td>09087614543</td>
                </tr>
                <tr>
                  <th>Senders Contact:</th>
                  <td>09092887765</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="delivery-history-info">
            <DeliverInfo />
          </div>
          <br />

          {/* <div className="report-user">
            <div><img src={Flag} alt="" /></div>
            <p
              onClick={() => {
                navigate("/report");
              }}
            >
              Report this user
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};
