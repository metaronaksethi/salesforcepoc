import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Home from "../home/Home";
import "./CSVStyles.scss";

const CsvImporter = () => {
  const navigate = useNavigate();

  const [baseFile, setBaseFile] = useState("");
  const [loader, setLoader] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  /*Get data from localStorage */
  let data = sessionStorage.getItem("data");
  data = JSON.parse(data);
  const token = sessionStorage.getItem("token");

  /**
   * Navigate to home page after uploading a csv successfully
   **/

  useEffect(() => {
    if (uploaded) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [uploaded]);

  /**
   * Execute three services back to back for
   * Create a job
   * Get a job id and upload CSV
   * Update status of CSV uploaded successfully
   */
  useEffect(() => {
    const uploadCSV = async () => {
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
          axios({
            method: "PUT",
            url: `${data.instance_url}/services/data/v50.0/jobs/ingest/${response.data.id}/batches`,
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "text/csv",
            },
            data: baseFile,
          })
            .then((res) => {
              axios({
                method: "PATCH",
                url: `${data.instance_url}/services/data/v50.0/jobs/ingest/${response.data.id}`,
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "application/json",
                },
                data: {
                  state: "UploadComplete",
                },
              })
                .then((result) => {
                  setLoader(false);
                  setUploaded(true);
                })
                .catch((e) => console.log(e));
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => {
          console.log({ e });
        });
    };
    /* If we get buffer of CSV then we execute uploadCSV function */
    if (baseFile) {
      uploadCSV();
    }
  }, [baseFile]);

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseFile(base64);
    setLoader(true);
  };

  /**
   * Convert CSV into Base64
   * @param {*} file
   * @returns Base64 String
   */
  
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
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
