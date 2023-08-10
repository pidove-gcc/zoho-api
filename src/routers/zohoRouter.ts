import { Router } from "express";
import { book, getbook, getbookinghour, getservice, getstaff, getzohotoken, saveConvertion } from "../services";
  
  const zohoRouter = Router();
  
  zohoRouter.get("/genretoken",getzohotoken);
  zohoRouter.post("/gethours",getbookinghour);
  zohoRouter.post("/info",getservice);
  zohoRouter.post("/getstaff",getstaff);
  zohoRouter.post("/getbook",getbook);
  zohoRouter.post("/saveconvert",saveConvertion);
  zohoRouter.post("/booking",book);
  export { zohoRouter };
  