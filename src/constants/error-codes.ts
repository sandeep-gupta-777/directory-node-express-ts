type ErrorCodeDetailType = { errCode: string, statusCode: string, desc: error_Code_Enum | string };
type SwitchErrorCodeTupleType = [error_Code_Enum, ErrorCodeDetailType];

enum error_Code_Enum {
    SUCCESS,
    ID_OR_EMAIL_NOT_FOUND_IN_RECORDS,
    CANT_SIGN_UP_WITH_ADMIN_ACCOUNT,
    INVALID_LOGIN_PASSWORD,
    INCORRECT_LOGIN_PASSWORD,
    INVALID_NEW_PASSWORD,
    INVALID_NEW_USER_PASSWORD,
    TOKEN_EXPIRED,
    TOKEN_INVALID,
    TOKEN_NOT_PRESENT_OR_INVALID,
    CLIENT_INVALID_USER,
    DB_CANNOT_ACCESS_DB,
    DB_CASTERROR_PROBLEM_WITH_ID_OR_SUCH,
    DUPLICATE_DATA,
    DIRECTORY_USER_EMAIL_NOT_PRESENT,
    DIRECTORY_USER_NO_SUCH_USER,
    DIRECTORY_USER_EMAIL_FORMAT_INCORRECT,
    DIRECTORY_USER_EMAIL_ALREADY_REGISTERED,
    DIRECTORY_USER_PASSWORD_NOT_PRESENT,
    PHONE_NUMBER_NOT_PRESENT,
    PHONE_NUMBER_INVALID,
    PHONE_NUMBER_OWNER_NAME_NOT_PRESENT,
    PHONE_NUMBER_ALREADY_EXISTS_IN_DIRECTORY,
    UNAUTHERIZED_ACCESS,
    QUERY_INVALID_PHONE_NUMBER,
    QUERY_TOO_BROAD,
    ROUTE_NOT_FOUND,
    UNRECOGNISED_VALIDATION_ERROR,
    UNRECOGNISED_ERROR
}

