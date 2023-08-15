"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCrmContact = exports.getAvailableHours = exports.createCalendarEvent = void 0;
const helpers_1 = require("../helpers");
const googleapis_1 = require("googleapis");
const errors_1 = require("../data/errors");
const hubspot = __importStar(require("@hubspot/api-client"));
let hours = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
];
const createCalendarEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("body in create calendar event: ", req.body);
    const { date, startTime, endTime, name, email } = req.body;
    try {
        const auth = yield (0, helpers_1.authorize)();
        const calendar = googleapis_1.google.calendar({ version: "v3", auth });
        const isBusy = yield calendar.freebusy.query({
            requestBody: {
                timeMin: `${date}T${startTime}:00-06:00`,
                timeMax: `${date}T${endTime}:00-06:00`,
                timeZone: "UTC-6",
                items: [{ id: "primary" }],
            },
        });
        const busy = (_a = isBusy.data.calendars) === null || _a === void 0 ? void 0 : _a.primary.busy;
        if ((busy === null || busy === void 0 ? void 0 : busy.length) && (busy === null || busy === void 0 ? void 0 : busy.length) > 0) {
            return res.status(400).json({
                errorMessage: errors_1.Errors.calendar.GC2,
                errorType: "GC2",
            });
        }
        const resCalendar = yield calendar.events.insert({
            calendarId: "primary",
            requestBody: {
                summary: "Aggentia reunión",
                location: "CDMX",
                colorId: "3",
                description: `Hola ${name}, esta es tu cita para la consultoria que solicitaste con nuestro ejecutivo de Aggentia, recuerda estar en un lugar con buena conexión y con toda la actitud para comenzar este gran camino de cambios para tu empresa. ¡Hasta pronto!\nUnirse a la reunión Zoom\nhttps://us02web.zoom.us/j/81106499089?pwd=clVod1ZaYkdWYXJPSmdxeUlwVGtQZz09\nID de reunión: 811 0649 9089\nCódigo de acceso:613223`,
                attendees: [{ email }],
                start: {
                    dateTime: `${date}T${startTime}:00-06:00`,
                    timeZone: "UTC-6",
                },
                end: {
                    dateTime: `${date}T${endTime}:00-06:00`,
                    timeZone: "UTC-6",
                },
                reminders: {
                    useDefault: false,
                    overrides: [{ method: "email", minutes: 720 }],
                },
            },
        });
        // console.log("\n \n", { resCalendar }, "\n \n");
        next();
    }
    catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error });
    }
});
exports.createCalendarEvent = createCalendarEvent;
const getAvailableHours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.body;
    console.log("date: ", date);
    try {
        const auth = yield (0, helpers_1.authorize)();
        const calendar = googleapis_1.google.calendar({ version: "v3", auth });
        const resp = yield calendar.events.list({
            calendarId: "primary",
            timeMin: `${date}T09:00:00-06:00`,
            timeMax: `${date}T18:00:00-06:00`,
            singleEvents: true,
            orderBy: "startTime",
        });
        const events = resp.data.items;
        let busyHours = events === null || events === void 0 ? void 0 : events.map((event) => {
            let startTime = event.start.dateTime.slice(11, 16);
            let endTime = event.end.dateTime.slice(11, 16);
            let flag = false;
            startTime =
                startTime.split(":")[1] === "00"
                    ? startTime
                    : startTime.slice(0, 3) + "00";
            if (!(endTime.split(":")[1] === "00")) {
                flag = true;
                endTime = endTime.slice(0, 3) + "00";
            }
            const inicio = parseInt(startTime.split(":")[0]);
            const final = parseInt(endTime.split(":")[0]);
            const resultadosFinal = [];
            for (let i = inicio; i < final; i++) {
                resultadosFinal.push(i > 9 ? `${i}:00` : `0${i}:00`);
            }
            if (flag) {
                resultadosFinal.push(endTime);
            }
            return resultadosFinal;
        });
        busyHours = busyHours === null || busyHours === void 0 ? void 0 : busyHours.flat();
        const availableHours = hours.filter((hour) => !(busyHours === null || busyHours === void 0 ? void 0 : busyHours.includes(hour)));
        res.json({ availableHours });
    }
    catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error });
    }
});
exports.getAvailableHours = getAvailableHours;
const createCrmContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body in createcrmcontact: ", req.body);
    // return res.status(201).json({ data: req.body });
    const hubspotClient = new hubspot.Client({
        accessToken: process.env.HUBSPOT_ACCES_KEY,
    });
    try {
        const response = yield hubspotClient.crm.contacts.basicApi.create({
            properties: {
                firstname: req.body.name,
                lastname: "",
                email: req.body.email,
                phone: req.body.phone,
                lifecyclestage: "marketingqualifiedlead",
                hubspot_owner_id: "309066117",
            },
        });
        console.log("Respuesta de hubspot:", response);
        res.status(201).json();
    }
    catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error });
    }
});
exports.createCrmContact = createCrmContact;
