import { NextFunction, Request, Response } from "express";
import { ConverData, IError, ZohoAuth, ZohoAvailableHours, ZohoBookingAppointment } from "../interfaces";
import axios from "axios";
import { error } from "console";
import { DaoConver } from "../models/Conversion";
import { Errors } from "../data/errors";

const fs = require("fs");
const path = require("path");

export const getzohotoken = async (
  req: Request<{}, {}, {}>,
  res: Response
) => {
  console.log("body in zohoauth: ", req.body);
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
        res.status(200).json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ error });
  }
};
export const getbookinghour = async (
  req: Request<{}, {}, {date: string}>,
  res: Response
) => {
  console.log("body in zohoauth: ", req.body);
  try {
    let rawdata = fs.readFileSync("token.json");
    let token = JSON.parse(rawdata);
    const { access_token } = token;
    console.log("El token es: ", access_token);
    axios.defaults.headers.common['Authorization'] = `Zoho-oauthtoken ${access_token}`;
    const { date } = req.body;
    const response = await axios.get(
      "https://www.zohoapis.com/bookings/v1/json/availableslots",
      {
        params: {
          service_id: "3981843000000025125",
          staff_id: "3981843000002826324",
          selected_date: date,
          // selected_date: "2023-08-07",
        },
      }
    );
    console.log("esto obtuve", response.data)
    res.status(200).json(response.data);
  } catch (error: any) {
    console.log(error)
    // console.log("El codigo es:", error.response.status)
    // console.log("error: ", error);
    res.status(400).json({ error });
  }
};
export const getservice = async (
  req: Request<{}, {}, {id: string, workid:string}>,
  res: Response
) => {
  console.log("body in zohoauth: ", req.body);
  try {
    let rawdata = fs.readFileSync("token.json");
    let token = JSON.parse(rawdata);
    const { access_token } = token;
    console.log("El token es: ", access_token);
    axios.defaults.headers.common['Authorization'] = `Zoho-oauthtoken ${access_token}`;
    const {id,workid} = req.body
    const response = await axios.get(
      "https://www.zohoapis.com/bookings/v1/json/services",
      {
        params: {
          workspace_id: workid,
          service_id : id,
        },
      }
    );
    console.log("esto obtuve", response.data)
    res.status(200).json(response.data);
  } catch (error: any) {
    console.log(error)
    // console.log("El codigo es:", error.response.status)
    // console.log("error: ", error);
    res.status(400).json({ error });
  }
};
export const getstaff = async (
  req: Request<{}, {}, {staff_id:string}>,
  res: Response
) => {
  console.log("body in zohoauth: ", req.body);
  try {
    let rawdata = fs.readFileSync("token.json");
    let token = JSON.parse(rawdata);
    const { access_token } = token;
    console.log("El token es: ", access_token);
    axios.defaults.headers.common['Authorization'] = `Zoho-oauthtoken ${access_token}`;
    const {staff_id}= req.body;
    const response = await axios.get(
      "https://www.zohoapis.com/bookings/v1/json/staffs",
      {
        params: {
          // service_id: "3981843000000739121",
          staff_id: staff_id,
          // selected_date: "2023-08-07",
        },
      }
    );
    console.log("esto obtuve", response.data)
    res.status(200).json(response.data);
  } catch (error: any) {
    console.log(error)
    // console.log("El codigo es:", error.response.status)
    // console.log("error: ", error);
    res.status(400).json({ error });
  }
};
export const book = async (
  req: Request<{}, {}, ZohoBookingAppointment>,
  res: Response
) => {
  console.log("body in zohoauth: ", req.body);
  try {
    let rawdata = fs.readFileSync("token.json");
    let token = JSON.parse(rawdata);
    const { access_token } = token;
    console.log("El token es: ", access_token);
    // axios.defaults.headers.common['Authorization'] = `Zoho-oauthtoken ${access_token}`;
    const {service_id,staff_id,from_time,customer_details, additional_fields} = req.body;
    console.log(customer_details)
    let formData = new FormData();
    formData.append("service_id",service_id)
    formData.append("staff_id",staff_id)
    formData.append("from_time",from_time)
    formData.append("customer_details",JSON.stringify(customer_details))
    // formData.append("additional_fields",JSON.stringify(additional_fields))
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://www.zohoapis.com/bookings/v1/json/appointment',
      headers: { 
        'Authorization':`Zoho-oauthtoken ${access_token}`, 
      },
      data : formData
    }
    const response = await axios.request(config)
    // const response = await axios.post(
    //   "https://www.zohoapis.com/bookings/v1/json/appointment",
    //   {
    //     data:formData    
    //   }
    // );
    console.log(response)
    console.log("esto obtuve", response.data)
    res.status(200).json(response.data);
  } catch (error: any) {
    console.log(error)
    // console.log("El codigo es:", error.response.status)
    // console.log("error: ", error);
    res.status(400).json({ error });
  }
};

export const getbook = async (
  req: Request<{}, {}, {booking_id:string}>,
  res: Response
) => {
  console.log("body in zohoauth: ", req.body);
  try {
    let rawdata = fs.readFileSync("token.json");
    let token = JSON.parse(rawdata);
    const { access_token } = token;
    console.log("El token es: ", access_token);
    axios.defaults.headers.common['Authorization'] = `Zoho-oauthtoken ${access_token}`;
    const {booking_id}= req.body;
    const response = await axios.get(
      "https://www.zohoapis.com/bookings/v1/json/getappointment",
      {
        params: {
          // service_id: "3981843000000739121",
          booking_id: booking_id,
          // selected_date: "2023-08-07",
        },
      }
    );
    console.log("esto obtuve", response.data)
    res.status(200).json(response.data);
  } catch (error: any) {
    console.log(error)
    // console.log("El codigo es:", error.response.status)
    // console.log("error: ", error);
    res.status(400).json({ error });
  }
};

export const saveConvertion = async (
    req: Request<{}, {}, ConverData>,
    res: Response,
  ) => {
    console.log("body in create user: ", req.body);
    const { params, url, type } = req.body;
    try {
      const result = await DaoConver.create({ params, url, type });
      if (result) return res.status(201).send();
      // if (result) return next();
      return res
        .status(400)
        .json({ errorMessage: Errors.user.US1, errorType: "US1" } as IError);
    } catch (error) {
      console.log("error saving user contact data: ", error);
      res.status(400).json({ error });
    }
  };
