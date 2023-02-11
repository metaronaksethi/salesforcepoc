import React from "react";
import "./home.scss";
const Home = ({style}) => {
let  token = "";
if(sessionStorage.getItem('token')){
      token = sessionStorage.getItem('token');
}
  const handelAuthConnect = () => {

    let targetUrl = `${process.env.REACT_APP_HOST}/services/oauth2/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`

    window.location.href = targetUrl;
  };
  const handelAuthDisConnect = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <div  className="connect" style={style}>
        <div className="leftBlock">
         <span className="sfImg"></span>
        <h6>Salesforce</h6>   
        </div>
        {(!token) ? <button className="salesforceBtn" onClick={handelAuthConnect}>Connect</button> : <button className="salesforceBtn" onClick={handelAuthDisConnect}>Disconnect</button> }
      </div>
    </div>
  );
};

export default Home;
