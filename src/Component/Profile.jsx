import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { callApi } from "../Utitlies/callAPI";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import UpdatePassword from "./UpdatePassword";
import ProductCard from "./ProductCard";
import MyAds from "./MyAds";

export default function Profile(props) {
  const [allAdds, setAllAdds] = useState([]);

  //User current data
  const userData = useSelector((state) => state.userInfo.payload);
  const { fromSeller, closeSellerPage, sellerData } = props;
  // filtering seller products
  const getNonpremiumadd = async () => {
    const adds = await callApi("/ad/getnonpremium");
    console.log("userInfo", sellerData._id);
    const MyAds = adds.filter((items) => items.sellerid === sellerData._id);
    setAllAdds(MyAds);
  };
  useEffect(() => {
    getNonpremiumadd();
  }, []);

  const dispatch = useDispatch();
  // saveModal
  const [saveModal, setSaveModal] = useState({
    name: (sellerData || {}).name || (userData || {}).name || "",
    email: (sellerData || {}).email || (userData || {}).email || "",
    password: (sellerData || {}).password || (userData || {}).password || "",
    phonenumber:
      (sellerData || {}).phonenumber || (userData || {}).phonenumber || "",
    aboutme: (sellerData || {}).aboutme || (userData || {}).aboutme || "",
    address: (sellerData || {}).address || (userData || {}).address || "",
    location: (sellerData || {}).location || (userData || {}).location || "",
    role: (sellerData || {}).role || (userData || {}).role || "",
  });
  const [passwordPopup, setPasswordPopup] = useState(false);
  // Input handle Field
  const handleInputField = (e) => {
    const { value, name } = e.target;
    setSaveModal({
      ...saveModal,
      [name]: value,
    });
  };

  // handle update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const response = await callApi(`/updateprofile`, "patch", saveModal);
    if (response.msg === "Profile Updated") {
      Swal.fire("Profile Updated", "", "success");
      debugger;
      dispatch({
        type: "UserInfo",
        data: saveModal,
      });
    }
  };

  //   Update password popup
  const handleUpdatePassword = () => {
    setPasswordPopup(!passwordPopup);
  };
  return (
    <div>
      {passwordPopup ? (
        <UpdatePassword open={passwordPopup} close={handleUpdatePassword} />
      ) : null}

      {/*Breadcrumb*/}
      <section>
        <div
          className="bannerimg cover-image bg-background3"
          data-bs-image-src="../assets/images/banners/banner2.jpg"
        >
          <div className="header-text mb-0">
            <div className="container">
              <div className="text-center text-white">
                <h1 className>{fromSeller ? "User Profile" : "My Profile"}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Breadcrumb*/}
      {/*User Dashboard*/}
      <section className="sptb">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="card mb-0">
                <div className="card-header row">
                  <div className="col-lg-6">
                    <h3 className="card-title">
                      {fromSeller ? "User Profile" : "Edit Profile"}
                    </h3>
                  </div>
                  <div className="col-lg-6" style={{ textAlign: "right" }}>
                    {fromSeller ? null : (
                      <a
                        href="#"
                        className="card-title"
                        style={{ fontSize: "15px" }}
                        onClick={handleUpdatePassword}
                      >
                        Change Password
                      </a>
                    )}
                  </div>
                </div>
                <div className="row gx-5">
                  <div
                    className={` ${
                      fromSeller ? "col-md-4 col-lg-4" : "col-md-12 col-lg-12"
                    }  `}
                  >
                    <div className="card-body">
                      <div
                        className={`${
                          fromSeller
                            ? "col-sm-12 col-md-12 col-sld-12"
                            : " col-sm-6 col-md-6"
                        }`}
                      >
                        <div className={`row`}>
                          <div className="profile-pic mb-5">
                            <img
                              src="../assets/images/faces/male/25.jpg"
                              className="brround avatar-xxl"
                              alt="user"
                            />
                          </div>
                          <div className={`${fromSeller ? "d-none" : "row"}  `}>
                            <div class="input-group mb-3">
                              <input
                                type="file"
                                class="form-control"
                                id="inputGroupFile02"
                              />
                              <label
                                class="input-group-text"
                                for="inputGroupFile02"
                              >
                                Upload
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div
                          className={` ${
                            fromSeller
                              ? "col-sm-12 col-md-12"
                              : "col-sm-6 col-md-6"
                          } `}
                        >
                          <div className="form-group">
                            <label className="form-label">Name</label>

                            {fromSeller ? (
                              <p>{saveModal.name || "-"}</p>
                            ) : (
                              <input
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                name="name"
                                value={saveModal.name}
                                onChange={handleInputField}
                              />
                            )}
                          </div>
                        </div>

                        {!fromSeller && (
                          <>
                            <div
                              className={` ${
                                fromSeller
                                  ? "col-sm-12 col-md-12"
                                  : "col-sm-6 col-md-6"
                              } `}
                            >
                              <div className="form-group">
                                <label className="form-label">
                                  Email address
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Email"
                                  name="email"
                                  value={saveModal.email}
                                  onChange={handleInputField}
                                />
                              </div>
                            </div>
                          </>
                        )}

                        <div
                          className={` ${
                            fromSeller
                              ? "col-sm-12 col-md-12"
                              : "col-sm-6 col-md-6"
                          } `}
                        >
                          <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            {fromSeller ? (
                              <p>{saveModal.phonenumber || "-"}</p>
                            ) : (
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Number"
                                name="phonenumber"
                                value={saveModal.phonenumber}
                                onChange={handleInputField}
                              />
                            )}
                          </div>
                        </div>
                        <div
                          className={` ${
                            fromSeller
                              ? "col-sm-12 col-md-12"
                              : "col-sm-6 col-md-6"
                          } `}
                        >
                          <div className="form-group">
                            <label className="form-label">Country</label>
                            {fromSeller ? (
                              <p>{saveModal.location || "-"}</p>
                            ) : (
                              <select
                                className="form-control "
                                data-placeholder="Select"
                                name="location"
                                value={saveModal.location}
                                onChange={handleInputField}
                              >
                                <option>--Select--</option>
                                <option value={1}>Germany</option>
                                <option value={2}>Real Estate</option>
                                <option value={3}>Canada</option>
                                <option value={4}>Usa</option>
                                <option value={5}>Afghanistan</option>
                                <option value={6}>Albania</option>
                                <option value={7}>China</option>
                                <option value={8}>Denmark</option>
                                <option value={9}>Finland</option>
                                <option value={10}>India</option>
                                <option value={11}>Kiribati</option>
                                <option value={12}>Kuwait</option>
                                <option value={13}>Mexico</option>
                                <option value={14}>Pakistan</option>
                              </select>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label">Address</label>
                            {fromSeller ? (
                              <p>{saveModal.address || "-"}</p>
                            ) : (
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Home Address"
                                name="address"
                                value={saveModal.address}
                                onChange={handleInputField}
                              />
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label">About Me</label>
                            {fromSeller ? (
                              <p>{saveModal.aboutme || "-"}</p>
                            ) : (
                              <textarea
                                rows={5}
                                className="form-control"
                                placeholder="Enter About your description"
                                defaultValue={""}
                                name="aboutme"
                                value={saveModal.aboutme}
                                onChange={handleInputField}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {fromSeller && (
                    <>
                      <div className="col-md-8 col-lg-8">
                        {(allAdds || []).map((items) => {
                          return (
                            <ProductCard
                              /* editId={editAd._id} */
                              fromSeller={fromSeller}
                              items={items}
                              /* handlePageKey={handlePageKey}
                            handleEditAdd={handleEditAdd}
                            handleDeleteAdd={handleDeleteAdd} */
                              callFrom="MyAds"
                            />
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>

                <div className="card-footer">
                  {fromSeller ? (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={closeSellerPage}
                    >
                      Back
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleUpdateProfile}
                    >
                      Updated Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/User Dashboard*/}
    </div>
  );
}
