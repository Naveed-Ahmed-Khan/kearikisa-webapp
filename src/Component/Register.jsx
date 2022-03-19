import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import { callApi } from "../Utitlies/callAPI";

export default function Register(props) {
  const [error, setError] = useState("");
  const [saveModal, setSaveModal] = useState({
    name: "",
    email: "",
    password: "",
    phonenumber: "",
    aboutme: "",
    address: "",
    location: "",
    role: "",
  });
  const [sendOTPPopUp, setSendOTPPopUp] = useState(false);
  const [timer, setTimer] = useState(30);
  const [otp, setOtp] = useState(null);
  const [validated, setValidated] = useState(false);

  const { open, close } = props;

  useEffect(() => {
    // time
    if (sendOTPPopUp) {
      setTimeout(() => {
        let timerTime = timer;
        if (timer > 0) {
          setTimer(timerTime - 1);
        }
      }, 1000);
    }
  }, [sendOTPPopUp, timer]);

  // Input handle Field
  const handleInputField = (e) => {
    const { value, name } = e.target;
    setSaveModal({
      ...saveModal,
      [name]: value,
    });
  };

  // handle Post
  const handleRegister = (e) => {
    e.preventDefault();

    const response = callApi(
      `/signup?phonenumber=${saveModal.phonenumber}&code=${otp}`,
      "post",
      saveModal
    );
    if (response === "Signup completed Successfully") {
      close(e);
    }
  };

  const checkBlanks = () => {
    let flag = false;
    if (
      !saveModal.name ||
      saveModal.name === "" ||
      !saveModal.email ||
      saveModal.email === "" ||
      !saveModal.password ||
      saveModal.password === "" ||
      !saveModal.phonenumber ||
      saveModal.phonenumber === "" ||
      !saveModal.address ||
      saveModal.address === ""
    ) {
      setError("Please fill all the fields");
      flag = true;
    }
    return flag;
  };

  // to resend the otp
  const sendOTP = (e) => {
    e.preventDefault();
    console.log(saveModal);
    const error = checkBlanks();
    if (!error) {
      setSendOTPPopUp(true);
      const data = callApi(
        `/sendotp?phonenumber=${saveModal.phonenumber}&channel=sms`
      );
    }
    return;
  };
  // Handle Phone number
  const handlePhoneNumber = (e) => {
    const { value, name } = e.target;
    if ((value || []).length < 9) {
      setSaveModal({
        ...saveModal,
        [name]: value,
      });
    }
  };
  const handleSubmit = (event) => {
    debugger;
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Modal isOpen={open} size="lg">
      <ModalHeader toggle={close}>Register and start selling</ModalHeader>
      <ModalBody>
        {!sendOTPPopUp ? (
          <div className="single-page customerpage ">
            <div className="wrapper wrapper2 box-shadow-0">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="mail">
                  <Form.Control
                    type="text"
                    name="name"
                    value={saveModal.name}
                    onChange={handleInputField}
                    className="form-control"
                    required
                  />
                </div>
                <label>Full Name</label>
                <div className="mail">
                  <Form.Control
                    type="text"
                    name="address"
                    value={saveModal.address}
                    onChange={handleInputField}
                    className="form-control"
                    required
                  />
                  <label>Address</label>
                </div>

                <div className="mail">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Phone Number:
                  </label>
                  <div className="d-flex">
                    <span
                      className="btn btn-sm btn-light border font-weight-bold"
                      style={{ paddingTop: "13px" }}
                    >
                      +267
                    </span>
                    <Form.Control
                      required
                      type="number"
                      className="form-control form-control-sm"
                      name="phonenumber"
                      value={saveModal.phonenumber}
                      onChange={handlePhoneNumber}
                    />
                  </div>
                </div>

                <div className="passwd">
                  <input
                    type="email"
                    name="email"
                    value={saveModal.email}
                    onChange={handleInputField}
                  />
                  <label>Email</label>
                </div>
                <div className="passwd">
                  <input
                    type="password"
                    name="password"
                    value={saveModal.password}
                    onChange={handleInputField}
                  />
                  <label>Password</label>
                </div>
                <small style={{ color: "gray" }}>
                  SMS and/or data charges may apply
                </small>
                <div className="submit">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={sendOTP}
                  >
                    Send OTP
                  </button>
                </div>
              </Form>
              <p style={{ color: "red" }}>{error}</p>
            </div>
          </div>
        ) : (
          <div className="single-page customerpage ">
            <div className="wrapper wrapper2 box-shadow-0">
              <form id="login" className="card-body" tabIndex={500}>
                <div className="mail">
                  <input
                    className="text-center"
                    type="number"
                    name="otp"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                  />
                  <label>Enter 4 digit OTP Code</label>
                </div>
                <div style={{ textAlign: "end" }}>
                  {timer ? (
                    <p className="text-dark">
                      {timer > 9 ? `00:${timer}` : `00:0${timer}`}
                    </p>
                  ) : (
                    <button
                      className="text-dark btn btn-link btn-sm"
                      onClick={sendOTP}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <div className="submit">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={handleRegister}
                  >
                    Verify
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
}
