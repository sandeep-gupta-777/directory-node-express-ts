import {Request, Response, NextFunction} from "express";
import { routes } from "../constants/index";
import { crud } from "../db";
import { IDirEntry, dirEntryModel, IDirUser, dirUserModel } from "../db/Models";
import { createQuery_directory_lookup, verifyToken, sendErrRes, sendSuccessRes, verifyAdmin, createPasswordHash } from "./helpers";
import { error_Code_Enum } from "../constants/error-codes";

export let actionRoutesInit  = function (router:any) {

    router.put(routes.phone_number_create.route, verifyToken, function (req: Request, res: Response, next: NextFunction) {
        let phoneOwner:IDirEntry = req.body, query;
        phoneOwner.OWNER_PHONE_id = phoneOwner.OWNER_PHONE+ req.params.USER_ID;
        phoneOwner.USER_ID = req.params.USER_ID;
        // phoneOwner.OWNER_PHONE = Number(phoneOwner.OWNER_PHONE);;
        // if(phoneOwner.OWNER_PHONE.le)
        query = createQuery_directory_lookup(req, res);
        crud.createRecord$(dirEntryModel,phoneOwner)
            .then(()=>{sendSuccessRes(req, res)})
            .catch((err)=>{
                res.locals.err = err;
                sendErrRes(req, res)
            })
    });

    router.get(routes.phone_number_read.route, verifyToken,function (req:Request, res:Response, next:NextFunction) {
        let phoneOwner:IDirEntry = req.body,query;
        query = createQuery_directory_lookup(req, res);
        let skip:number = (req.query.page-1)*10;
        if(!skip || isNaN(skip) || skip<0) skip=0;

        crud.readRecord$(dirEntryModel,query, {}, {limit:10,skip})
            .then((data:any)=>{
                res.locals.successData = data;
                sendSuccessRes(req, res);
                res.send();
            })
            .catch((err)=>{
                res.locals.err = err;
                sendErrRes(req, res)
            })
    });

    router.post(routes.phone_number_update.route, verifyToken, function (req:Request, res:Response, next:NextFunction) {
        let dirEntry:IDirEntry = req.body;
        let query:IDirEntry;
        query = createQuery_directory_lookup(req, res);
        if(Object.keys(query).length===0) throw new Error(error_Code_Enum.QUERY_TOO_BROAD.toString());
        crud.updateRecords$(dirEntryModel,query, {$set:dirEntry})
            .then((nModified:any)=>{
                res.locals.successData = `${nModified} modified`;
                sendSuccessRes(req, res);
            })
            .catch((err)=>{sendErrRes(req, res)})
    });

    router.delete(routes.phone_number_delete.route,verifyToken, function (req:Request, res:Response, next:NextFunction) {
        let dirEntry:IDirEntry = req.body, query;
        query = createQuery_directory_lookup(req, res);
        if(Object.keys(query).length===0) throw new Error(error_Code_Enum.QUERY_TOO_BROAD.toString());
        crud.deleteRecord$(dirEntryModel,query)
            .then((data:any)=>{
                res.locals.successData = data + " deleted";
                sendSuccessRes(req, res)
            })
            .catch(()=>{sendErrRes(req, res)})
    });

    router.get(routes.phone_number_list.route, verifyToken, verifyAdmin, function (req:Request, res:Response, next:NextFunction) {
        let phoneOwner:IDirEntry = req.body, query;
        query = createQuery_directory_lookup(req, res);
        crud.readRecord$(dirEntryModel,query)
            .then((data:any)=>{
                res.locals.successData = data;
                sendSuccessRes(req, res)
            })
            .catch(()=>{sendErrRes(req, res)})
    });

};

