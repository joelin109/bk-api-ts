import { Request, Response } from "express";
import HttpUtil from '../dao/httpUtil';
/* let LoginDao = require('../dao/LoginDao');
let cookieCache = require('../util/CacheUtil').cookieCache; */

/**
 * 全局中间件，实现 token => user
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
/* exports.autoUser = async (req, res, next) => {
    req.user = null;
    let commonRequest = reqUtil.commonRequest(req);
    let token = commonRequest.token || CookieUtil.getToken(req);
    console.log(`token ---> ${token}`);
    if (token) {
        let data = await cookieCache.get(token);
        // console.log(`data ---> ${JSON.stringify(data)}`)
        if (data) {
            req.user = data.user;
            req.tokenData = data;
            cookieCache.refresh(token);
            if (reqUtil.isNeedSetCookie(req)) {
                CookieUtil.setToken(res, token);
            }
            next();
        } else {
            let [err, user] = await LoginDao.doGetUserByToken(token);
            if (err) {
                CookieUtil.removeToken(res);
                next();
            } else {
                console.log(`token [${token}] redis 中过期，从 mysql 中获取 user_id ${user.id}`);
                cookieCache.set(token, { user });
                if (reqUtil.isNeedSetCookie(req)) {
                    CookieUtil.setToken(res, token);
                }
                req.user = user;
                next();
            }
        }
    } else {
        next();
    }
}; */


/**
 * 登录认证
 * @param req
 * @param res
 * @param next
 */
const requireUser = function (req: Request, res: Response, next: any) {

    let requestParam = HttpUtil.parseRequest(req);
    let token = requestParam.token // || CookieUtil.getToken(req); 

    if (token == "")
        HttpUtil.Response.error(res, 'no_login');
    else
        next();

    /*     if (req.user) {
            next();
        } else {
            if (req.url.indexOf('/api/') === 0) {
                resUtil.error(res, 'no_login'); 
            } else {
                res.redirect('/login?go=' + encodeURIComponent(req.url));
            }
        } */

};

export default requireUser;