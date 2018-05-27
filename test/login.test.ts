import request from "supertest";
import app from "../src/app";
import { routes } from "../src/constants";
import { error_Code_Enum, error_Code_Map } from "../src/constants/error-codes";

const chai = require("chai");
const expect = chai.expect;

describe("POST /login", () => {

    it("should return Unauthorised since we are passing unregistered email", () => {

        let payload = {
            "USER_EMAIL": "this_user_does_not_exists@gmail.com",
            "PASSWORD": "sandeep"
        };
        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.DIRECTORY_USER_EMAIL_NOT_PRESENT).statusCode);
        return request(app)
            .post( routes.login.route)
            .send(payload)
            .expect(expectedStatusCode)

    });

    it("should return Unauthorised since we are passing incorrect password", () => {

        let payload = {
            "USER_EMAIL": "sandeep@gmail.com",
            "PASSWORD": "sandeep1"
        };
        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.INCORRECT_LOGIN_PASSWORD).statusCode);
        return request(app)
            .post( routes.login.route)
            .send(payload)
            .expect(expectedStatusCode)

    });

    it("should return OK since we are passing correct credentials", () => {

        let payload = {
            "USER_EMAIL": "sandeep@gmail.com",
            "PASSWORD": "sandeep"
        };
        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.SUCCESS).statusCode);
        return request(app)
            .post( routes.login.route)
            .send(payload)
            .expect(expectedStatusCode)

    });
});
