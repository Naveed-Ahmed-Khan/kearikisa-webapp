import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Component/Footer";
import Topnavbar from "./Component/Topnavbar";
import Home from "./Component/Home";
import Contact from "./Component/Contact";
import About from "./Component/About";
import BrowseCategories from "./Component/BrowseCategories";
import "./assets/js";
import { useEffect } from "react";
import { ExternalJsCall } from "./Utitlies/LoadExternalJs";
import { stickyHeader } from "./Utitlies/stickyHeader";
import PostAdd from "./Component/PostAdd";
import { Provider } from "react-redux";
import Store from "./Component/Store";
import MyAds from "./Component/MyAds";
import Profile from "./Component/Profile";
import PrivacyPolicy from "./Component/PrivacyPolicy";
import TermsCondition from "./Component/TermsCondition";
import StaySafe from "./Component/StaySafe";
import GetVerified from "./Component/GetVerified";
import BrowseResults from "./Component/BrowseResults";
const App = () => {
  useEffect(() => {
    ExternalJsCall();
    stickyHeader();
  }, []);
  return (
    <div className="main-body">
      <div className="horizontalMenucontainer">
        <Provider store={Store}>
          <Router>
            {/*Topbar*/}
            <Topnavbar />
            {/*Topbar*/}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact_us" element={<Contact />} />
              <Route path="/about_us" element={<About />} />
              <Route path="/results" element={<BrowseResults />} />

              <Route path="/browse_categories" element={<BrowseCategories />} />
              <Route path="/ad_post" element={<PostAdd />} />
              <Route path="/my_ads" element={<MyAds />} />
              <Route path="/my_profile" element={<Profile />} />
              <Route path="/privacy_policy" element={<PrivacyPolicy />} />
              <Route path="/terms_condition" element={<TermsCondition />} />
              <Route path="/stay_safe" element={<StaySafe />} />
              <Route path="/get_verified" element={<GetVerified />} />
            </Routes>
            {/*Footer Section*/}
            <Footer />
            {/*Footer Section*/}
          </Router>
        </Provider>
      </div>
    </div>
  );
};

export default App;
