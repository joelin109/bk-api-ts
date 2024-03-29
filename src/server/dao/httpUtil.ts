import { Request, Response } from "express";
import StringUtil from '../util/util.fw.string';
import SessionUtil from '../util/util.fw.session'

const HttpUtil = {

    parseRequest: function (req: Request) {

        let request = {
            token: StringUtil.getParam(req, 'token', ''),
            sitecode: StringUtil.getParam(req, 'sitecode', ''),
            channel: StringUtil.getParam(req, 'channel', ''),
            appver: StringUtil.getParam(req, 'appver', ''),
            data: StringUtil.getParam(req, 'data'),
            time: StringUtil.getDateString(),

            url: "http://" + req.headers.host + req.originalUrl,
            referer: req.headers.referer,
            req_ip: SessionUtil.getIp(req),
            req_session_id: SessionUtil.getSessionId(req),
            req_user_agent: SessionUtil.getUserAgent(req),
            req_host: "http://" + req.headers.host
        }

        //console.log('----reqInfo----', JSON.stringify(request));
        return request;

    },


    Response: {

        commonFormat: function (res: Response, data: any, except_case: string, except_case_desc: string) {
            var response = {
                "code": "1",
                "code_desc": "success",
                "except_case": except_case || "",
                "except_case_desc": except_case_desc || "",
                "result": data || ""
            };

            res.json(response);
        },

        detailFormat: function (res: Response, data: any) {
            let response = {
                code: '1',
                code_desc: 'success',
                except_case: '',
                except_case_desc: '',
                result: {
                    detail: data ? data : '',
                },
            };
            res.json(response);
        },

        listFormat: function (res: Response, result: any) {

            let _result = {};

            if (result.rows && result.cur_rows) {
                _result = {
                    cur_page: result.cur_page,
                    max_page: result.max_page,
                    cur_rows: result.cur_rows,
                    total_rows: result.total_rows ? result.total_rows : result.cur_rows,
                    rows: result.rows,
                };
            }
            else {
                _result = {

                    rows: result,
                };
            }


            let response = {
                code: '1',
                code_desc: 'success',
                except_case: result.except_case,
                except_case_desc: result.except_case_desc,
                result: _result,
            };

            res.json(response);
        },

        error: function (res: Response, error: any) {
            let message = '';
            if (error instanceof Error) {
                res.json({
                    code: '0',
                    code_desc: 'system_error',
                    except_case: '',
                    except_case_desc: '',
                });
            } else {
                message = error;
                res.json({
                    code: '1',
                    code_desc: 'success',
                    except_case: '',
                    except_case_desc: message,
                });
            }
        }
    },
}

export default HttpUtil;