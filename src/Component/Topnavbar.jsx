import React, { Component } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { mapStateToProps, mapDispatchToProps } from "./Action/Action";
import { connect } from "react-redux";
import { callApi } from "../Utitlies/callAPI";
import Swal from "sweetalert2";

class Topnavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.ActiveTab || "Home",
      loginPopup: false,
      registerPopup: false,
    };
  }
  handleTab = (e, tabName) => {
    this.setState({ activeTab: tabName });
    this.props.manageNavKey(tabName);
  };

  hanldeLoginPop = (e) => {
    if (e) {
      e.preventDefault();
    }

    this.setState({ loginPopup: !this.state.loginPopup });
  };
  hanldeRegisterPop = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ registerPopup: !this.state.registerPopup });
  };
  hanldeLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await callApi("/logout", "post");
        if (response) {
          this.props.logIn("");
        }
      }
    });
  };

  render() {
    const { loginPopup, registerPopup } = this.state;
    const { ActiveTab } = this.props;

    return (
      <React.Fragment>
        {/*Topbar*/}

        <div className="header-main">
          {/* Mobile Header */}
          <div className="sticky">
            <div className="horizontal-header clearfix ">
              <div className="container">
                <a id="horizontal-navtoggle" className="animated-arrow">
                  <span />
                </a>
                <span className="smllogo">
                  <img
                    className="mobile-light-logo"
                    src="../assets/images/brand/newLogo.png"
                    width={120}
                    alt=""
                  />
                  <img
                    className="mobile-dark-logo"
                    src="../assets/images/brand/newLogo.png"
                    width={120}
                    alt=""
                  />
                </span>
              </div>
            </div>
          </div>
          {/* /Mobile Header */}

          <div className="horizontal-main bg-dark-transparent clearfix">
            <div>
              {!this.props.loginToken ? (
                <div className="top-bar">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-sm-8 col-5">
                        <div className="top-bar-right">
                          <ul className="custom">
                            <li>
                              <a
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.hanldeRegisterPop();
                                }}
                                href="#"
                                className="text-dark"
                              >
                                <i className="fa fa-user me-1" />{" "}
                                <span>Register</span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-dark"
                                onClick={this.hanldeLoginPop}
                              >
                                <i className="fa fa-sign-in me-1" />{" "}
                                <span>Login</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="top-bar">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-sm-8 col-5">
                        <div className="top-bar-right">
                          <ul className="custom">
                            <li>
                              <Link
                                to="my_profile"
                                className="text-dark"
                                onClick={(e) => this.handleTab(e, "")}
                              >
                                <i className="fa fa-user me-1" />{" "}
                                <span>My Profile</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="my_ads"
                                className="text-dark"
                                onClick={(e) => this.handleTab(e, "")}
                              >
                                <i className="fa fa-users me-1" />{" "}
                                <span>My Ads</span>
                              </Link>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-dark"
                                onClick={this.hanldeLogout}
                              >
                                <i className="fa fa-sign-in me-1" />{" "}
                                <span>Logout</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="horizontal-mainwrapper container clearfix">
              <div className="desktoplogo" style={{ height: "80px" }}>
                <Link to="/" onClick={(e) => this.handleTab(e, "Home")}>
                  <img
                    src="../assets/images/brand/newLogo2.png"
                    alt=""
                    height="100%"
                  />
                </Link>
              </div>
              <div
                className="desktoplogo-1"
                style={{
                  objectFit: "contain",
                  height: "80px",
                }}
              >
                <Link to="/" onClick={(e) => this.handleTab(e, "Home")}>
                  <img
                    src="../assets/images/brand/newLogo.png"
                    alt=""
                    height="100%"
                  />
                </Link>
              </div>
              {/*Nav*/}

              <nav
                className="horizontalMenu clearfix d-md-flex"
                style={{ fontSize: "16px" }}
              >
                <div className="overlapblackbg" />
                <ul className="horizontalMenu-list">
                  <li aria-haspopup="true">
                    <Link
                      to="/"
                      className={ActiveTab === "Home" ? "active" : ""}
                      onClick={(e) => this.handleTab(e, "Home")}
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-haspopup="true">
                    <span className="horizontalMenu-click">
                      <i className="horizontalMenu-arrow fa fa-angle-down" />
                    </span>
                    <Link
                      to="browse_categories"
                      className={
                        ActiveTab === "Browse Categories" ? "active" : ""
                      }
                      onClick={(e) => this.handleTab(e, "Browse Categories")}
                    >
                      Browse Categories{" "}
                    </Link>
                  </li>
                  <li aria-haspopup="true">
                    <Link
                      to="about_us"
                      className={ActiveTab === "About Us" ? "active" : ""}
                      onClick={(e) => this.handleTab(e, "About Us")}
                    >
                      About Us
                    </Link>
                  </li>
                  <li aria-haspopup="true" className="PostFreeAdd">
                    {!this.props.loginToken ? (
                      <a
                        onClick={this.hanldeLoginPop}
                        className="btn btn-sm btn-warning text-white"
                      >
                        Post Free Ad
                      </a>
                    ) : (
                      <Link
                        to="ad_post"
                        onClick={(e) => this.handleTab(e, "")}
                        className="btn btn-sm btn-warning text-white"
                      >
                        Post Free Ad
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>
              {/*Nav*/}
            </div>
          </div>
        </div>

        {loginPopup ? (
          <Login
            open={loginPopup}
            close={this.hanldeLoginPop}
            hanldeRegisterPop={this.hanldeRegisterPop}
          />
        ) : null}
        {registerPopup ? (
          <Register open={registerPopup} close={this.hanldeRegisterPop} />
        ) : null}
      </React.Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Topnavbar);
