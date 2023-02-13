import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.scss";

const Home = ({ style }) => {
  const navigate = useNavigate();

  /**
   * Get token from localStorage
   */

  let token = "";
  if (sessionStorage.getItem("token")) {
    token = sessionStorage.getItem("token");
  }

  /**
   * On connect to salesforce execute this function
   */

  const handelAuthConnect = () => {
    let targetUrl = `${process.env.REACT_APP_HOST}/services/oauth2/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

    window.location.href = targetUrl;
  };

  /**
   * On disconnect from salesforce execute this function
   */
  const handelAuthDisConnect = () => {
    sessionStorage.clear();
    navigate(process.env.REACT_APP_HOME_URL);
  };

  return (
    <div>
      <div className="connect" style={style}>
        <div className="leftBlock">
          <span className="sfImg"></span>
          <h6>Salesforce</h6>
        </div>
        {!token ? (
          <button className="salesforceBtn" onClick={handelAuthConnect}>
            Connect
          </button>
        ) : (
          <button className="salesforceBtn" onClick={handelAuthDisConnect}>
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
