"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveConvertion = exports.getbook = exports.book = exports.getstaff = exports.getservice = exports.getbookinghour = exports.getzohotoken = void 0;
const axios_1 = __importDefault(require("axios"));
const Conversion_1 = require("../models/Conversion");
const errors_1 = require("../data/errors");
const fs = require("fs");
const path = require("path");
const getzohotoken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body in zohoauth: ", req.body);
    try {
        const response = yield axios_1.default
            .post("https://accounts.zoho.com/oauth/v2/token", null, {
            params: {
                refresh_token: "1000.38a7ac8a3fcbb635bd20070e3a5812b9.1277fa1e6fea39c5361d4e06768efb10",
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
    }
    catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error });
    }
});
exports.getzohotoken = getzohotoken;
const getbookinghour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body in zohoauth: ", req.body);
    try {
        let rawdata = fs.readFileSync("token.json");
        let token = JSON.parse(rawdata);
        const { access_token } = token;
        console.log("El token es: ", access_token);
        axios_1.default.defaults.headers.common['Authorization'] = `Zoho-oauthtoken ${access_token}`;
        const { date } = req.body;
        const response = yield axios_1.default.get("https://www.zohoapis.com/bookings/v1/json/availableslots", {
            params: {
                service_id: "3981843000000025125",
                staff_id: "3981843000002826324",
                selected_date: date,
                // selected_date: "2023-08-07",
            },
        });
        console.log("esto obtuve", response.data);
        res.status(200).json(response.data);
    }
    catch (error) {
        console.log(error);
        // console.log("El codigo es:", error.response.status)
        // console.log("error: ", error);
        res.status(400).json({ error });
    }
});
exports.getbookinghour = getbookinghour;
const getservice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body in zohoauth: ", req.body);
    try {
        let rawdata = fs.readFileSync("token.json");
        let token = JSON.parse(rawdata);
        const { access_token } = token;
        console.log("El token es: ", access_token);
        axios_1.default.defaults.headers.common['Authorization'] = `Zoho-oauthtoken ${access_token}`;
        const { id, workid } = req.body;
        const response = yield axios_1.default.get("https://www.zohoapis.com/bookings/v1/json/services", {
            params: {
                workspace_id: workid,
                service_id: id,
            },
        });
        console.log("esto obtuve", response.data);
        res.status(200).json(response.data);
    }
    catch (error) {
        console.log(error);
        // console.log("El codigo es:", error.response.status)
        // console.log("error: ", error);
        res.status(400).json({ error });
    }
});
exports.getservice = getservice;
const getstaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body in zohoauth: ", req.body);
    try {
        let rawdata = fs.readFileSync("token.json");
        let token = JSON.parse(rawdata);
        const { access_token } = token;
        console.log("El token es: ", access_token);
        axios_1.default.defaults.headers.common['Authorization'] = `Zoho-oauthtoken ${access_token}`;
        const { staff_id } = req.body;
        const response = yield axios_1.default.get("https://www.zohoapis.com/bookings/v1/json/staffs", {
            params: {
                // service_id: "3981843000000739121",
                staff_id: staff_id,
                // selected_date: "2023-08-07",
            },
        });
        console.log("esto obtuve", response.data);
        res.status(200).json(response.data);
    }
    catch (error) {
        console.log(error);
        // console.log("El codigo es:", error.response.status)
        // console.log("error: ", error);
        res.status(400).json({ error });
    }
});
exports.getstaff = getstaff;
const book = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body in zohoauth: ", req.body);
    try {
        let rawdata = fs.readFileSync("token.json");
        let token = JSON.parse(rawdata);
        const { access_token } = token;
        console.log("El token es: ", access_token);
        // axios.defaults.headers.common['Authorization'] = `Zoho-oauthtoken ${access_token}`;
        const { service_id, staff_id, from_time, customer_details, additional_fields } = req.body;
        console.log(customer_details);
        let formData = new FormData();
        formData.append("service_id", service_id);
        formData.append("staff_id", staff_id);
        formData.append("from_time", from_time);
        formData.append("customer_details", JSON.stringify(customer_details));
        // formData.append("additional_fields",JSON.stringify(additional_fields))
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://www.zohoapis.com/bookings/v1/json/appointment',
            headers: {
                'Authorization': `Zoho-oauthtoken ${access_token}`,
            },
            data: formData
        };
        const response = yield axios_1.default.request(config);
        // const response = await axios.post(
        //   "https://www.zohoapis.com/bookings/v1/json/appointment",
        //   {
        //     data:formData    
        //   }
        // );
        console.log(response);
        console.log("esto obtuve", response.data);
        res.status(200).json(response.data);
    }
    catch (error) {
        console.log(error);
        // console.log("El codigo es:", error.response.status)
        // console.log("error: ", error);
        res.status(400).json({ error });
    }
});
exports.book = book;
const getbook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body in zohoauth: ", req.body);
    try {
        let rawdata = fs.readFileSync("token.json");
        let token = JSON.parse(rawdata);
        const { access_token } = token;
        console.log("El token es: ", access_token);
        axios_1.default.defaults.headers.common['Authorization'] = `Zoho-oauthtoken ${access_token}`;
        const { booking_id } = req.body;
        const response = yield axios_1.default.get("https://www.zohoapis.com/bookings/v1/json/getappointment", {
            params: {
                // service_id: "3981843000000739121",
                booking_id: booking_id,
                // selected_date: "2023-08-07",
            },
        });
        console.log("esto obtuve", response.data);
        res.status(200).json(response.data);
    }
    catch (error) {
        console.log(error);
        // console.log("El codigo es:", error.response.status)
        // console.log("error: ", error);
        res.status(400).json({ error });
    }
});
exports.getbook = getbook;
const saveConvertion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body in create user: ", req.body);
    const { params, url, type } = req.body;
    try {
        const result = yield Conversion_1.DaoConver.create({ params, url, type });
        if (result)
            return res.status(201).send();
        // if (result) return next();
        return res
            .status(400)
            .json({ errorMessage: errors_1.Errors.user.US1, errorType: "US1" });
    }
    catch (error) {
        console.log("error saving user contact data: ", error);
        res.status(400).json({ error });
    }
});
exports.saveConvertion = saveConvertion;
//# sourceMappingURL=zohoServices.js.map