import React, { useState, useEffect, useContext } from "react";
import { DeliveryImages } from "../Details info/DeliveryImages";
// import "./deliveryhistorydetails.css";
import { DeliverInfo2 } from "../Details info/DeliverInfo";
import Flag from "../../Images/flag.png";
import Arrow from "../../Images/Arrow.png";
import Selected from "../../Images/SelectedTab.png";
import "./pendingdeliveryspecifics.css";
import Cancel from "../../Images/close.png";
import { useNavigate, useLocation } from "react-router-dom";
import Popup, { Popup2, Popup3 } from "../../javascript/Popup";
import ReportReason from "../ReportReason";
import "../../../Shadow/Pages/DeliveryHistorys/DeliveryHistoryDetails/deliveryhistorydetails.css";
import CancelBooking from "../CancelBooking";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";
import { TimeConverter } from "../../../DateAndTimeConverter";
import { DateConverter } from "../../../DateAndTimeConverter";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";
import ThousandConverter from "../../javascript/ThousandConverter";

export default function PendingScheduledDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [deliveryDetails, setDeliveryDetails] = useState({});
  const [date, setDate] = useState(new Date());
  const [percent, setPercent] = useState("");
  const [refundDays, setRefundDays] = useState("");
  const [cancelButton, setCancelButton] = useState(false);
  const [popupButton, setPopupButton] = useState(false);
  const [deliveryImages, setDeliveryImages] = useState([]);
  const userValues = useContext(userContext);
  const { token } = userValues;

  const Delivery_id = location.state.id;

  const fetchPercentage = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/stats/get_refund_percent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: JSON.parse(token),
        }),
      }
    );
    const data = await res.json();
    setPercent(data.refund_percent);

    // console.log(data);
  };

  const fetchDays = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/user_delivery/get_refund_days",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: JSON.parse(token),
        }),
      }
    );
    const data = await res.json();
    // console.log(data);
    setRefundDays(data.stats.refund_days);
  };

  useEffect(() => {
    fetchPercentage();
    fetchDeliveryDetails();
    fetchDays();
  }, []);

  const fetchDeliveryDetails = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/user_delivery/single_delivery",
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
    setDeliveryDetails(results?.delivery);
    // console.log(deliveryDetails);
    setDate(deliveryDetails?.pickup_time);
    setDeliveryImages(results?.delivery.imgs);
  };

  useEffect(() => {
    fetchDeliveryDetails();
  }, [loading === true]);

  if (loading === true) {
    return (
      <div className="loader-screen">
        <ClipLoader color={"#1AA803"} loading={loading} size={100} />
        <p>Loading...</p>
      </div>
    );
  } else
    return (
      <section className="user-dashboard pending-delivery no-max">
        <div className="history-wrapper-1">
          <div className="specific-details-section margin-bottom">
            <div
              id="arrow-div"
              onClick={() => {
                navigate(-1);
              }}
            >
              <img src={Arrow} alt="" />
            </div>
            <br />
            <h3 className="margin-bottom">
              Delivery cost:{" "}
              <span>
                &#8358;
                {
                  <ThousandConverter
                    value={deliveryDetails?.delivery_cost_user}
                  />
                }
              </span>
            </h3>
            <p>
              <strong>Delivery ID:</strong> {deliveryDetails?.parcel_code}{" "}
            </p>
            <div className="delivery-details-pictures specifics-images">
              {deliveryDetails.imgs?.map((item, index) => (
                <li key={index}>
                  <DeliveryImages rectangle={item} />
                </li>
              ))}
            </div>

            <p>
              <strong>Delivery Status</strong>
            </p>
            <div className="delivery-details-location">
              <div className="delivery-deatail-location-pickup">
                <div>
                  <img src={Selected} alt="" id="selected-img" />
                </div>
                <div id="selected-col">
                  <h3>Scheduled delivery time and date</h3>
                  <p>
                    {
                      <TimeConverter
                        value={
                          deliveryDetails?.delivery_status
                            .scheduled_delivery_pickup_timestamp
                        }
                      />
                    }{" "}
                    on{" "}
                    {
                      <DateConverter
                        value={
                          deliveryDetails?.delivery_status
                            .scheduled_delivery_pickup_timestamp
                        }
                      />
                    }
                  </p>
                </div>
              </div>
            </div>
            <br />
            <br />

            <h3>Delivery Request Accepted by:</h3>
            <br />

            <div className="estimate-div">
              <div className="delivery-profile1">
                <div className="driver-profile-image">
                  <div className="image">
                    <img src={deliveryDetails.delivery_agent_img} />{" "}
                  </div>
                </div>
                <div className="delivery-profile-details">
                  <table>
                    <tr>
                      <th>Delivery agent:</th>
                      <td>{deliveryDetails?.delivery_agent_name}</td>
                    </tr>
                    <tr>
                      <th>Phone no:</th>
                      <td>{deliveryDetails.delivery_agent_phone_no}</td>
                    </tr>
                    <tr>
                      <th>Rider ID:</th>
                      <td>{deliveryDetails.delivery_agent_id}</td>
                    </tr>
                    <tr>
                      <th>Vehicle type:</th>
                      <td>{deliveryDetails.delivery_agent_vehicle_type}</td>
                    </tr>
                    <tr>
                      <th>Vehicle color:</th>
                      <td>{deliveryDetails.delivery_agent_vehicle_color}</td>
                    </tr>
                    <tr>
                      <th>Plate no:</th>
                      <td>{deliveryDetails.delivery_agent_plate_no}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <p
                id="message-agent"
                onClick={() => {
                  navigate("/user/chatwithagentuser", {
                    state: {
                      agentId: deliveryDetails.delivery_agent_id,
                      agentName: deliveryDetails.delivery_agent_name,
                      agentImg: deliveryDetails.delivery_agent_img,
                      agentEmail: deliveryDetails.delivery_agent_email,
                      check: 0,
                    },
                  });
                }}
              >
                Message Agent
                <span>
                  <FontAwesomeIcon icon={faMessage} className="space-icons-1" />
                </span>
              </p>
            </div>
            <div className="delivery-history-info">
              <DeliverInfo2
                sender={deliveryDetails.sender_fullname}
                sender_no={`0${deliveryDetails.sender_phone_no}`}
                receiver={deliveryDetails.reciever_name}
                receiver_no={`0${deliveryDetails.reciever_phone_no}`}
                parcel_name={deliveryDetails.parcel_name}
                parcel_type={deliveryDetails.parcel_type}
                description={deliveryDetails.parcel_description}
                instruction={deliveryDetails.delivery_instructions}
              />
            </div>
            <br />
            <br />
            <br />

            <div className="report-user">
              <div>
                <img src={Cancel} alt="" />
              </div>
              <p
                onClick={() => {
                  setCancelButton(true);
                }}
              >
                Cancel
              </p>
            </div>
            <div className="report-user">
              <div>
                <img src={Flag} alt="" />
              </div>
              <p
                onClick={() => {
                  setPopupButton(true);
                }}
              >
                Report this Delivery
              </p>
            </div>
            <br />
          </div>

          <Popup3 trigger={cancelButton}>
            <CancelBooking
              click={() => {
                setCancelButton(false);
              }}
              percent={percent}
              refund={refundDays}
              delivery_id={Delivery_id}
            />
          </Popup3>

          <Popup trigger={popupButton} setTrigger={setPopupButton}>
            <ReportReason
              delivery_id={Delivery_id}
              parcel_code={deliveryDetails.parcel_code}
              img_ids={deliveryDetails.img_ids}
              imgs={deliveryImages.join(", ")}
              agentName={deliveryDetails.delivery_agent_name}
              delivery_agent_code={deliveryDetails.delivery_agent_code}
              delivery_agent_id={deliveryDetails.delivery_agent_id}
              delivery_agent_img={deliveryDetails.delivery_agent_img}
              delivery_agent_img_id={deliveryDetails.delivery_agent_img_id}
              delivery_agent_email={deliveryDetails.delivery_agent_email}
              user_email={deliveryDetails.sender_email}
              delivery_type={deliveryDetails.delivery_type}
              sender_fullname={deliveryDetails.sender_fullname}
              sender_id={deliveryDetails.sender_id}
            />
          </Popup>
        </div>
      </section>
    );
}
