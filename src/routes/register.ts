import { Request, Response, NextFunction } from "express";
import { routes } from "../constants/index";
import { crud } from "../db";
import { dirUserModel, IDirUser } from "../db/Models";
import {
    createPasswordHash,
    verifyToken,
    sendErrRes,
    sendSuccessRes,
    verifyAdmin,
    validateUser,
    createQuery_directory_users_lookup, mountUser
} from "./helpers";
import { jwt_sign, jwt_verify } from "../utility/jwt";
import { error_Code_Enum } from "../constants/error-codes";
import { validatorError } from "./validators";
import { roles } from "../constants/roles";
import { isUndefined } from "util";


export let registerRoutesInit = function (router: any) {

    router.post(routes.login.route, function (req: Request, res: Response, next: NextFunction) {
        let userRecord: IDirUser,
            body: IDirUser = req.body;
        crud.readRecord$(dirUserModel, {USER_EMAIL: body.USER_EMAIL})
            .then((doc: any[]) => {
                userRecord = doc[0] && doc[0]._doc;
                validatorError(userRecord, body, req);
                if(!body.PASSWORD) throw new Error(error_Code_Enum.INVALID_LOGIN_PASSWORD.toString());
            })
            .then(() => {
                if(res.locals.token) return res.locals.token;
                return jwt_sign(userRecord);//sign jwt
            })
            .then((token) => {
                delete userRecord.USER_HASHED_PASSWORD;
                res.locals.successData = {...userRecord, token};
                sendSuccessRes(req, res);
            })
            .catch((err) => {
                res.locals.err = err;
                sendErrRes(req, res);
            });
    });

    /*this handler will be used for
    * 1.signing up the user
    * 2.creating a new admin/non-admin user, by admin
    * */
    router.put([routes.signup.route, routes.account_create.route], function (req: Request, res: Response, next: NextFunction) {
        let dirUser: IDirUser;
        try{
            dirUser= {
                ...req.body,
                USER_HASHED_PASSWORD: createPasswordHash(req.body.PASSWORD, 10),
            };
        }catch (e) {
            next(e);
        }
        let userRecordRef: IDirUser = {};
        let account_create_url_regex = /users[\/]\w*[\/]accounts[\/]create/i;
        Promise.resolve()
            .then(() => {
                /*
                * this if block will be executed when admin is trying to create new users
                * */
                if (account_create_url_regex.test(req.url)) {//if true, admin is creating a new account
                    let query: IDirUser = {USER_EMAIL: req.body.USER_EMAIL};
                    return verifyAdmin(req, res)
                        .then(() => {
                            return crud.createRecord$(dirUserModel, dirUser);
                        });
                }
                if(req.url.toUpperCase()==='/signup'.toUpperCase() && dirUser.USER_ROLE===roles.ADMIN)
                    throw new Error(error_Code_Enum.CANT_SIGN_UP_WITH_ADMIN_ACCOUNT.toString());

                /* following will be executed when user is doing signup*/
                dirUser.USER_ROLE = roles.NON_ADMIN.toString();
                return crud.createRecord$(dirUserModel, dirUser);
            })
            .then((userRecords: any) => {

                userRecordRef = userRecords._doc;
                return jwt_sign(userRecordRef);//sign jwt
            })
            .then((token) => {
                if(userRecordRef.USER_HASHED_PASSWORD) delete userRecordRef.USER_HASHED_PASSWORD;
                res.locals.successData = {...userRecordRef, token};
                sendSuccessRes(req, res);
            })
            .catch((err) => {
                res.locals.err = err;
                sendErrRes(req, res);
            });
    });

    router.post([routes.account_update.route], mountUser, validateUser, verifyToken,
        function (req: Request, res: Response, next: NextFunction) {
            let userRecordRef: IDirUser,updates: IDirUser,
                body: IDirUser = req.body,newPass:string, passwordHash:string;
            Promise.resolve()
                .then(() => {
                    newPass = body.PASSWORD;
                    if(!isUndefined(newPass)){
                        if (newPass && newPass.length > 6)
                            passwordHash = createPasswordHash(newPass, 10);
                        else
                            throw new Error(error_Code_Enum.INVALID_NEW_PASSWORD.toString());

                        updates= {...body, USER_HASHED_PASSWORD: passwordHash};
                    }else {
                        updates= {...body};
                    }

                    // let query = {_id:req.params.USER_ID};
                    let query = createQuery_directory_users_lookup(req, res);
                    if(Object.keys(query).length===0) throw new Error(error_Code_Enum.QUERY_TOO_BROAD.toString());
                    return crud.updateRecords$(dirUserModel,query , {$set: updates}, {multi:true,upsert:false});
                })
                .then((n:number) => {
                    if(n) res.locals.successData = n+" modified";
                    sendSuccessRes(req, res);
                })
                .catch((err) => {
                    res.locals.err = err;
                    sendErrRes(req, res);
                });
        });


    router.get("/",(req:Request,res:Response)=> res.send("this is home page"));


};