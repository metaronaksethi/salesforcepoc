import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import Loader from "./Loader";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState("");

  /**
   * get code from params, decode it and hit api for get access token object
   */
  useEffect(() => {
    /*Decode code uri */
    setCode(decodeURIComponent(searchParams.get("code")));
    /**
     * create a request for access token
     */
    const getToken = async () => {
      const baseURL = `${document.referrer}/services/oauth2/token`;
      let body = {
        grant_type: "authorization_code",
        code: code,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      };

      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(body),
        url: baseURL,
      };
      await axios(options)
        .then((response) => {
          // After getting a response from salesforce set data in our localStorage
          sessionStorage.setItem("data", JSON.stringify(response.data));
          sessionStorage.setItem("token", response.data.access_token);

          //Navigate to CSV uri
          navigate("/csv");
        })
        .catch((e) => {
          console.log({ e });
        });
    };
    /**
     * Execute token function when code is getting from params
     */
    if (code) {
      getToken();
    }
  }, [code, searchParams]);

  return <Loader isActive={true} />;
};

export default Auth;
