import { Request, Response } from "express";
import HttpUtil from '../dao/httpUtil';
import WordLogic from '../service/wordLogic';

const wordAction = {

    getWordList: async function (req: Request, res: Response) {

        console.log(req.body)
        let param = HttpUtil.parseRequest(req);

        let filter = param.data;
        const result = await WordLogic.wordList(filter);

        HttpUtil.Response.listFormat(res, result);

    },


    getWordDetail: async function (req: Request, res: Response) {

        console.log(req.body)
        let param = HttpUtil.parseRequest(req);

        const { error, data } = await WordLogic.wordDetail(param.data.wort, param.data.id);
        if (data?.length > 1)
            HttpUtil.Response.listFormat(res, data);
        else
            HttpUtil.Response.detailFormat(res, data[0]);

    },


    updateWord: async function (req: Request, res: Response) {

        console.log(req.body)
        let param = HttpUtil.parseRequest(req);

        const result = await WordLogic.wordUpdate(param.data);
        HttpUtil.Response.detailFormat(res, result.data[0]);

    },


    removeWord: async function (req: Request, res: any) {

        console.log(req.body)
        let param = HttpUtil.parseRequest(req);

        const result = await WordLogic.deleteWord(param.data);
        HttpUtil.Response.detailFormat(res, result);

    },

};

export default wordAction;