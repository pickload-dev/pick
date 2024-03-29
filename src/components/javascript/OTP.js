import React, { useRef } from "react";
import "../css/otp.css";
import Button from "./Button";
// import Head from "./Head";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function OTP() {
  return (
    <>
      <div id="otp-div">
        <p id="otp-paragraph">Enter the OTP sent by SMS to 08067654532</p>
        <div id="otpField">
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />

          <br />
          <br />
          <p id="another-code">
            We would send you another code in <span id="otpTimer">00: 45</span>
            <br />
            <br />
            <br />
            <br />
          </p>

          <Link to="/welcome">
            <Button name="DONE" />
          </Link>
        </div>
      </div>
    </>
  );
}

export function OTP2() {
  const navigate = useNavigate();
  const location = useLocation();

  const phone = location.state.phone;
  const id = location.state.id;
  const token = location.state.token;
  const agent = location.state.agent;

  console.log(phone);
  // console.log(id);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_auth/signup_stage_two",
        {
          method: "POST",

          body: JSON.stringify({
            phone_no: phone,
            _id: id,
            token: token,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      const data = await res.json();
      console.log(data);

      if (res.status === 200) {
        // setMessage("User created successfully");
        navigate("/individual-v", {
          state: { id: id, token: token, agent: agent },
        });
      } else {
        // setMessage("Error occured");
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Head /> */}
      <div id="otp-div-2">
        <p id="otp-paragraph">Enter the OTP sent by SMS to 08067654532</p>
        <div id="otpField">
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />

          <br />
          <br />
          <p id="another-code-2">
            We would send you another code in <span id="otpTimer">00: 45</span>
            <br />
            <br />
            <br />
            <br />
          </p>

          <Button name="DONE" click={handleClick} />
        </div>
      </div>
    </>
  );
}

export function OTP3() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/fleet-v");
  };
  return (
    <>
      {/* <Head /> */}
      <div id="otp-div-2">
        <p id="otp-paragraph">Enter the OTP sent by SMS to 08067654532</p>
        <div id="otpField">
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />

          <br />
          <br />
          <p id="another-code-2">
            We would send you another code in <span id="otpTimer">00: 45</span>
            <br />
            <br />
            <br />
            <br />
          </p>
          <Link to="/individual-v">
            <Button name="DONE" click={handleClick} />
          </Link>
        </div>
      </div>
    </>
  );
}
