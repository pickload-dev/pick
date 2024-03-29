import React from "react";
import aboutus from "../images/about_us.png";
import Section2subsec2 from "./Section2subsec2";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mobile from "../images/mobile.png";
import googleplay from "../images/googlePlay.png";
import appstore from "../images/appStore.png";
import criclegreendesign from "../images/circlegreendesign.png";
import circlereddesign from "../images/circlereddesign.png";
import { Link } from "react-router-dom";
import "../css/contactus.css";
import BecomeAgent from "./BecomeAgent";
import Footer from "../../components/javascript/Footer";
export const AboutUs = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <section className="contact-us">
        <div className="contact-us-wrapper">
          <div className="dots-container1">
            <img src={criclegreendesign} />
          </div>
          <div className="dots-container2">
            <img src={circlereddesign} />
          </div>
          <div className="dots-container3">
            <img src={criclegreendesign} />
          </div>
          <div className="dots-container4">
            <img src={circlereddesign} />
          </div>
          <div className="contact-us-left-side">
            <div className="text-container">
              <h3>
                Our services are designed to offer reliable solutions to
                logistic problems. We do this, in an affordable, safe, and
                sustainable way.
              </h3>
            </div>
          </div>
          <div className="contact-us-right-side ">
            <div className="image-contaniner aboutus-image">
              <img src={aboutus} alt="services girl" />
            </div>
          </div>
        </div>
        <section className="subsec2-wrapper">
          <div className="subsecs2-left">
            <h3>
              about <span>pickload</span>
            </h3>
            <p>
              Pickload was birthed to bridge a gap between at home buyers,
              sellers and the item's logistics. Our Delivery agents provide
              super fast pickup and Delivery services to it's pickload users and
              also provides a way for delivery agents to earn cash as well for
              the services rendered. In short, PICKLOAD serves the purpose of
              connecting these sets of people together in a secure and
              convenient space{" "}
            </p>
            <div className="btns">
              <button className="learn-more">Learn More</button>
              <button className="watch-video">
                {" "}
                <a
                  href="https://drive.google.com/file/d/1cfjb66L9LtQ4owbGgBluPvX_Ae0mjiSu/view?usp=drivesdk"
                  target="_blank"
                >
                  {" "}
                  Watch Video <FontAwesomeIcon icon={faPlay} />{" "}
                </a>
              </button>
            </div>
          </div>
          <div className="subsecs2-right">
            <div className="stats">
              <div>
                <h4>500+</h4>
                <p>Avaliable Riders</p>
              </div>
              <div>
                <h4>250+</h4>
                <p>Deliveries Completed</p>
              </div>
              <div>
                <h4>640+</h4>
                <p>Satisfied Users</p>
              </div>
              <div>
                <h4>25</h4>
                <p>Fleets Managers</p>
              </div>
            </div>
          </div>
        </section>
        <div className="pickload-video-container">
          {/* <img src={pickloadvideo} alt="video on how to use pickload" /> */}
          <iframe
            width="560"
            height="315"
            src="https://youtu.be/DHyblOwXiko"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <BecomeAgent />
        <section className="section2subsec4">
          <div className="background-green">
            <div className="left-green-background">
              <h3>
                Get your items picked up and delivered <br /> swiftly using{" "}
                <span>PICKLOAD</span>
              </h3>
              <div className="social-btn-container">
                <a
                  href="https://play.google.com/store/apps/details?id=com.pickload.pickloaduser&pli=1"
                  target="_blank"
                >
                  <button className="social-btn">
                    <img src={googleplay} alt="" />
                  </button>
                </a>
                <a href="https://www.apple.com/app-store/" target="_blank">
                  <button className="social-btn">
                    <img src={appstore} alt="" />
                  </button>
                </a>
              </div>
            </div>
            <div className="right-green-background">
              <img src={mobile} alt="" className="mobile" />
            </div>
          </div>
          <div className="wrapper-second-green">
            <div className="second-green">
              <div className="first-bg-green">
                <h3>Earn some extra cash delivering items</h3>
                <div>
                  <a href="https://www.apple.com/app-store/" target="_blank">
                    <button className="social-btn second-btn-style ">
                      <img src={googleplay} alt="" />
                    </button>
                  </a>
                  <a href="https://www.apple.com/app-store/" target="_blank">
                    <button className="social-btn second-btn-style ">
                      <img src={appstore} alt="" />
                    </button>
                  </a>
                </div>
              </div>
              <div className="second-bg">
                <div className="second-bg-text">
                  <h3>
                    Sign Up to become an Agent with <span> PICKLOAD </span>
                  </h3>
                </div>
                <div className="second-bg-button">
                  <Link to="/sign">
                    <button className="signup-btn">Sign up</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </section>
    </div>
  );
};
