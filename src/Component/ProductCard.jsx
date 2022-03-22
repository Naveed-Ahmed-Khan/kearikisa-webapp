import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
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
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* console.log("items are" + JSON.stringify(items)); */

  const [searchModal, setSearchModal] = useState("");
  const [allAdds, setAllAdds] = useState("");

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
  /* console.log(search); */

  let tagsList = [];

  tags.forEach((item) => {
    tagsList.push({ tag: item.name });
  });
  const getTags = async () => {
    const { metalist } = await callApi("/tag", "get");
    setTagsList(metalist);
    /* console.log(metalist); */
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

  const getNonpremiumadd = async () => {
    const adds = await callApi("/ad/getnonpremium");
    setAllAdds(adds);
  };
  const handleSearch = () => {
    /* console.log(allAdds); */
    /* console.log(searchModal) */
    let filterAdds;
    if (searchModal === items.tag) {
      filterAdds = allAdds.filter((item) => item.tag === searchModal);

      dispatch({
        type: "MainSearch",
        data: filterAdds,
      });
      navigate(`/tag/${filterAdds[0].tag}`);
      /* console.log(filterAdds); */
    } else if (searchModal === items.category) {
      filterAdds = allAdds.filter((item) => item.category === searchModal);
      dispatch({
        type: "MainSearch",
        data: filterAdds,
      });
      navigate(`/category/${filterAdds[0].category}`);
      /* console.log(filterAdds); */
    }

    /* if (searchModal) {
      dispatch({
        type: "MainSearch",
        data: filterAdds,
      });
      navigate("/results");
    } */
  };

  useEffect(() => {
    getNonpremiumadd();
    handleSearch();
  }, [searchModal]);
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
            <div className="row">
              <div className="item-card9">
                <div
                  onClick={() => {
                    setSearchModal(items.category);
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {items.category}
                </div>

                <div
                  onClick={(e) => {
                    handlePageKey(e, 101, items);
                  }}
                  className="text-dark mt-2"
                >
                  <h4
                    className="font-weight-semibold mt-1"
                    style={{ cursor: "pointer" }}
                  >
                    {items.title}
                  </h4>
                </div>
                <p>{items.description}</p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 4px 4px",
                      padding: "2px 4px",
                      borderRadius: "4px",
                      border: "1px solid rgba(0, 0, 0, 0.19)",
                      cursor: "pointer",
                    }}
                    name="tag"
                    onClick={() => {
                      setSearchModal(items.tag);
                      console.log(searchModal);
                    }}
                  >
                    {items.tag}
                  </p>
                </div>
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
