import request from "supertest";
import app from "../src/app";
import { routes } from "../src/constants";
import { error_Code_Enum, error_Code_Map } from "../src/constants/error-codes";
import { sample_id, sample_token } from "./sample-token";

const chai = require("chai");
const expect = chai.expect;
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
            .put( `/users/${sample_id}/directory/create`)
            .set('Authorization', sample_token) //set header for this test
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
            .put( `/users/${sample_id}/directory/create`)
            .set('Authorization', sample_token) //set header for this test
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
            .put( `/users/${sample_id}/directory/create`)
            .set('Authorization', sample_token) //set header for this test
            .set('Content-Type',  'application/json') //set header for this test
            .send(payload)
            .expect(expectedStatusCode)

    });

});
