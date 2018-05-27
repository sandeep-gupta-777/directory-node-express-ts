import { documentValidatorErrors } from "./dbHelpers/validator";
import { TModel } from "./Models";
import { error_Code_Enum } from "../constants/error-codes";

let createRecord$ = function (model: any, data: TModel): Promise<any> {
    return new Promise((resolve, reject) => {
        let record = new model(data);
        record.save(function (err: any, doc: any) {
            if (err) {
                return reject(documentValidatorErrors(err,model));;
            }
            resolve(doc);
        });
    });
};

let readRecord$ = function (model: any, query: TModel, projection?: any, pagination?:{skip:number, limit:number}): Promise<Array<any>> {
    if(!projection) projection = {};
    if(!pagination) pagination = {limit:10,skip:0};
    return new Promise((resolve, reject) => {
        model.find(query, projection).skip(pagination.skip).limit(pagination.limit).exec(function (err: any, doc: Array<any>) {
            if (err) reject(documentValidatorErrors(err, model));//this is always connection error, if it reaches here
            resolve(doc);
        });
    });
};

let updateRecord$ = function (model: any, query: TModel, updates: {$set:TModel}, options?:{upsert?:boolean,multi?:boolean}): Promise<any> {
    if(!options) options ={upsert:false};
    return new Promise((resolve, reject) => {
        model.update(query, updates, {multi: false, ...options}, function (err: any, doc: any) {
            if (err) return reject(new Error(error_Code_Enum.DB_CANNOT_ACCESS_DB.toString()));
            return resolve(doc.nModified);
        });
    })
};
let updateOneRecord$ = function (model: any, query: TModel, updates: {$set:TModel}, options?:{upsert:boolean}): Promise<any> {
    if(!options) options ={upsert:false};
    return new Promise((resolve, reject) => {
        model.findOneAndUpdate(query, updates, {multi: false,new: true, ...options}, function (err: any, doc: any) {
            if (err) reject(documentValidatorErrors(err, model));
                return resolve(doc);
        });
    })
};

let deleteRecord$ = function (model: any, query: TModel) {
    return new Promise((resolve, reject) => {
        model.remove(query, function (err: any, data:any) {
            if (err) return reject(new Error(error_Code_Enum.DB_CANNOT_ACCESS_DB.toString()));
            resolve(data.result.n);
        });
    });
};

export const crud = {
    deleteRecord$,
    createRecord$,
    updateRecords$: updateRecord$,
    updateOneRecord$,
    readRecord$
};

