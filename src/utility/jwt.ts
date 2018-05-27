import { IDirUser } from "../db/Models";
import { error_Code_Enum } from "../constants/error-codes";
import { dir } from "async";
const jwt = require('jsonwebtoken');

/**
 * jwt_sign:
 * Signs the token with the hash of the password of the user
 * */
export function jwt_sign(dirUser:IDirUser) {

    let claims = {
        "iss": "directory_sandeep.herokuapp.com",//The issuer of the token
        "name": "sandeep gupta",
        "admin": true
    };

    let secretKey = "secret" + dirUser._id + dirUser.USER_HASHED_PASSWORD;
    return new Promise((resolve, reject) => {
        jwt.sign(claims, secretKey, { expiresIn: '30000s' }, (err:any, token:any) => {//todo: change secret
            if(err) return reject(err);
            return resolve(token);
        });
    })
}
/**
 * jwt_verify:
 * If verification is successful, it means user's _id and password is correct
 * */
export function jwt_verify(token:string, _id:string, USER_HASHED_PASSWORD:string  ) {
    let secretKey = "secret" + _id + USER_HASHED_PASSWORD;
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err:any, authData:any) => {
            if(!err) return resolve(authData);
            if(err.name==="TokenExpiredError") return reject(new Error(error_Code_Enum.TOKEN_EXPIRED.toString()));
            if(err) return reject(new Error(error_Code_Enum.TOKEN_INVALID.toString()));
        });
    })
}