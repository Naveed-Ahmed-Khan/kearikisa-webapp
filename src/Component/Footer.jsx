import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Footer() {
  const dispatch = useDispatch();
  return (
    <section className="main-footer">
      <footer className="bg-dark-purple text-white">
        <div className="footer-main">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-12">
                <h6>About</h6>
                <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" />
                <p>
                  Kearekisa.co.bw is Botswana's leading classified ads and
                  listing platform that brings Batswana buyers and sellers
                  together in various categories such as cars, property,
                  services, jobs, electronics, etc.
                </p>
              </div>
              <div className="col-lg-2 col-md-12">
                <h6>Support</h6>
                <hr
                  className="
            deep-purple
            text-primary
            accent-2
            mb-4
            mt-0
            d-inline-block
            mx-auto
          "
                />
                <ul className="list-unstyled mb-0">
                  <li>
                    <Link
                      to="/get_verified"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        /* dispatch({
                          type: "ActiveNav",
                          data: "Contact Us",
                        }); */
                      }}
                    >
                      Get Verified
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/about_us"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        dispatch({
                          type: "ActiveNav",
                          data: "About Us",
                        });
                      }}
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy_policy"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        dispatch({
                          type: "ActiveNav",
                          data: "",
                        });
                      }}
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="terms_condition"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        dispatch({
                          type: "ActiveNav",
                          data: "",
                        });
                      }}
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="stay_safe"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      Stay Safe
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-12">
                <h6>Contact</h6>
                <hr
                  className="
            deep-purple
            text-primary
            accent-2
            mb-4
            mt-0
            d-inline-block
            mx-auto
          "
                />
                <ul className="list-unstyled mb-0">
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <i className="fa fa-home me-3 text-primary" /> Gaborone,
                      Botswana
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <i className="fa fa-envelope me-3 text-primary" />
                      support@kearekisa.co.bw
                    </a>
                  </li>
                  {/* <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <i className="fa fa-phone me-3 text-primary" /> +267
                    </a>
                  </li> */}
                  <li>
                    <Link
                      to="/contact_us"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        dispatch({
                          type: "ActiveNav",
                          data: "Contact Us",
                        });
                      }}
                    >
                      <i className="fa fa-phone me-3 text-primary" />
                      Contact Us
                    </Link>
                  </li>
                </ul>
                <ul className="list-unstyled list-inline mt-3">
                  <li className="list-inline-item">
                    <a
                      href="https://www.facebook.com/SELL-It-BW-1416998598335289 "
                      target="_blank"
                      className="
                btn-floating btn-sm
                rgba-white-slight
                mx-1
                waves-effect waves-light
              "
                    >
                      <i className="fa fa-facebook bg-facebook" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://twitter.com/KearekisaBW "
                      target="_blank"
                      className="
                btn-floating btn-sm
                rgba-white-slight
                mx-1
                waves-effect waves-light
              "
                    >
                      <i className="fa fa-twitter bg-info" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-12">
                <h6>Subscribe to our newsletter</h6>
                <hr
                  className="
            deep-purple
            text-primary
            accent-2
            mb-4
            mt-0
            d-inline-block
            mx-auto
          "
                />
                <div className="clearfix" />
                <div className="input-group w-70">
                  <input
                    type="text"
                    className="form-control br-ts-3 br-bs-3"
                    placeholder="Email"
                  />
                  <div className>
                    <button
                      type="button"
                      className="btn btn-primary br-ts-0 br-bs-0"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
                {/* <h6 className="mb-0 mt-5">Payments</h6>
                <hr
                  className="
            deep-purple
            text-primary
            accent-2
            mb-2
            mt-3
            d-inline-block
            mx-auto
          "
                /> */}
                <div className="clearfix" />
                {/* 
                <ul className="footer-payments">
                  <li className="ps-0">
                    <a
                      href="javascript:;"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <i
                        className="fa fa-cc-amex text-muted"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:;"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <i
                        className="fa fa-cc-visa text-muted"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:;"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <i
                        className="fa fa-credit-card-alt text-muted"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:;"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <i
                        className="fa fa-cc-mastercard text-muted"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:;"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <i
                        className="fa fa-cc-paypal text-muted"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Back to top */}
      {/* <a href="#top" id="back-to-top" style={{ display: "none" }}>
        <i className="fa fa-rocket" />
      </a> */}
    </section>
  );
}
