import { error_Code_Enum, error_Code_Map } from "../constants/error-codes";
import { Request, Response, NextFunction } from "express";
import { jwt_verify } from "../utility/jwt";
import { getValue } from "../helpers";
import { crud } from "../db";
import { dirUserModel, IDirUser } from "../db/Models";
import { roles } from "../constants/roles";
import enumerate = Reflect.enumerate;
import { validatorError } from "./validators";
import { body } from "express-validator/check";
const bcrypt = require('bcryptjs');

export function sendSuccessRes(req:Request, res:Response) {
    let successRes = {errCode:0, desc:'Success', data:res.locals.successData};
    console.dir(successRes);
    res.status(200).json(successRes);
    // res.send("hi");
}

/*
    * createQuery_directory_lookup:
    * 1. if user is non-admin their id will automatically be appended into the db query
    * 2. if user is admin, they need to define scope
    *       scope=self&id=anything; will only return results create by admin. This is just like non-admin
    *       scope=global; queries will be applied to all the users
    *       scope=global&id="john_id"; queries will be applied to user whose _id="john_id"
*/
export function createQuery_directory_lookup(req:Request, res:Response) {

    let query = {}, isAdminWithGlobalScope:boolean ;
    if(req.query.number) query = {...query, OWNER_PHONE:req.query.number};
    if(req.query.name) query = {...query,  OWNER_NAME :req.query.name};
    if(req.query.country) query = {...query,  OWNER_COUNTRY :req.query.country};
    if(req.query.id) query = {...query,  _id :req.query.id};

    isAdminWithGlobalScope = (res.locals.role===roles.ADMIN && req.query.scope && req.query.scope.toUpperCase()==='global'.toUpperCase());
    if(!isAdminWithGlobalScope){
        query = {...query,  USER_ID :req.params.USER_ID};
    }
    return query;
}

/*
    * createQuery_directory_users_lookup:
    * 1. if user is non-admin their id will automatically be appended into the db query
    * 2. if user is admin, they need to define scope
    *       scope=<anything except global>&id=<anything>; will only return results create by admin. This is just like non-admin
    *       scope=global; queries will be applied to all the users
    *       scope=global&id="john_id"; queries will be applied to user whose _id="john_id"
    * */
export function createQuery_directory_users_lookup(req:Request, res:Response) {
    let query = {};

    let isAdminWithGlobalScope = res.locals.role===roles.ADMIN && req.query.scope && req.query.scope.toUpperCase()==='global'.toUpperCase();
    if(isAdminWithGlobalScope){
        if(req.query.name) query = {...query, USER_FIRST_NAME:req.query.name};
        if(req.query.email) query = {...query,  USER_EMAIL :req.query.email};
        if(req.query.id) query = {...query,  _id :req.query.id};
    }else if(!isAdminWithGlobalScope){
        query = {...query,  _id :req.params.USER_ID};
    }
    return query;
}

export function sendErrRes(req:Request, res:Response) {
    //TODO: remove any, check this: https://stackoverflow.com/questions/17380845/how-to-convert-string-to-enum-in-typescript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    let map = error_Code_Map,
        err = res.locals.err,
        errorObj, description, statusCode: number, errCode : string;

    err = getValue(res, "locals.err");
    if(!err) err = new Error(error_Code_Enum.UNRECOGNISED_ERROR.toString());

    let tempErrCode:number = Number(<any>(err).message);
    errorObj = (!isNaN(tempErrCode) && map.get(tempErrCode))? map.get(Number(<any>(err).message)): map.get(error_Code_Enum.UNRECOGNISED_ERROR);
    description = errorObj?error_Code_Enum[<any>errorObj.desc]:"SUCCESS";
    errCode = errorObj.errCode;
    statusCode = Number(errorObj.statusCode);

    let ack = {errCode: errCode, desc: description};
    res.status(statusCode).json(ack);
}

