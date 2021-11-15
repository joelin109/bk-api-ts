import { Request, Response } from "express";
import {DB} from '../dao/fw.dao.msql';

const commonAction = {

  connectDataBase: async function (req: Request, res: Response) {

    const result = await DB.testConnect();
    console.log("Database connecting...");
    return res.send({result });

},

};

export default commonAction;
