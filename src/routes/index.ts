import { actionRoutesInit} from "./directory-actions";
import { registerRoutesInit } from "./register";
import express, {NextFunction, Request, Response} from "express";
import { accountActionRoutesInit } from "./account-actions";
const router = express.Router();

export function routesInit() {
    registerRoutesInit(router);
    actionRoutesInit(router);
    accountActionRoutesInit(router);
    return router;
}