export function isPasswordValid(currentPass:string, savedHash:string) :boolean{
    return bcrypt.compareSync(currentPass, savedHash);
}
export function createPasswordHash(password:string, salt:number) :string{
    if(!password || password.length <=6){
        throw new Error(error_Code_Enum.INVALID_NEW_USER_PASSWORD.toString());
    }
    return bcrypt.hashSync(password, salt);
}


/*
*validateUser:
* Its a general validator middleware
* will check if user account exists or not (deleted or not)
* Will check for password, if password exist
* */
export function mountUser(req:Request, res:Response, next?:NextFunction) {
    let userRecord: IDirUser,
        body: IDirUser = req.body,
        query:IDirUser = {};

    let req_USER_ID = req.params.USER_ID;
    if(req_USER_ID) query = {...query, _id: req_USER_ID};
    else if(body.USER_EMAIL) query = {...query, USER_EMAIL: body.USER_EMAIL};

    crud.readRecord$(dirUserModel, query)
        .then((doc: any[]) => {
            // validatorError(doc, body);
            userRecord = doc[0] && doc[0]._doc;
            if(!userRecord) throw new Error(error_Code_Enum.DIRECTORY_USER_NO_SUCH_USER.toString())
            res.locals.currentUser = userRecord;//mounting
            if(userRecord.USER_ROLE===roles.ADMIN.toString()) res.locals.role = roles.ADMIN.toString();
            next();
        })
        .catch((err)=>{
            res.locals.err = err;
            next(err)
        })
}
export function validateUser(req:Request, res:Response, next?:NextFunction) {
    let userRecord = res.locals.currentUser,
        body = req.body;
    validatorError(userRecord, body, req);
    next();
}
export function verifyAdmin(req:Request, res:Response, next?:NextFunction) {
    let currentUserRecord:IDirUser = res.locals.currentUser;

    let _id = req.params.USER_ID;
    return Promise.resolve()
        .then(()=>{
            if(!currentUserRecord) return;
            if(currentUserRecord.USER_ROLE !== roles.ADMIN) throw new Error(error_Code_Enum.UNAUTHERIZED_ACCESS.toString())
            if(next) next();//if verifyAdmin is called as middleware, next will be some valid function. Otherwise undefined
        })
        .then(()=>{
          if(currentUserRecord) return;
          return crud.readRecord$(dirUserModel,{_id});
        })
        .then((doc:any)=>{
            if(currentUserRecord) return;
            currentUserRecord = res.locals.currentUser = doc && doc[0];
            if(!currentUserRecord) throw new Error(error_Code_Enum.ID_OR_EMAIL_NOT_FOUND_IN_RECORDS.toString());
            if(currentUserRecord.USER_ROLE !== roles.ADMIN) throw new Error(error_Code_Enum.UNAUTHERIZED_ACCESS.toString())
            if(next) next();
        })
        .catch((err)=>{
            res.locals.err = err;
            if(next) return next(err)
            throw err;

        })

}
export function verifyToken(req:Request, res:Response, next:NextFunction) {

    const bearerHeader:any = req.headers['authorization'];
    let _id = req.params.USER_ID;
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        res.locals.token = bearerToken;

        crud.readRecord$(dirUserModel,{_id})
            .then((doc:any)=>{
                res.locals.currentUser = doc[0];
                res.locals.role = (<IDirUser>res.locals.currentUser).USER_ROLE;
                return jwt_verify(bearerToken, _id, doc[0] &&  doc[0].USER_HASHED_PASSWORD );
            })
            .then(()=>next())
            .catch((err)=>{
                res.locals.err = err;
                sendErrRes(req, res);
            });

    } else {
        // Forbidden
        res.locals.err = new Error(error_Code_Enum.TOKEN_NOT_PRESENT_OR_INVALID.toString());
        sendErrRes(req, res);
    }

}

export function mountParams (req:Request, res:Response, next:NextFunction) {
    req.body.USER_ID = req.params.USER_ID;
    next();
}