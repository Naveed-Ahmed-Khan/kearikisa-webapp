import React, { useState } from "react";
import { callApi } from "../Utitlies/callAPI";
import Swal from "sweetalert2";

const Contact = () => {
  const [saveModal, setSaveModal] = useState({
    sendername: "",
    senderemail: "",
    messbody: "",
  });
  const handleInput = (e) => {
    const { value, name } = e.target;
    setSaveModal({
      ...saveModal,
      [name]: value,
    });
  };
  const handlePostMessage = async () => {
    const respone = await callApi("/contactmessage", "post", saveModal);
    if (respone) {
      Swal.fire("Message sent successfully", "", "success");
    }
  };
  return (
    <div>
      {/*Breadcrumb*/}
      <div>
        <div
          className="bannerimg cover-image bg-background3"
          data-bs-image-src="../assets/images/banners/banner2.jpg"
        >
          <div className="header-text mb-0">
            <div className="container">
              <div className="text-center text-white">
                <h1 className>Contact Us</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/Breadcrumb*/}
      {/*Contact*/}
      <div className="sptb bg-white mb-0 pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-xl-4 col-md-12 d-block mb-7">
              <img src="" alt="" />
            </div>
            <div className="col-lg-7 col-xl-8 col-md-12 d-block">
              <div className="single-page">
                <div className="col-lg-12 col-md-12 mx-auto d-block">
                  <div className="section-title center-block text-center">
                    <h2>Contact Form</h2>
                  </div>
                  <div className="wrapper wrapper2">
                    <div className="card mb-0">
                      <div className="card-body">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="name1"
                            placeholder="Your Name"
                            name="sendername"
                            value={saveModal.sendername}
                            onChange={handleInput}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email Address"
                            name="senderemail"
                            value={saveModal.senderemail}
                            onChange={handleInput}
                          />
                        </div>
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            rows={6}
                            placeholder="Message"
                            defaultValue={""}
                            name="messbody"
                            value={saveModal.messbody}
                            onChange={handleInput}
                          />
                        </div>
                        <button
                          className="btn btn-primary"
                          onClick={handlePostMessage}
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Contact*/}
      {/*Statistics*/}
      <section className="sptb bg-white">
        <div className="container" />
      </section>
      {/*/Statistics*/}
    </div>
  );
};

export default Contact;