let switch_Error_Code_Tuple: SwitchErrorCodeTupleType[] =
    [
        //TODO: create a different success for resource creation 201
        /*Success*/
        [error_Code_Enum.SUCCESS, {errCode: "0000", statusCode: "200", desc: error_Code_Enum.SUCCESS}],

        /*Error relating to incorrect/insufficient creds*/
        [error_Code_Enum.ID_OR_EMAIL_NOT_FOUND_IN_RECORDS, {errCode: "1100", statusCode: "401", desc: error_Code_Enum.ID_OR_EMAIL_NOT_FOUND_IN_RECORDS}],
        [error_Code_Enum.CANT_SIGN_UP_WITH_ADMIN_ACCOUNT, {errCode: "1101", statusCode: "401", desc: error_Code_Enum.CANT_SIGN_UP_WITH_ADMIN_ACCOUNT}],
        [error_Code_Enum.INVALID_LOGIN_PASSWORD, {errCode: "1102", statusCode: "401", desc: error_Code_Enum.INVALID_LOGIN_PASSWORD}],
        [error_Code_Enum.INCORRECT_LOGIN_PASSWORD, {errCode: "1103", statusCode: "401", desc: error_Code_Enum.INCORRECT_LOGIN_PASSWORD}],
        [error_Code_Enum.INVALID_NEW_PASSWORD, {errCode: "1104", statusCode: "401", desc: error_Code_Enum.INVALID_NEW_PASSWORD,}],
        [error_Code_Enum.INVALID_NEW_USER_PASSWORD, {errCode: "1105", statusCode: "401", desc: error_Code_Enum.INVALID_NEW_USER_PASSWORD,}],

        /*Error relating to JWT token*/
        [error_Code_Enum.TOKEN_EXPIRED, {errCode: "1200", statusCode: "401", desc: error_Code_Enum.TOKEN_EXPIRED,}],
        [error_Code_Enum.TOKEN_INVALID, {errCode: "1201", statusCode: "401", desc: error_Code_Enum.TOKEN_INVALID,}],
        [error_Code_Enum.TOKEN_NOT_PRESENT_OR_INVALID, {errCode: "1202", statusCode: "401", desc: error_Code_Enum.TOKEN_NOT_PRESENT_OR_INVALID,}],

        // [error_Code_Enum.CLIENT_INVALID_USER, {errCode: "1101", statusCode: "401", desc: error_Code_Enum.CLIENT_INVALID_USER}],

        /*Error with dependecies and third party resources*/
        [error_Code_Enum.DB_CANNOT_ACCESS_DB, {errCode: "1300", statusCode: "503", desc: error_Code_Enum.DB_CANNOT_ACCESS_DB}],
        [error_Code_Enum.DB_CASTERROR_PROBLEM_WITH_ID_OR_SUCH, {errCode: "1301", statusCode: "500", desc: error_Code_Enum.DB_CASTERROR_PROBLEM_WITH_ID_OR_SUCH}],
        [error_Code_Enum.DUPLICATE_DATA, {errCode: "1302", statusCode: "422", desc: error_Code_Enum.DUPLICATE_DATA}],

        /*Error relating to insufficient/incorrect data to save*/
        [error_Code_Enum.DIRECTORY_USER_EMAIL_NOT_PRESENT, {errCode: "1400", statusCode: "401", desc: error_Code_Enum.DIRECTORY_USER_EMAIL_NOT_PRESENT}],
        [error_Code_Enum.DIRECTORY_USER_NO_SUCH_USER, {errCode: "1401", statusCode: "401", desc: error_Code_Enum.DIRECTORY_USER_NO_SUCH_USER}],
        [error_Code_Enum.DIRECTORY_USER_EMAIL_FORMAT_INCORRECT, {errCode: "1402", statusCode: "422", desc: error_Code_Enum.DIRECTORY_USER_EMAIL_FORMAT_INCORRECT}],
        [error_Code_Enum.DIRECTORY_USER_EMAIL_ALREADY_REGISTERED, {errCode: "1403", statusCode: "401", desc: error_Code_Enum.DIRECTORY_USER_EMAIL_ALREADY_REGISTERED}],
        [error_Code_Enum.DIRECTORY_USER_PASSWORD_NOT_PRESENT, {errCode: "1405", statusCode: "401", desc: error_Code_Enum.DIRECTORY_USER_PASSWORD_NOT_PRESENT}],
        [error_Code_Enum.PHONE_NUMBER_NOT_PRESENT, {errCode: "1406", statusCode: "422", desc: error_Code_Enum.PHONE_NUMBER_NOT_PRESENT}],
        [error_Code_Enum.PHONE_NUMBER_INVALID, {errCode: "1407", statusCode: "422", desc: error_Code_Enum.PHONE_NUMBER_INVALID}],
        [error_Code_Enum.PHONE_NUMBER_OWNER_NAME_NOT_PRESENT, {errCode: "1408", statusCode: "422", desc: error_Code_Enum.PHONE_NUMBER_OWNER_NAME_NOT_PRESENT}],
        [error_Code_Enum.PHONE_NUMBER_ALREADY_EXISTS_IN_DIRECTORY, {errCode: "1409", statusCode: "422", desc: error_Code_Enum.PHONE_NUMBER_ALREADY_EXISTS_IN_DIRECTORY}],

        /*Error relating to Access*/
        [error_Code_Enum.UNAUTHERIZED_ACCESS, {errCode: "1500", statusCode: "401", desc: error_Code_Enum.UNAUTHERIZED_ACCESS,}],

        /*Error related to invalid query for resource*/
        [error_Code_Enum.QUERY_INVALID_PHONE_NUMBER, {errCode: "1600", statusCode: "403", desc: error_Code_Enum.QUERY_INVALID_PHONE_NUMBER}],
        [error_Code_Enum.QUERY_TOO_BROAD, {errCode: "1601", statusCode: "422", desc: error_Code_Enum.QUERY_TOO_BROAD}],

        /*Errors relating to Route*/
        [error_Code_Enum.ROUTE_NOT_FOUND, {errCode: "1700", statusCode: "404", desc: error_Code_Enum.ROUTE_NOT_FOUND}],

        /*Unidentified Errors*/
        [error_Code_Enum.UNRECOGNISED_VALIDATION_ERROR, {errCode: "9001", statusCode: "500", desc: error_Code_Enum.UNRECOGNISED_VALIDATION_ERROR}],
        [error_Code_Enum.UNRECOGNISED_ERROR, {errCode: "9002", statusCode: "500", desc: error_Code_Enum.UNRECOGNISED_ERROR}],
    ];

let error_Code_Map =
    new Map<error_Code_Enum, ErrorCodeDetailType>(switch_Error_Code_Tuple);
export {
    error_Code_Map,
    error_Code_Enum
};