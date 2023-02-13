import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import LoadingOverlay from "react-loading-overlay";
import Loader from "./Loader";

const Auth = () => {
  const [searchParams] = useSearchParams();

  const [code, setCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setCode(decodeURIComponent(searchParams.get("code")));
    const getToken = async () => {
      const baseURL = "https://resilient-narwhal-ue20v8-dev-ed.trailblaze.my.salesforce.com/services/oauth2/token";
      let body = {
        grant_type: "authorization_code",
        code:code,
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

      let sample = {
        "access_token": "00D5h000008PDCm!AQ4AQOsHgOfLU.F7SxgpKi73xTIipreAVm9loZe62yv0GUm4er08VoF7fUSd7Z4wtLWDEn_6HMQW0CeOcpGPQPQJZenaxcy4",
        "refresh_token": "5Aep861sDdjizbO.v6ZaVUSXJ6pG0JIBy47ABCHmhaoHDBWcg6RTvse6.CxSfvkaKsMbjx6LdbUv7D_1BoO1p4p",
        "signature": "+Po0TZDB9xZpCXe5wkUUER0TSI3fiQ+ILm7eIoFF4SM=",
        "scope": "refresh_token web openid api",
        "id_token": "eyJraWQiOiIyNDAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiNDRWOXphVF9rTUVQNF9vYTQ3dWtldyIsInN1YiI6Imh0dHBzOi8vbG9naW4uc2FsZXNmb3JjZS5jb20vaWQvMDBENWgwMDAwMDhQRENtRUFPLzAwNTVoMDAwMDA4VW1tVEFBUyIsImF1ZCI6IjNNVkc5NW1nMGxrNGJhdGh4MjNPYm1DRkx5cXBEWnF5T1ZraFRZakZxMG1scWQ1REY2N3lZSjUua0xNVWR5VGtjenlFUFRqZEFEbGhhUGR6UVV3LkYiLCJpc3MiOiJodHRwczovL2xvZ2luLnNhbGVzZm9yY2UuY29tIiwiZXhwIjoxNjc2MTE0MDMxLCJpYXQiOjE2NzYxMTM5MTF9.h6_7OPuZEIB-amN4oTQ5x55En5_U2aj3UCVtvKJpL4skxwRUy7QKyYkfuCzmUpjvWORibezRE6JW_YUN1cnO7_zjUsuKrRSjkMAhaXqZ0spzlSEIbhVHPsmttzzteGIG5BZ2pngftlgqRHxOnc9w5d1gkd-G4LK-Nwl67Azya3biKyJqfcxinwF71jXNRVxnhfCbOvBhkH2QLrKCMqFQjINolcByZIegOkr1Q2pPp8Pc6lxvzwSNqHsAijYmO4YqyDplcu1N2f6ywMpTG0JsGDkWIU6oANEdlf_5m8bt89NUhndSn7AOsTy6fq5FcdTY53O3CaWurtO4BeP1YAhexGtJELwl1ETOi3_2KSNzV28o4nttaJtTvmINyhFaAFFbLtcFC3poOe3nNSJIVf8eBla_kZVRD1DYi_m96cC2LLsmQQuRt49lBE85pM23Sc6Az8f81iQFwdcOHN7snwE7jL8PrW2JuHrYr35xqXzmGjjaEIcjSsNVlOLkQriDfm_E7su-5tpxvvGQh5gwkHbj2Z5s4W4KuOVANmhTg1l3uqBlj0z3VX8ouQjdHt6ICPkGljjuV0lpL7U00ZzPYN3KV2iCrSbgkgWkoihtX5fWB9sC9604uay0rp_b7-5MLJiHvuxs5sm_LvZVnZ808b2xvhKnZL6x1kmJF6amfCfGwCM",
        "instance_url": "https://resilient-narwhal-ue20v8-dev-ed.trailblaze.my.salesforce.com",
        "id": "https://login.salesforce.com/id/00D5h000008PDCmEAO/0055h000008UmmTAAS",
        "token_type": "Bearer",
        "issued_at": "1676113911346"
    }
      await axios(options)
        .then((response) => {
          console.log("response>>>>", response);
          console.log("response.data>>>>", JSON.stringify(response.data));
          console.log("response.data.access_token>>>>", JSON.stringify(response.data.access_token));
          sessionStorage.setItem('data', JSON.stringify(response.data))
          sessionStorage.setItem('token', response.data.access_token)
          navigate('/csv')
        })
        .catch((e) => {
          // sessionStorage.setItem('data', JSON.stringify(sample))
          // sessionStorage.setItem('token', sample.access_token)
          // navigate('/csv')
          console.log("e >>>", e);
        });
    };
    if (code) {
      getToken();
    }
  }, [code, searchParams]);

  return (
    <Loader isActive={true} />
  )
};

export default Auth;
