import request from "supertest";
import app from "../src/app";
import { routes } from "../src/constants";
import { error_Code_Enum, error_Code_Map } from "../src/constants/error-codes";
import { sample_id, sample_token } from "./sample-token";

const chai = require("chai");
const expect = chai.expect;
const token = sample_token;
describe("POST "+routes.phone_number_create.route, () => {

    it("should return OK as it will create an entry in directory", () => {

        let randomPhoneNumber_correct = 9000000000 + Number(Math.floor(Math.random()*100000000));
        let random_name = "sandeep" + Math.floor(Math.random()*10000);
        let payload = {
            "OWNER_NAME": random_name,
        };

        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.SUCCESS).statusCode);
        return request(app)
            .post( `/users/${sample_id}/directory/update?number=9078954682`)
            .set('Authorization', token) //set header for this test
            .set('Content-Type',  'application/json') //set header for this test
            .send(payload)
            .expect(expectedStatusCode)
    });


});
