// const fs = require("fs").promises;
// const path = require("path");
// const process = require("process");
import axios from "axios";
const fs = require("fs");

export async function LoadToken() {
    try {
        const response = await axios
          .post("https://accounts.zoho.com/oauth/v2/token", null, {
            params: {
              refresh_token:
                "1000.38a7ac8a3fcbb635bd20070e3a5812b9.1277fa1e6fea39c5361d4e06768efb10",
              client_id: "1000.WQ45NH1UWVVQHYW6B4Y9N96XUY91IT",
              client_secret: "3c7a89a7b9a49500f71794c217c14c2e4e19f4f602",
              grant_type: "refresh_token",
            },
          })
          .then((response) => {
            console.log(response.data);
            console.log("Se hizo la consulta con exito");
            let datos = JSON.stringify(response.data, null);
            fs.writeFileSync("token.json", datos);
      
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log("error: ", error);
  
      }
  }
