import React, { useState } from "react";
import Head from "../javascript/Head";
import ProgressMM from "../Images/ProgressII.png";
import Button from "../javascript/Button";
import Footer from "../javascript/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AgentCompleted() {
  const asterik = <span id="asterik">*</span>;

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    bank_name: "",
    account_name: "",
    account_no: "",
    confirm_account_no: "",
    bvn: "",
  });
  const [accType, setAccType] = useState("");
  const [dataError, setDataError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [typeError, setTypeError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const token = location.state.token;

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheck = (e) => {
    setAccType(e.target.value);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const validate = (data) => {
      if (!accType) {
        setTypeError("Select an Account Type");
      }
      const errors = {};
      if (!data.bank_name) {
        errors.bank_name = "Bank Name must be filled";
      }
      if (!data.account_name) {
        errors.account_name = "Account Name must be filled";
      }
      if (!data.account_no) {
        errors.account_no = "Account Number must be filled";
      }
      if (!data.confirm_account_no) {
        errors.confirm_account_no = "Please Confirm your Account Number";
      } else if (data.confirm_account_no !== data.account_no) {
        errors.confirm_account_no = "Input does not match account number";
      }
      if (!data.bvn) {
        errors.bvn = "Please Enter Your BVN";
      }
      return errors;
    };
    setFormErrors(validate(formData));
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_auth/set_bank_account_details",
        {
          method: "POST",

          body: JSON.stringify({
            token: token,
            account_name: formData.account_name,
            account_no: formData.account_no,
            bank_name: formData.bank_name,
            account_type: accType,
            confirm_account_no: formData.confirm_account_no,
            bvn: formData.bvn,
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
        setMessage("User created successfully");

        navigate("/success");
      } else {
        setMessage("Error occured");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      // console.log(error);
    }
    // console.log(formData);
  };

  function handleKeyDown(event) {
    const inputValue = event.target.value;
    const isBackspaceOrDelete =
      event.key === "Backspace" || event.key === "Delete";
    if (inputValue.length >= 10 && !isBackspaceOrDelete) {
      event.preventDefault();
    }
  }
  return (
    <>
      <Head />
      <div id="mainsign">
        <h2>Join Pickload as an Individual Delivery agent</h2>
        <br />
        <div>
          <img src={ProgressMM} alt="Progress" />
        </div>
        <br />
        <br />

        <form className="sign-form" onSubmit={handleSubmit}>
          <label htmlFor="bank_name">
            <span className="requiredText">Bank name</span>
            <br />
            <input
              type="text"
              className="form-field edit-field phone-input2"
              name="bank_name"
              onChange={handleChange}
              value={formData.bank_name}
            />
          </label>
          <p className="error-style bottom-marg">{formErrors.bank_name}</p>
          {/* <br /> */}

          <label htmlFor="account_name">
            <span className="requiredText">Bank account holder's name</span>
            <br />
            <input
              type="text"
              className="form-field edit-field phone-input2"
              onChange={handleChange}
              name="account_name"
              value={formData.account_name}
            />
          </label>
          <p className="error-style bottom-marg">{formErrors.account_name}</p>
          {/* <br /> */}

          <label htmlFor="account_no">
            <span className="requiredText">Bank account number</span>
            <br />
            <input
              type="number"
              className="form-field edit-field phone-input2"
              name="account_no"
              maxLength={10}
              onChange={handleChange}
              value={formData.account_no}
              onKeyDown={handleKeyDown}
            />
          </label>
          <p className="error-style bottom-marg">{formErrors.account_no}</p>
          {/* <br /> */}

          <label htmlFor="confirm_account_no">
            <span className="requiredText">Confirm Bank account number</span>
            <br />
            <input
              type="number"
              className="form-field edit-field phone-input2"
              name="confirm_account_no"
              maxLength={10}
              onChange={handleChange}
              value={formData.confirm_account_no}
              onKeyDown={handleKeyDown}
            />
          </label>
          <p className="error-style bottom-marg">
            {formErrors.confirm_account_no}
          </p>
          {/* <br /> */}

          <label htmlFor="bvn">
            <span className="requiredText">BVN</span>
            <br />
            <input
              type="text"
              className="form-field edit-field phone-input2"
              name="bvn"
              onChange={handleChange}
              maxLength={11}
              minLength={11}
              value={formData.bvn}
            />
          </label>
          <p className="error-style bottom-marg">{formErrors.bvn}</p>
          {/* <br /> */}

          <div className="field bottom-marg">
            <legend className="requiredText">Account Type</legend>
            <section id="check">
              <label className="check" htmlFor="accType">
                Savings
              </label>
              <input
                id="maleCheck"
                type="checkbox"
                value="savings"
                name="accType"
                checked={accType === "savings"}
                onChange={handleCheck}
              />

              <label className="check" htmlFor="accType">
                Current
              </label>
              <input
                id="maleCheck"
                type="checkbox"
                value="current"
                name="accType"
                checked={accType === "current"}
                onChange={handleCheck}
              />
            </section>
            <p className="error-style">{typeError}</p>
          </div>
          {/* <br /> */}

          <div id="center-button">
            <Button name="Submit" type="Submit" loading={loading} />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
