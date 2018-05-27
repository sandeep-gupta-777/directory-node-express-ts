import request from "supertest";
import app from "../src/app";
import { routes } from "../src/constants";
import { error_Code_Enum, error_Code_Map } from "../src/constants/error-codes";

const chai = require("chai");
const expect = chai.expect;
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkaXJlY3Rvcnlfc2FuZGVlcC5oZXJva3VhcHAuY29tIiwibmFtZSI6InNhbmRlZXAgZ3VwdGEiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTI3NDM1MzcyLCJleHAiOjE1Mjc0NjUzNzJ9.w8Qaxx_0maZhPgTt0EAZ3PUL56QfvT10xXPN0Z78XYg";
describe("PUT "+routes.phone_number_create.route, () => {

    it("should return OK as it will create an entry in directory", () => {

        let randomPhoneNumber_correct = 9000000000 + Number(Math.floor(Math.random()*100000000));
        let payload = {
            "OWNER_NAME": "sandeep",
            "OWNER_STATE": "Uttar pradesh",
            "OWNER_COUNTRY_CODE": "+91",
            "OWNER_PHONE": randomPhoneNumber_correct
        };

        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.SUCCESS).statusCode);
        return request(app)
            .put( '/users/5b0ac754f0175c9f2898252f/directory/create')
            .set('Authorization', token) //set header for this test
            .set('Content-Type',  'application/json') //set header for this test
            .send(payload)
            .expect(expectedStatusCode)

    });

    it("should return 422 as phone number length is incorrect", () => {

        let randomPhoneNumber_incorrect = 9000000 + Number(Math.floor(Math.random()*10000));
        let payload = {
            "OWNER_NAME": "sandeep",
            "OWNER_STATE": "Uttar pradesh",
            "OWNER_COUNTRY_CODE": "+91",
            "OWNER_PHONE": randomPhoneNumber_incorrect
        };

        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.PHONE_NUMBER_INVALID).statusCode);
        return request(app)
            .put( '/users/5b0ac754f0175c9f2898252f/directory/create')
            .set('Authorization', token) //set header for this test
            .set('Content-Type',  'application/json') //set header for this test
            .send(payload)
            .expect(expectedStatusCode)

    });

    it("should return 422 as owner name is not present", () => {

        let randomPhoneNumber_correct = 9000000 + Number(Math.floor(Math.random()*10000));
        let payload = {
            "OWNER_STATE": "Uttar pradesh",
            "OWNER_COUNTRY_CODE": "+91",
            "OWNER_PHONE": randomPhoneNumber_correct
        };

        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.PHONE_NUMBER_OWNER_NAME_NOT_PRESENT).statusCode);
        return request(app)
            .put( '/users/5b0ac754f0175c9f2898252f/directory/create')
            .set('Authorization', token) //set header for this test
            .set('Content-Type',  'application/json') //set header for this test
            .send(payload)
            .expect(expectedStatusCode)

    });

});
