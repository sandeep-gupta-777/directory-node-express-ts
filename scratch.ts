import { error_Code_Enum } from "./src/constants/error-codes";
//test
let switch_Error_Code_Tuple =
    [
        //TODO: create a different success for resource creation 201

ErrorCode | Details
SUCCESS| ```{errCode: "0000", statusCode: "200", desc: "SUCCESS"}```

ID_OR_EMAIL_NOT_FOUND_IN_RECORDS| ```{errCode: "1100", statusCode: "401", desc: "ID_OR_EMAIL_NOT_FOUND_IN_RECORDS"}```
CANT_SIGN_UP_WITH_ADMIN_ACCOUNT| ```{errCode: "1101", statusCode: "401", desc: "CANT_SIGN_UP_WITH_ADMIN_ACCOUNT"}```
INVALID_LOGIN_PASSWORD| ```{errCode: "1102", statusCode: "401", desc: "INVALID_LOGIN_PASSWORD"}```
INCORRECT_LOGIN_PASSWORD| ```{errCode: "1103", statusCode: "401", desc: "INCORRECT_LOGIN_PASSWORD"}```
INVALID_NEW_PASSWORD| ```{errCode: "1104", statusCode: "401", desc: "INVALID_NEW_PASSWORD",}```
INVALID_NEW_USER_PASSWORD| ```{errCode: "1105", statusCode: "401", desc: "INVALID_NEW_USER_PASSWORD",}```

TOKEN_EXPIRED| ```{errCode: "1200", statusCode: "401", desc: "TOKEN_EXPIRED",}```
TOKEN_INVALID| ```{errCode: "1201", statusCode: "401", desc: "TOKEN_INVALID",}```
TOKEN_NOT_PRESENT_OR_INVALID| ```{errCode: "1202", statusCode: "401", desc: "TOKEN_NOT_PRESENT_OR_INVALID",}```


DB_CANNOT_ACCESS_DB| ```{errCode: "1300", statusCode: "503", desc: "DB_CANNOT_ACCESS_DB"}```
DB_CASTERROR_PROBLEM_WITH_ID_OR_SUCH| ```{errCode: "1301", statusCode: "500", desc: "DB_CASTERROR_PROBLEM_WITH_ID_OR_SUCH"}```
DUPLICATE_DATA| ```{errCode: "1302", statusCode: "422", desc: "DUPLICATE_DATA"}```

DIRECTORY_USER_EMAIL_NOT_PRESENT| ```{errCode: "1400", statusCode: "401", desc: "DIRECTORY_USER_EMAIL_NOT_PRESENT"}```
DIRECTORY_USER_NO_SUCH_USER| ```{errCode: "1401", statusCode: "401", desc: "DIRECTORY_USER_NO_SUCH_USER"}```
DIRECTORY_USER_EMAIL_FORMAT_INCORRECT| ```{errCode: "1402", statusCode: "422", desc: "DIRECTORY_USER_EMAIL_FORMAT_INCORRECT"}```
DIRECTORY_USER_EMAIL_ALREADY_REGISTERED| ```{errCode: "1403", statusCode: "401", desc: "DIRECTORY_USER_EMAIL_ALREADY_REGISTERED"}```
DIRECTORY_USER_PASSWORD_NOT_PRESENT| ```{errCode: "1405", statusCode: "401", desc: "DIRECTORY_USER_PASSWORD_NOT_PRESENT"}```
PHONE_NUMBER_NOT_PRESENT| ```{errCode: "1406", statusCode: "422", desc: "PHONE_NUMBER_NOT_PRESENT"}```
PHONE_NUMBER_INVALID| ```{errCode: "1407", statusCode: "422", desc: "PHONE_NUMBER_INVALID"}```
PHONE_NUMBER_OWNER_NAME_NOT_PRESENT| ```{errCode: "1408", statusCode: "422", desc: "PHONE_NUMBER_OWNER_NAME_NOT_PRESENT"}```
PHONE_NUMBER_ALREADY_EXISTS_IN_DIRECTORY| ```{errCode: "1409", statusCode: "422", desc: "PHONE_NUMBER_ALREADY_EXISTS_IN_DIRECTORY"}```

UNAUTHERIZED_ACCESS| ```{errCode: "1500", statusCode: "401", desc: "UNAUTHERIZED_ACCESS",}```

QUERY_INVALID_PHONE_NUMBER| ```{errCode: "1600", statusCode: "403", desc: "QUERY_INVALID_PHONE_NUMBER"}```
QUERY_TOO_BROAD| ```{errCode: "1601", statusCode: "422", desc: "QUERY_TOO_BROAD"}```

ROUTE_NOT_FOUND| ```{errCode: "1700", statusCode: "404", desc: "ROUTE_NOT_FOUND"}```

UNRECOGNISED_VALIDATION_ERROR| ```{errCode: "9001", statusCode: "500", desc: "UNRECOGNISED_VALIDATION_ERROR"}```
UNRECOGNISED_ERROR| ```{errCode: "9002", statusCode: "500", desc: "UNRECOGNISED_ERROR"}```
    ];
