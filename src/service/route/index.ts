import { Express, Request, Response } from "express";
import apiC  from './../_config/apiConf';
import requireUser from "./../middleware/request";
import commonAction from "./../controller";
import WordAction from "./../controller/wordAction";


export default function (app: Express) {

  app.post(apiC.APIURL_Content_Dictionary_List, WordAction.getWordList);
  app.post(apiC.APIURL_Content_Dictionary_Detail, WordAction.getWordDetail);
  app.post(apiC.APIURL_Content_Dictionary_Update, requireUser, WordAction.updateWord);
  app.post(apiC.APIURL_Content_Dictionary_Remove, requireUser, WordAction.removeWord);


  app.get(apiC.APIURL_DataBase_Connection_Testing, commonAction.connectDataBase);
  app.get("/", function (req, res) {
    res.json({ message: "REST API Working !" });
  });


}