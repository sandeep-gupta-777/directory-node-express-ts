import { Request, Response, NextFunction } from "express";
import { routes } from "../constants/index";
import { crud } from "../db";
import { dirUserModel, IDirEntry, IDirUser } from "../db/Models";
import {
    createPasswordHash,
    verifyToken,
    sendErrRes,
    sendSuccessRes,
    verifyAdmin,
    createQuery_directory_lookup, createQuery_directory_users_lookup, mountUser
} from "./helpers";
import { error_Code_Enum } from "../constants/error-codes";

export let accountActionRoutesInit = function (router: any) {

    router.get(routes.account_read.route, mountUser, function (req: Request, res: Response, next: NextFunction) {
        let userRecord: IDirUser,
            body: IDirUser = req.body,
            query = createQuery_directory_users_lookup(req,res);
        let skip:number = (req.query.page-1)*10;
        if(!skip || isNaN(skip) || skip<0) skip=0;
        crud.readRecord$(dirUserModel, query,{USER_HASHED_PASSWORD:0},{skip,limit:10})
            .then((doc: any[]) => {
                userRecord = doc[0] && doc[0] ._doc;
                res.locals.successData = doc || [];
                sendSuccessRes(req, res);
            })
            .catch((err) => {
                res.locals.err = err;
                sendErrRes(req, res);
            });
    });

    router.delete(routes.account_delete.route, mountUser, function (req: Request, res: Response, next: NextFunction) {
        let userRecord: IDirUser,
            body: IDirUser = req.body,
            query = createQuery_directory_users_lookup(req,res);
        if(Object.keys(query).length===0) throw new Error(error_Code_Enum.QUERY_TOO_BROAD.toString());
        crud.deleteRecord$(dirUserModel, query)
            .then((n:number) => {
                // userRecord = doc[0] && doc[0] ._doc;
                // if(userRecord && userRecord.USER_HASHED_PASSWORD) delete userRecord.USER_HASHED_PASSWORD;
                res.locals.successData = n+" deleted";
                sendSuccessRes(req, res);
            })
            .catch((err) => {
                res.locals.err = err;
                sendErrRes(req, res);
            });
    });


};