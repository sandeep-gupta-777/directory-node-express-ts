import request from "supertest";
import app from "../src/app";
import { routes } from "../src/constants";
import { error_Code_Enum, error_Code_Map } from "../src/constants/error-codes";

const chai = require("chai");
const expect = chai.expect;
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkaXJlY3Rvcnlfc2FuZGVlcC5oZXJva3VhcHAuY29tIiwibmFtZSI6InNhbmRlZXAgZ3VwdGEiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTI3NDM1MzcyLCJleHAiOjE1Mjc0NjUzNzJ9.w8Qaxx_0maZhPgTt0EAZ3PUL56QfvT10xXPN0Z78XYg";
describe("PUT "+routes.phone_number_create.route, () => {

    it("should return Unprocessable as invalid user id is passed", () => {
        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.DB_CASTERROR_PROBLEM_WITH_ID_OR_SUCH).statusCode);
        return request(app)
            .get( '/users/5b0ac754f0175c9f2898252fKKKKKKKKKKKKKKKK/directory/read')
            .set('Authorization', token) //set header for this test
            .set('Content-Type',  'application/json') //set header for this test
            .expect(expectedStatusCode)

    });

    it("should return OK as admin is using global scope in url", () => {
        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.SUCCESS).statusCode);
        return request(app)
            .get( '/users/5b0ac754f0175c9f2898252f/directory/read?scope=global')
            .set('Authorization', token) //set header for this test
            .set('Content-Type',  'application/json') //set header for this test
            .expect(expectedStatusCode)

    });

    it("should return Unauthorized as token is not present", () => {
        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.TOKEN_NOT_PRESENT_OR_INVALID).statusCode);
        return request(app)
            .get( '/users/5b0ac754f0175c9f2898252f/directory/read')
            .set('Content-Type',  'application/json') //set header for this test
            .expect(expectedStatusCode);
    });

    it("should return OK as read first page of user's directory", () => {
        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.SUCCESS).statusCode);
        return request(app)
            .get( '/users/5b0ac754f0175c9f2898252f/directory/read')
            .set('Authorization', token) //set header for this test
            .set('Content-Type',  'application/json') //set header for this test
            .expect(expectedStatusCode)

    });

    it("should return OK as read second page of user's directory", () => {
        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.SUCCESS).statusCode);
        return request(app)
            .get( '/users/5b0ac754f0175c9f2898252f/directory/read?page=2')
            .set('Authorization', token) //set header for this test
            .set('Content-Type',  'application/json') //set header for this test
            .expect(expectedStatusCode)

    });


});
