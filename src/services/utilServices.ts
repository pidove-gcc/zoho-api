import { NextFunction, Request, Response } from "express";
import { authorize } from "../helpers";
import { google } from "googleapis";
import { IDTOUser, IError, IUserMeeting } from "../interfaces";
import { Errors } from "../data/errors";
import * as hubspot from "@hubspot/api-client";

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

export const createCalendarEvent = async (
  req: Request<{}, {}, IUserMeeting>,
  res: Response,
  next: NextFunction
) => {
  console.log("body in create calendar event: ", req.body);
  const { date, startTime, endTime, name, email } = req.body;
  try {
    const auth = await authorize();
    const calendar = google.calendar({ version: "v3", auth });

    const isBusy = await calendar.freebusy.query({
      requestBody: {
        timeMin: `${date}T${startTime}:00-06:00`,
        timeMax: `${date}T${endTime}:00-06:00`,
        timeZone: "UTC-6",
        items: [{ id: "primary" }],
      },
    });

    const busy = isBusy.data.calendars?.primary.busy;
    if (busy?.length && busy?.length > 0) {
      return res.status(400).json({
        errorMessage: Errors.calendar.GC2,
        errorType: "GC2",
      } as IError);
    }

    const resCalendar = await calendar.events.insert({
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
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ error });
  }
};

export const getAvailableHours = async (
  req: Request<{}, {}, { date: string }>,
  res: Response
) => {
  const { date } = req.body;
  console.log("date: ", date);
  try {
    const auth = await authorize();
    const calendar = google.calendar({ version: "v3", auth });
    const resp = await calendar.events.list({
      calendarId: "primary",
      timeMin: `${date}T09:00:00-06:00`,
      timeMax: `${date}T18:00:00-06:00`,
      singleEvents: true,
      orderBy: "startTime",
    });
    const events = resp.data.items;

    let busyHours = events?.map((event: any) => {
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

    busyHours = busyHours?.flat();
    const availableHours = hours.filter(
      (hour) => !busyHours?.includes(hour as any)
    );
    res.json({ availableHours });
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ error });
  }
};

export const createCrmContact = async (
  req: Request<{}, {}, IDTOUser>,
  res: Response
) => {
  console.log("body in createcrmcontact: ", req.body);
  // return res.status(201).json({ data: req.body });

  const hubspotClient = new hubspot.Client({
    accessToken: process.env.HUBSPOT_ACCES_KEY as string,
  });
  try {
    const response = await hubspotClient.crm.contacts.basicApi.create({
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
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ error });
  }
};
