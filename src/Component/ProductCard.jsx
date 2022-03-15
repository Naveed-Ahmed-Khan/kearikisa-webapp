import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import productImg from "../assets/img/product.png";
import { callApi } from "../Utitlies/callAPI";

export default function ProductCard({
  items,
  handlePageKey,
  handleEditAdd,
  handleDeleteAdd,
  callFrom,
  fromSeller,
}) {
  useEffect(() => {
    getReview();
  });

  console.log("items are" + JSON.stringify(items));

  const [tags, setTagsList] = useState([]);
  const [productRating, setProductRating] = useState(0);
  const getReview = async () => {
    const addsReview = await callApi(`/review/ad/${items._id}`);
    let sumAllReview = 0;
    let averageReview = 0;
    addsReview.forEach((element) => {
      sumAllReview += parseInt(element.rating) || 0;
    });
    averageReview = sumAllReview / (addsReview || []).length || 0;
    setProductRating(parseInt(averageReview));
  };

  let tagsList = [];

  tags.forEach((item) => {
    tagsList.push({ tag: item.name });
  });
  const getTags = async () => {
    const { metalist } = await callApi("/tag", "get");
    setTagsList(metalist);
    console.log(metalist);
  };
  useEffect(() => {
    getTags();
  }, []);

  const showStar = () => {
    if (productRating === 0) {
      return (
        <React.Fragment>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
        </React.Fragment>
      );
    } else if (productRating === 1) {
      return (
        <React.Fragment>
          <i class="fa fa-star" style={{ color: "yellow" }}></i>
          <i class="fa fa-star "></i>
          <i class="fa fa-star "></i>
          <i class="fa fa-star "></i>
          <i class="fa fa-star "></i>
        </React.Fragment>
      );
    } else if (productRating === 2) {
      return (
        <React.Fragment>
          <i class="fa fa-star" style={{ color: "yellow" }}></i>
          <i class="fa fa-star" style={{ color: "yellow" }}></i>
          <i class="fa fa-star "></i>
          <i class="fa fa-star "></i>
          <i class="fa fa-star "></i>
        </React.Fragment>
      );
    } else if (productRating === 3) {
      return (
        <React.Fragment>
          <i class="fa fa-star" style={{ color: "yellow" }}></i>
          <i class="fa fa-star" style={{ color: "yellow" }}></i>
          <i class="fa fa-star" style={{ color: "yellow" }}></i>
          <i class="fa fa-star "></i>
          <i class="fa fa-star "></i>
        </React.Fragment>
      );
    } else if (productRating === 4) {
      return (
        <React.Fragment>
          <i class="fa fa-star" style={{ color: "yellow" }}></i>
          <i class="fa fa-star" style={{ color: "yellow" }}></i>
          <i class="fa fa-star" style={{ color: "yellow" }}></i>
          <i class="fa fa-star" style={{ color: "yellow" }}></i>
          <i class="fa fa-star "></i>
        </React.Fragment>
      );
    } else if (productRating === 5) {
      return (
        <React.Fragment>
          <i class="fa fa-star" style={{ color: "yellow" }}></i>
          <i class="fa fa-star" style={{ color: "yellow" }}></i>
          <i class="fa fa-star" style={{ color: "yellow" }}></i>
          <i class="fa fa-star" style={{ color: "yellow" }}></i>
          <i class="fa fa-star" style={{ color: "yellow" }}></i>
        </React.Fragment>
      );
    }
  };
  return (
    <>
      <div
        className={` ${
          fromSeller
            ? "col-sm-10 col-md-10 col-lg-6 col-xl-6 mx-auto"
            : " col-md-8 col-lg-4  col-xl-3 "
        } `}
      >
        <div className="card overflow-hidden">
          {/* <div className="ribbon ribbon-top-left text-danger">
      <span className="bg-danger">
        featured
      </span>
    </div> */}
          <div className="item-card9-img">
            <div
              className="item-card9-imgs"
              style={{
                display: "grid",
                placeItems: "center",
              }}
            >
              <img
                src={items.mainimg ? items.mainimg : productImg}
                alt={items.title}
                style={{
                  objectFit: fromSeller ? "fill" : "cover",
                  height: "200px",
                }}
              />
            </div>
            <div className="item-card9-icons">
              {
                callFrom === "MyAds" ? (
                  <>
                    {!fromSeller && (
                      <>
                        <a
                          href="#"
                          onClick={(e) => handleEditAdd(e, items)}
                          className="item-card9-icons1 wishlist"
                        >
                          <i className="fa fa fa-edit" />
                        </a>
                        <a
                          href="#"
                          onClick={(e) => handleDeleteAdd(e, items)}
                          className="item-card9-icons1 wishlist"
                        >
                          <i className="fa fa fa-trash" />
                        </a>
                      </>
                    )}
                  </>
                ) : null
                // <a
                //   onClick={(e) => {
                //     e.preventDefault();
                //   }}
                //   href="#"
                //   className="item-card9-icons1 wishlist"
                // >
                //   <i className="fa fa fa-heart-o" />
                // </a>
              }
            </div>
          </div>
          <div className="card-body">
            {/* <div className="col-sm-10 col-md-10 col-lg-10"></div>
            <div className="col-sm-2 col-md-2 col-lg-2">
              <p>
                <button
                  class="btn btn-primary"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <i class="fa fa-share"></i>
                </button>
              </p>
              <div class="collapse" id="collapseExample">
                <div class="card card-body">
                  <i class="fa fa-facebook"></i>
                  <i class="fa fa-facebook"></i>
                  <i class="fa fa-facebook"></i>
                  <i class="fa fa-facebook"></i>
                </div>
              </div>
            </div> */}
            <div className="item-card9">
              {items.category}

              <a
                href="#"
                onClick={(e) => {
                  handlePageKey(e, 101, items);
                }}
                className="text-dark mt-2"
              >
                <h4 className="font-weight-semibold mt-1">{items.title}</h4>
              </a>
              <p>{items.description}</p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {tagsList.map((item) => {
                  return (
                    <p
                      style={{
                        margin: "0 0 4px 4px",
                        padding: "2px 4px",
                        borderRadius: "4px",
                        border: "1px solid rgba(0, 0, 0, 0.19)",
                        cursor: "pointer",
                      }}
                    >
                      {item.tag}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="item-card9-footer d-flex">
              <div className="item-card9-cost">
                <h4
                  className="
                    text-dark
                    font-weight-semibold
                    mb-0
                    mt-0
                    "
                >
                  BWP {items.price}
                </h4>
              </div>
              <div class="ms-auto">{showStar()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
/* col-lg-4 col-md-8 col-xl-3 */
