import React, { useEffect, useState } from "react";
import { callApi } from "../Utitlies/callAPI";
import Swal from "sweetalert2";
import productImg from "../assets/img/product.png";
import { useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import Profile from "./Profile";
import { Button, Collapse } from "react-bootstrap";

export default function Product(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [allAdds, setAllAdds] = useState("");
  const [searchModal, setSearchModal] = useState("");

  const { seletedAdd, handlePageKey } = props;
  const createdData = seletedAdd.createdAt.split("T");

  const [review, setReview] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [saveModalReview, setSaveModalReview] = useState({
    name: "",
    adid: (seletedAdd || {})._id || null,
    reviewbody: "",
    rating: "",
  });
  const [sellerInfo, setSellerInfo] = useState({});
  const [sellerPage, setSellerPage] = useState(false);

  useEffect(() => {
    if (isLoading === true) {
      getNonpremiumadd();
    }
    handleSearch();
    /* getReview(); */
  }, [searchModal]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSaveModalReview({
      ...saveModalReview,
      [name]: value,
    });
  };

  const hanldePostReview = async () => {
    const postReview = await callApi(
      `/review/ad/${seletedAdd._id}`,
      "post",
      saveModalReview
    );
    if (postReview) {
      Swal.fire("Review Added", "", "success");
      getReview();
    }
  };

  console.log(seletedAdd);

  const getSeller = async () => {
    const sellerInfo = await callApi(
      `/getseller/${seletedAdd.sellerid}`,
      "get"
    );
    console.log("Seller INfo " + sellerInfo);
    if ((sellerInfo.msg || {})._id) {
      setSellerInfo(sellerInfo.msg);
      setSellerPage(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "User not found",
      });
    }
  };
  const getReview = async () => {
    const reviewForAdd = await callApi(`/review/ad/${seletedAdd._id}`, "get");
    setReview(reviewForAdd);
  };
  const handleRating = (e) => {
    const { value } = e.target;
    let newValue = 0;
    if (parseInt(value) > 5) {
      newValue = 5;
    } else if (parseInt(value) < 0) {
      newValue = 0;
    } else {
      newValue = parseInt(value);
    }

    setSaveModalReview({
      ...saveModalReview,
      rating: newValue,
    });
  };
  const closeSellerPage = () => {
    setSellerPage(false);
  };
  const dispatch = useDispatch();
  const registerUserToken = useSelector((state) => state.logIn.payload);
  const userInfo = useSelector((state) => state.userInfo);

  /* console.log("user is" + JSON.stringify(userInfo));
  console.log("sellerInfo", sellerInfo); */

  /* useEffect(() => {
    getNonpremiumadd();
    handleSearch();
  }, [searchModal]); */

  const getNonpremiumadd = async () => {
    const adds = await callApi("/ad/getnonpremium");
    setAllAdds(adds);
    setIsLoading(false);
  };
  const handleSearch = () => {
    /* console.log(allAdds); */
    /* console.log(searchModal) */
    let filterAdds;
    if (allAdds !== null && searchModal === seletedAdd.tag) {
      filterAdds = allAdds.filter((item) => item.tag === searchModal);

      dispatch({
        type: "MainSearch",
        data: filterAdds,
      });
      navigate(`/tag/${filterAdds[0].tag}`);
      /* console.log(filterAdds); */
    } else if (allAdds !== null && searchModal === seletedAdd.category) {
      filterAdds = allAdds.filter((item) => item.category === searchModal);
      dispatch({
        type: "MainSearch",
        data: filterAdds,
      });
      navigate(`/category/${filterAdds[0].category}`);
      /* console.log(filterAdds); */
    } else if (allAdds !== null && searchModal === seletedAdd.location) {
      filterAdds = allAdds.filter((item) => item.location === searchModal);
      dispatch({
        type: "MainSearch",
        data: filterAdds,
      });
      navigate(`/location/${filterAdds[0].location}`);
      /* console.log(filterAdds); */
    }
  };

  return (
    <>
      {sellerPage ? (
        <Profile
          sellerData={sellerInfo}
          closeSellerPage={closeSellerPage}
          fromSeller={true}
        />
      ) : (
        <div>
          <div>
            {/*Sliders Section*/}
            <div>
              <div
                className="cover-image sptb-1 bg-background"
                data-bs-image-src="../assets/images/banners/banner1.jpg"
              >
                <div className="header-text1 mb-0">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-8 col-lg-12 col-md-12 d-block mx-auto">
                        <div className="text-center text-white">
                          <h1 className>
                            <span className="font-weight-bold">
                              {(props.allAdds || []).length}
                            </span>{" "}
                            Product Available
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /header-text */}
              </div>
            </div>
            {/*/Sliders Section*/}
            {/*Breadcrumb*/}
            <div className="bg-white border-bottom">
              <div className="container">
                <div className="page-header">
                  <h4 className="page-title">{seletedAdd.category}</h4>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link
                        to="/"
                        onClick={() =>
                          dispatch({
                            type: "ActiveNav",
                            data: "Home",
                          })
                        }
                      >
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <a href onClick={(e) => handlePageKey(e, 100, null)}>
                        Categories
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {seletedAdd.category}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            {/*/Breadcrumb*/}
            {/*Add listing*/}
            <section className="sptb">
              <div className="container">
                <div className="row">
                  {/*Right Side Content*/}
                  <div className="col-xl-4 col-lg-4 col-md-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Posted By</h3>
                      </div>
                      <div className="card-body item-user">
                        <div className="profile-pic mb-0">
                          <img
                            src="../assets/images/faces/male/25.jpg"
                            className="brround avatar-xxl"
                            alt="user"
                          />
                          <div className>
                            <a
                              href="userprofile.html"
                              onClick={(e) => {
                                e.preventDefault();
                                getSeller();
                              }}
                              className="text-dark"
                            >
                              <h4 className="mt-3 mb-1 font-weight-semibold">
                                {seletedAdd.sellername}
                              </h4>
                            </a>
                            <div className="mt-3">
                              <span className="text-muted">
                                Posted Date:{" "}
                                <strong>
                                  {createdData[0] ? createdData[0] : ""}
                                </strong>
                                <br />
                                Posted Time:{" "}
                                <strong>
                                  {createdData[1]
                                    ? createdData[1].slice(0, 5)
                                    : ""}
                                </strong>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body item-user">
                        <div
                          style={{
                            display: "flex",
                            gap: "18px",
                            justifyContent: "center",
                            alignseletedAdd: "center",
                          }}
                        >
                          <div className="fa fa-phone"></div>
                          <div>
                            +(267) {toggle ? seletedAdd.phonenumber : "..."}
                          </div>

                          <button
                            onClick={() => {
                              setToggle(!toggle);
                            }}
                            style={{
                              padding: "0px",
                              margin: "0px",
                              border: "none",
                              background: "none",
                              color: "#797896",
                            }}
                          >
                            {!toggle ? "Show More" : "Show Less"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*Right Side Content*/}
                  <div className="col-xl-8 col-lg-8 col-md-12">
                    {isLoading === true ? (
                      <div
                        style={{
                          width: "100%",
                          minHeight: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div class="spinner-border text-success" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/*Classified Description*/}
                        <div className="card overflow-hidden">
                          <div className="card-body h-100">
                            <div className="item-det mb-4">
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                                className="text-dark"
                              >
                                <h3>{seletedAdd.title}</h3>
                              </a>
                              <div className="d-flex">
                                <ul className="d-flex mb-0">
                                  <li className="me-1">
                                    <button
                                      className="btn"
                                      onClick={() => {
                                        setSearchModal(seletedAdd.category);
                                      }}
                                    >
                                      <i className="icon icon-briefcase text-muted me-1" />
                                      {seletedAdd.category}
                                    </button>
                                  </li>
                                  <li className="me-5">
                                    <button
                                      className="btn"
                                      onClick={() => {
                                        setSearchModal(seletedAdd.location);
                                      }}
                                    >
                                      <i className="icon icon-location-pin text-muted me-1" />
                                      {seletedAdd.location}
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="product-slider carousel-slide-2">
                              <div
                                id="carouselFade"
                                className="carousel slide carousel-fade"
                                data-bs-ride="carousel"
                                data-bs-loop="false"
                                data-bs-thumb="true"
                              >
                                <div className="arrow-ribbon2 bg-primary">
                                  BWP {seletedAdd.price}
                                </div>
                                <div
                                  className="carousel-inner slide-show-image"
                                  id="full-gallery"
                                >
                                  <div className="carousel-item active">
                                    <img
                                      src={
                                        seletedAdd.mainimg
                                          ? seletedAdd.mainimg
                                          : productImg
                                      }
                                      alt="img"
                                      style={{
                                        objectFit: "cover",
                                        margin: "0 auto",
                                      }}
                                    />
                                  </div>

                                  <div className="thumbcarousel">
                                    <a
                                      onClick={(e) => {
                                        e.preventDefault();
                                      }}
                                      className="carousel-control-prev"
                                      href="#carouselFade"
                                      role="button"
                                      data-bs-slide="prev"
                                    >
                                      <i
                                        style={{ color: "#199319" }}
                                        className="fa fa-angle-left"
                                        aria-hidden="true"
                                      />
                                    </a>
                                    <a
                                      onClick={(e) => {
                                        e.preventDefault();
                                      }}
                                      className="carousel-control-next"
                                      href="#carouselFade"
                                      role="button"
                                      data-bs-slide="next"
                                    >
                                      <i
                                        style={{ color: "#199319" }}
                                        className="fa fa-angle-right"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4">
                                <p>Share this on:</p>
                                <div
                                  id="share"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",

                                    gap: "1rem",
                                  }}
                                >
                                  <i class="fa fa-facebook"></i>
                                  <i class="fa fa-twitter"></i>
                                  <i class="fa fa-whatsapp"></i>
                                  <i class="fa fa-envelope"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header">
                            <h3 className="card-title">Description</h3>
                          </div>
                          <div className="card-body">
                            <div className="mb-4">{seletedAdd.description}</div>
                          </div>
                          <div className="pt-4 pb-4 px-5 border-top border-top">
                            <div className="list-id">
                              <div className="row">
                                <div className="col col-auto">
                                  Posted By {seletedAdd.sellername} / {"   "}
                                  {(createdData || "")[0]}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*Classified Description*/}

                        {/*/Related Posts*/}
                        {/*Comments*/}
                        <div className="card">
                          <div className="card-header">
                            <h3 className="card-title">Reviews</h3>
                          </div>
                          {(review || []).map((items) => {
                            return (
                              <div className="card-body p-0">
                                <div className="media p-5 border-top mt-0">
                                  <div className="d-flex me-3">
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                      }}
                                    >
                                      <img
                                        className="media-object brround"
                                        alt="64x64"
                                        src="../assets/images/faces/male/3.jpg"
                                      />
                                    </a>
                                  </div>

                                  <div className="media-body">
                                    <h5 className="mt-0 mb-1 font-weight-semibold">
                                      {items.name}
                                    </h5>
                                    <small className="text-muted">
                                      <span>
                                        <i className="fa fa-calendar" />{" "}
                                        {items.createdAt.split("T")[0]}
                                      </span>
                                      <span>
                                        <i className="ms-3 fa fa-clock-o" />{" "}
                                        {items.createdAt
                                          .split("T")[1]
                                          .slice(0, 5)}
                                      </span>
                                    </small>
                                    <p className="font-13 mb-2 mt-2">
                                      {items.reviewbody}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {/*/Comments*/}
                        {registerUserToken ? (
                          <div className="card mb-0">
                            <div className="card-header">
                              <h3 className="card-title">Add Review</h3>
                            </div>
                            <div className="card-body">
                              <div>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="name1"
                                    placeholder="Your Name"
                                    value={saveModalReview.name}
                                    name="name"
                                    onChange={handleInput}
                                  />
                                </div>
                                <div className="form-group">
                                  <div className="row gutters-xs mb-3">
                                    <div className="passwd">
                                      <label>Rate it (1 - 5)</label>
                                    </div>

                                    <div
                                      className="col-auto"
                                      style={{ paddingLeft: "11px" }}
                                    >
                                      <label className="colorinput">
                                        <input
                                          type="radio"
                                          className="colorinput-input"
                                          name="rating"
                                          value={1}
                                          onChange={handleRating}
                                        />
                                        <span className="colorinput-color bg-warning" />
                                      </label>
                                    </div>
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input
                                          name="rating"
                                          value={2}
                                          onChange={handleRating}
                                          type="radio"
                                          defaultValue="indigo"
                                          className="colorinput-input"
                                        />
                                        <span className="colorinput-color bg-warning" />
                                      </label>
                                    </div>
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input
                                          name="rating"
                                          value={3}
                                          onChange={handleRating}
                                          type="radio"
                                          defaultValue="purple"
                                          className="colorinput-input"
                                        />
                                        <span className="colorinput-color bg-warning" />
                                      </label>
                                    </div>
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input
                                          name="rating"
                                          value={4}
                                          onChange={handleRating}
                                          type="radio"
                                          defaultValue="pink"
                                          className="colorinput-input"
                                        />
                                        <span className="colorinput-color bg-warning" />
                                      </label>
                                    </div>
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input
                                          name="rating"
                                          value={5}
                                          onChange={handleRating}
                                          type="radio"
                                          defaultValue="red"
                                          className="colorinput-input"
                                        />
                                        <span className="colorinput-color bg-warning" />
                                      </label>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <textarea
                                    className="form-control"
                                    rows={6}
                                    placeholder="Your Review"
                                    defaultValue={""}
                                    value={saveModalReview.reviewbody}
                                    name="reviewbody"
                                    onChange={handleInput}
                                  />
                                </div>
                                <button
                                  onClick={hanldePostReview}
                                  className="btn btn-primary"
                                >
                                  Add Review
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
