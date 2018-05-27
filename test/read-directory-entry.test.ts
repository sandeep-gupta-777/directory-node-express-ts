import request from "supertest";
import app from "../src/app";
import { routes } from "../src/constants";
import { error_Code_Enum, error_Code_Map } from "../src/constants/error-codes";
import { sample_id, sample_token } from "./sample-token";

const chai = require("chai");
const expect = chai.expect;
const token = sample_token;
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
            .get( `/users/${sample_id}/directory/read?scope=global`)
            .set('Authorization', token) //set header for this test
            .set('Content-Type',  'application/json') //set header for this test
            .expect(expectedStatusCode)

    });

    it("should return Unauthorized as token is not present", () => {
        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.TOKEN_NOT_PRESENT_OR_INVALID).statusCode);
        return request(app)
            .get( `/users/${sample_id}/directory/read`)
            .set('Content-Type',  'application/json') //set header for this test
            .expect(expectedStatusCode);
    });

    it("should return OK as read first page of user's directory", () => {
        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.SUCCESS).statusCode);
        return request(app)
            .get( `/users/${sample_id}/directory/read`)
            .set('Authorization', token) //set header for this test
            .set('Content-Type',  'application/json') //set header for this test
            .expect(expectedStatusCode)

    });

    it("should return OK as read second page of user's directory", () => {
        let expectedStatusCode:number = Number(error_Code_Map.get(error_Code_Enum.SUCCESS).statusCode);
        return request(app)
            .get( `/users/${sample_id}/directory/read?page=2`)
            .set('Authorization', token) //set header for this test
            .set('Content-Type',  'application/json') //set header for this test
            .expect(expectedStatusCode)

    });


});
