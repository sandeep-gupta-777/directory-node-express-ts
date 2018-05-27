import request from "supertest";
import app from "../src/app";
import { routes } from "../src/constants";
import { error_Code_Enum, error_Code_Map } from "../src/constants/error-codes";

const chai = require("chai");
const expect = chai.expect;

describe("PUT /signup", () => {

    it("should return Unprocessable password is too small", () => {

        let payload = {
            "USER_FIRST_NAME": "sandeep",
            "USER_EMAIL": "this_user_does_not_exists@gmail.com",
            "PASSWORD": "sand"
        };
        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.INVALID_NEW_PASSWORD).statusCode);
        return request(app)
            .put( routes.signup.route)
            .send(payload)
            .expect(expectedStatusCode)

    });

    it("should return Unprocessable since email is not passed", () => {

        let payload = {
            "USER_FIRST_NAME": "sandeep",
            "PASSWORD": "sandeep"
        };
        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.DIRECTORY_USER_EMAIL_NOT_PRESENT).statusCode);
        return request(app)
            .put( routes.signup.route)
            .send(payload)
            .expect(expectedStatusCode)

    });

    it("should return Unprocessable, since can't sign up with admin account", () => {

        let payload = {
            "USER_FIRST_NAME": "sandeep",
            "PASSWORD": "sandeep",
            USER_ROLE:"ADMIN"
        };
        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.CANT_SIGN_UP_WITH_ADMIN_ACCOUNT).statusCode);
        return request(app)
            .put( routes.signup.route)
            .send(payload)
            .expect(expectedStatusCode)

    });

    it("should return OK since email is not passed", () => {

        let some_randon_email = Math.random()
        let payload = {
            "USER_FIRST_NAME": "sandeep",
            "USER_EMAIL": Math.floor(Math.random()*10000000000000) + '@gmail.com',
            "PASSWORD": "sandeep"
        };
        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.SUCCESS).statusCode);
        return request(app)
            .put( routes.signup.route)
            .send(payload)
            .expect(expectedStatusCode)

    });
});
