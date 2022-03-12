import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { callApi } from "../Utitlies/callAPI";
import { mapStateToProps, mapDispatchToProps } from "./Action/Action";
import { connect } from "react-redux";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Swal from "sweetalert2";
class Login extends Component {
  constructor(props) {
    super(props);
    this.saveModal = {
      email: "",
      password: "",
    };
    this.state = {
      saveModal: this.saveModal,
      openFaceBookPopUp: false,
    };
  }
  handleField = (e) => {
    const { value, name } = e.target;
    this.setState({
      saveModal: {
        ...this.state.saveModal,
        [name]: value,
      },
    });
  };
  handleLogin = async (e) => {
    e.preventDefault();
    const { saveModal } = this.state;
    callApi("/login", "post", saveModal)
      .then(async (res) => {
        callApi(
          "/gettoken ",
          "get",
          null,
          res.id,
          res.token,
          null,
          "refreshToken"
        ).then(async (res1) => {
          const userData = await callApi(
            "/userinfo",
            "get",
            null,
            null,
            res1.access_token
          );
          if ((userData || {})._id) {
            this.props.close(e);
            this.props.logIn(res1.access_token);
            this.props.userInfo(userData);
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "User not found",
        });
      });
  };
  responseFacebook = (response) => {
    console.log(response);
    // setData(response);
    // setPicture(response.picture.data.url);
    // if (response.accessToken) {
    //   setLogin(true);
    // } else {
    //   setLogin(false);
    // }
  };
  handleFacebookPopUp = (e) => {
    e.preventDefault();
    this.setState({
      openFaceBookPopUp: !this.state.openFaceBookPopUp,
    });
  };
  render() {
    const { saveModal, openFaceBookPopUp } = this.state;
    const { open, close, hanldeRegisterPop } = this.props;
    return (
      <React.Fragment>
        <Modal isOpen={open} size="lg">
          <ModalHeader toggle={close}>Login</ModalHeader>
          <ModalBody>
            {/* <div
              class="fb-like"
              data-share="true"
              data-width="450"
              data-show-faces="true">
            </div> */}
            <div className="single-page customerpage ">
              <div className="wrapper wrapper2 box-shadow-0">
                <form id="login" className="card-body" tabIndex={500}>
                  <div className="mail">
                    <input
                      type="email"
                      name="email"
                      value={saveModal.email}
                      onChange={this.handleField}
                    />
                    <label>Mail or Username</label>
                  </div>
                  <div className="passwd">
                    <input
                      type="password"
                      name="password"
                      value={saveModal.password}
                      onChange={this.handleField}
                    />
                    <label>Password</label>
                  </div>
                  <div className="submit">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={this.handleLogin}
                    >
                      Login
                    </button>
                  </div>

                  <p className="text-dark mb-0">
                    Don't have account?
                    <a
                      href="register.html"
                      onClick={(e) => {
                        e.preventDefault();
                        close();
                        hanldeRegisterPop();
                      }}
                      className="text-primary ms-1"
                    >
                      Sign Up
                    </a>
                  </p>
                </form>
                <hr className="divider" />
                <div className="card-body">
                  <div className="text-center">
                    <div className="btn-group">
                      {/*   <a
                        onClick={this.handleFacebookPopUp}
                        href="#"
                        className="btn btn-icon me-2 brround"
                      >
                        <span className="fa fa-facebook" />
                      </a> */}
                      <FacebookLogin
                        appId="545406836561288"
                        // autoLoad={true}
                        fields="name,email,picture"
                        scope="public_profile,user_friends"
                        callback={this.responseFacebook}
                        render={(renderProps) => (
                          <button
                            onClick={renderProps.onClick}
                            className="btn btn-icon me-2 brround"
                          >
                            <span className="fa fa-facebook" />
                          </button>
                        )}
                      />
                    </div>
                    <div className="btn-group">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        href="https://www.google.com/gmail/"
                        className="btn  me-2 btn-icon brround"
                      >
                        <span className="fa fa-google" />
                      </a>
                    </div>
                    <div className="btn-group">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        href="https://twitter.com/"
                        className="btn  btn-icon brround"
                      >
                        <span className="fa fa-twitter" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
