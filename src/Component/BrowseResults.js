import React, { useEffect, useState } from "react";
import { ExternalJsCall } from "../Utitlies/LoadExternalJs";
import Product from "./Product";
import { callApi } from "../Utitlies/callAPI";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";

const BrowseResults = () => {
  const params = useParams();
  const location = useLocation();
  const reduxState = useSelector((state) => state);
  const homeSearch = reduxState.MainSearch.payload;

  const [allAddsFilter, setAllAddsFilter] = useState([]);
  /* console.log(productSearch); */
  console.log(allAddsFilter);
  console.log(homeSearch);
  /* console.log(reduxState.MainSearch.payload); */

  const [seletedAdd, setSeletedAdd] = useState({});
  const handlePageKey = (e, key, items) => {
    setSeletedAdd(items);
    e.preventDefault();
    setCurrentPageKey(key);
  };
  useEffect(() => {
    setAllAddsFilter(homeSearch);
  }, [homeSearch]);

  const [CurrentPageKey, setCurrentPageKey] = useState(100);
  const browseCategory = (
    <React.Fragment>
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
                        {/* <span className="font-weight-bold">
                          {(allAddsFilter || []).length}
                        </span>
                        &nbsp;Result(s) Available for*/}
                        <span>
                          {location.pathname === "/results" && ""}
                          {location.pathname === `/tag/${params.name}` &&
                          (allAddsFilter[0] || []).tag
                            ? `${(allAddsFilter[0] || []).tag}`
                            : ""}
                          {location.pathname === `/category/${params.name}` &&
                          (allAddsFilter[0] || []).category
                            ? `${(allAddsFilter[0] || []).category}`
                            : ""}
                          {location.pathname === `/location/${params.name}` &&
                          (allAddsFilter[0] || []).location
                            ? `${(allAddsFilter[0] || []).location}`
                            : ""}
                        </span>
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
              {/* <h4 className="page-title">Product list</h4> */}
              <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  {location.pathname === "/results" && "Results"}
                  {location.pathname === `/tag/${params.name}` && "Tag"}
                  {location.pathname === `/category/${params.name}` &&
                    "Category"}
                  {location.pathname === `/location/${params.name}` &&
                    "Location"}
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
              <div className="col-xl-12 col-lg-12 col-md-12">
                {/*Add lists*/}
                <div className="mb-lg-0">
                  <div className="item2-gl">
                    <div className="tab-content">
                      <div className="tab-pane active" id="tab-12">
                        <div className="row">
                          {(allAddsFilter || []).map((items) => {
                            return (
                              <ProductCard
                                items={items}
                                handlePageKey={handlePageKey}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*/Add lists*/}
              </div>
            </div>
          </div>
        </section>
        {/*/Add Listings*/}
      </div>
    </React.Fragment>
  );
  const product = (
    <Product
      seletedAdd={seletedAdd}
      allAdds={allAddsFilter}
      handlePageKey={handlePageKey}
    />
  );
  if (CurrentPageKey === 100) {
    return <React.Fragment>{browseCategory}</React.Fragment>;
  } else if (CurrentPageKey === 101) {
    return <React.Fragment>{product}</React.Fragment>;
  }
};
export default BrowseResults;
