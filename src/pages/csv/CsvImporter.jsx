import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { CreateJob } from "../../service/auth";
import Home from "../home/Home";
import "./CSVStyles.scss";

const CsvImporter = () => {
  const [baseFile, setBaseFile] = useState("");
  const [loader, setLoader] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  let data = sessionStorage.getItem("data");
  data = JSON.parse(data);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (uploaded) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [uploaded]);

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseFile(base64);
    setLoader(true);
    // const token = await localStorage.setItem("token","00D5h000008PDCm!AQ4AQKXe8B2QcEQLuZ0sZI1UG5n8n54HQbhnWoN6zCdjdNg17VhCcvG8DdLwRQ.cpHX5_5jiv6Il3vq4YeszVh_olg9dayUw");
    console.log(
      "token>>>>",
      `${data.instance_url}/services/data/v50.0/jobs/ingest`
    );
    const response = { id: "7505h00000I8OnHAAV" };

    await axios({
      method: "POST",
      url: `${data.instance_url}/services/data/v50.0/jobs/ingest`,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: {
        object: "Account",
        externalIdFieldName: "myExtId__c",
        contentType: "CSV",
        operation: "upsert",
        lineEnding: "CRLF",
      },
    })
      .then((response) => {
        console.log("response>>>>", response);
        axios({
          method: "PUT",
          url: `${data.instance_url}/services/data/v50.0/jobs/ingest/${response.id}/batches`,
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          data: base64,
        })
          .then((res) => {
            console.log("res>>>>", res);
            axios({
              method: "PATCH",
              url: `${data.instance_url}/services/data/v50.0/jobs/ingest/${response.id}`,
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
              data: {
                state: "UploadComplete",
              },
            })
              .then((result) => {
                console.log("res>>>>", result);
                setLoader(false);
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => {
        console.log("e >>>", e);
        axios({
          method: "PUT",
          url: `${data.instance_url}/services/data/v50.0/jobs/ingest/${response.id}/batches`,
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          data: base64,
        })
          .then((res) => console.log("res>>>>", res))
          .catch((e) => {
            console.log("e >>>", e);
            axios({
              method: "PATCH",
              url: `${data.instance_url}/services/data/v50.0/jobs/ingest/${response.id}`,
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
              data: {
                state: "UploadComplete",
              },
            })
              .then((result) => {
                console.log("res>>>>", result);
                setLoader(false);
                setUploaded(true);
              })
              .catch((e) => {
                console.log("e >>>", e);
                setLoader(false);
                setUploaded(true);
              });
          });
      });

    // CreateJob({
    //   object: "Account",
    //   externalIdFieldName: "myExtId__c",
    //   contentType: "CSV",
    //   operation: "upsert",
    //   lineEnding: "CRLF",
    // }).then((result) => {
    //   console.log("result >>>>", result);
    // });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div>
      <Loader isActive={loader} />
      <div className="csv-container">
        <h3>Upload CSV</h3>
        <br></br>
        <input
          type="file"
          onChange={(e) => {
            uploadFile(e);
          }}
        />
        <br></br>
        <br></br>
        {uploaded && <h4>Uploaded Successfully...</h4>}
      </div>
      <footer>
        <Home
          style={{
            bottom: 0,
            top: "auto",
            width: "100%",
            justifyContent: "space-around",
            transform: "translate(-50%, 0%)",
            padding: 0,
          }}
        />
      </footer>
    </div>
  );
};

export default CsvImporter;
