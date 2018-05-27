import request from "supertest";
import app from "../src/app";
import { routes } from "../src/constants";
import { error_Code_Enum, error_Code_Map } from "../src/constants/error-codes";

const chai = require("chai");
const expect = chai.expect;
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkaXJlY3Rvcnlfc2FuZGVlcC5oZXJva3VhcHAuY29tIiwibmFtZSI6InNhbmRlZXAgZ3VwdGEiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTI3NDM1MzcyLCJleHAiOjE1Mjc0NjUzNzJ9.w8Qaxx_0maZhPgTt0EAZ3PUL56QfvT10xXPN0Z78XYg";
describe("POST "+routes.phone_number_create.route, () => {

    it("should return OK as it will create an entry in directory", () => {

        let randomPhoneNumber_correct = 9000000000 + Number(Math.floor(Math.random()*100000000));
        let random_name = "sandeep" + Math.floor(Math.random()*10000);
        let payload = {
            "OWNER_NAME": random_name,
        };

        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.SUCCESS).statusCode);
        return request(app)
            .post( `/users/5b0ac754f0175c9f2898252f/directory/update?number=9078954682`)
            .set('Authorization', token) //set header for this test
            .set('Content-Type',  'application/json') //set header for this test
            .send(payload)
            .expect(expectedStatusCode)
    });


});
