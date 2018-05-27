# directory-node-express-ts
This is an Express project written in Typescript. This project is a bundle of APIs using which, a user can store their phone number in the database( mongoDB)

# Getting started
1. Clone this project
2. Install dependencies : ```npm install```
3. Build the project: ```npm run watch-ts```
4. Run the node server: ```npm run watch-node```.

** MAKE SURE YOU HAVE INTERNET CONNECTION TO CONNECT TO MONGODB**


5. Open browser and go to ```http://localhost:3000```. You will see *this is home page*

To run tests: ```npm run tests```

# API Documentation

First thing first. 

Almost all the APIs except /signup and /login, require JWT token. Otherwise server will throw following error:

```
{
    "errCode": "1202",
    "desc": "TOKEN_NOT_PRESENT_OR_INVALID"
}
```

Following are the steps to set up token:

1. Call ```/signup``` or ```/login``` as demonstrated below.
2. Above call will respond ```JWT``` token.
3. If you are using postman to test these APIs, set header as follows:

```Content-Type:application/json```

```Authorization:Bearer <token here>```


![Postman header](https://preview.ibb.co/kLB5sd/token.png)




**1. Registration**
* Signup

**PUT** ``` http://localhost:3000/signup```

Sample payload:
```
{
    "USER_FIRST_NAME": "John Doe",
    "USER_EMAIL": "johndoe@gmail.com",
    "PASSWORD": "iamjohndoe"
}
```
Returns: User detail along with a JWT token which is to be used in subsequent APIs

* Login:

**POST** ```http://localhost:3000/login```

Sample payload:
```

{
    "USER_EMAIL": "sandeep@gmail.com",
    "PASSWORD": "sandeep"
}
```
Returns: User detail along with a JWT token which is to be used in subsequent APIs

**2. Accounts-actions APIs**


* Get account details:


**GET** ```http://localhost:3000/users/:USER_ID/accounts/read?name=value1&number=value2&scope=value3&page=value4```

Example url: ```http://localhost:3000/users/5b0ad0b5b20501e1a08b5870/accounts/read?name=sandeep&number=9042794201&scope=global&page=1```

>Note: All the queries perform by a non-admin user will be limited to entries they have created. On the other hand admin can access all
>the entries created by all the user. However, to enable this privilage admin will have to pass ```scope=global``` in the query params as shown above.
>This is application to all the APIs except /login and /signup.

Sample payload: None. This is GET API

Return: Account details of user. If used is admin with ```scope=global``` flag, this apis return top 10 account matching the query.

* Create account:

**PUT** ```http://localhost:3000/users/:USER_ID/accounts/create```

Example url: ```http://localhost:3000/users/5b0ad0b5b20501e1a08b5870/accounts/create```

Used by admin to create new admin("USER_ROLE":"ADMIN") or non-admin("USER_ROLE":"NON-ADMIN") accounts

Example: payload
```
{
	"USER_FIRST_NAME": "sandeep",
    "USER_EMAIL": "sandeep121212@gmail.com1",
    "PASSWORD":"SANDEEP",
    "USER_ROLE":"ADMIN"
}
```

**Returns** Created user details with a JWT token. This token can be used by user to start a session.

* Update account: POST ```http://localhost:3000/users/:USER_ID/accounts/update?name=value1&number=value2&scope=value3```

Example url: ```http://localhost:3000/users/5b0ad0b5b20501e1a08b5870/accounts/update?name=sandeep&number=9042794201&scope=global```

Used to update account details. A non-admin can update their own account details while admin can update other's account details by passing
```scope=global``` flag in query params.

Example: payload
```
{
    "USER_FIRST_NAME": "sandeep_updated_name",
}
```
**Returns** "n modified". n is number of accounts modified.

* Delete account:

**DELETE** ```http://localhost:3000/users/:USER_ID/accounts/delete?name=value1&number=value2&scope=value3```

Example url: ```http://localhost:3000/users/5b0ad0b5b20501e1a08b5870/accounts/delete?name=sandeep&number=9042794201&scope=global```

Used to delete accounts. A non-admin can delete their own account while admin can delete other's account details by passing
```scope=global``` flag in query params.

**Example Payload**: none

**Returns** "n delete". n is number of accounts deleted.


**3. Directory-actions**

* Get directory entry details:

**GET** ```http://localhost:3000/users/:USER_ID/directory/read?name=value1&number=value2&scope=value3&page=value4```

**Example Url**: ```http://localhost:3000/users/5b0ad0b5b20501e1a08b5870/directory/read?name=sandeep&number=9910508102&scope=global&page=1```

>Note: All the queries perform by a non-admin user will be limited to entries they have created. On the other hand admin can access all
>the entries created by all the user. However, to enable this privilage admin will have to pass ```scope=global``` in the query params as shown above.
>This is application to all the APIs except /login and /signup.

Sample payload: None. This is GET API

**Returns** directory entry details which were created by user. If user is admin with ```scope=global``` flag, this API return top 10 directory entries matching the query.

* Create directory entry:


**PUT** ```http://localhost:3000/users/:USER_ID/directory/create```

**Example Url**: ```http://localhost:3000/users/5b0ad0b5b20501e1a08b5870/accounts/create```

Used to create directory entry.

Example: payload
```
{
    "OWNER_NAME": "sandeep",
    "OWNER_STATE": "Maharashtra",
    "OWNER_COUNTRY": "+91",
    "OWNER_PHONE": 9205040234
}
```
**Returns** Success response if successful.

* Update directory entry: POST ```http://localhost:3000/users/:USER_ID/directory/update?name=value1&number=value2&scope=value3```

**Example Url**: ```http://localhost:3000/users/5b0ad0b5b20501e1a08b5870/director/update?name=sandeep&number=9042794201&scope=global```

Used to update directory entry details. A non-admin can update their own directory entry details while admin can update other's directory entry details by passing
```scope=global``` flag in query params.

Example: payload
```
{
	  "OWNER_NAME": "sandeep_updated_name",
}
```

**Returns** "n modified". n is number of directory entries modified.

* Delete directory entry:

**DELETE** ```http://localhost:3000/users/:USER_ID/directory/delete?name=value1&number=value2&scope=value3```

**Example Url**: ```http://localhost:3000/users/5b0ad0b5b20501e1a08b5870/directory/delete?name=sandeep&number=9042794201&scope=global```

Used to delete directory entry. A non-admin can delete their own directory entry while admin can delete other's directory entry by passing
```scope=global``` flag in query params.

**Example Payload**: none

**Returns** "n delete". n is number of directory entries deleted.

# Error code
For frustration free integration, these APIs provide very specific errors to developers, so that they know what might be going wrong.
These errors can also be useful to pin-point issues while inspecting server logs in future.

```
[
["SUCCESS", {errCode: "0000", statusCode: "200", desc: "SUCCESS"}],

/*Error relating to incorrect/insufficient creds*/
["ID_OR_EMAIL_NOT_FOUND_IN_RECORDS", {errCode: "1100", statusCode: "401", desc: "ID_OR_EMAIL_NOT_FOUND_IN_RECORDS"}],
["CANT_SIGN_UP_WITH_ADMIN_ACCOUNT", {errCode: "1101", statusCode: "401", desc: "CANT_SIGN_UP_WITH_ADMIN_ACCOUNT"}],
["INVALID_LOGIN_PASSWORD", {errCode: "1102", statusCode: "401", desc: "INVALID_LOGIN_PASSWORD"}],
["INCORRECT_LOGIN_PASSWORD", {errCode: "1103", statusCode: "401", desc: "INCORRECT_LOGIN_PASSWORD"}],
["INVALID_NEW_PASSWORD", {errCode: "1104", statusCode: "401", desc: "INVALID_NEW_PASSWORD",}],
["INVALID_NEW_USER_PASSWORD", {errCode: "1105", statusCode: "401", desc: "INVALID_NEW_USER_PASSWORD",}],

/*Error relating to JWT token*/
["TOKEN_EXPIRED", {errCode: "1200", statusCode: "401", desc: "TOKEN_EXPIRED",}],
["TOKEN_INVALID", {errCode: "1201", statusCode: "401", desc: "TOKEN_INVALID",}],
["TOKEN_NOT_PRESENT_OR_INVALID", {errCode: "1202", statusCode: "401", desc: "TOKEN_NOT_PRESENT_OR_INVALID",}],


/*Error with dependecies and third party resources*/
["DB_CANNOT_ACCESS_DB", {errCode: "1300", statusCode: "503", desc: "DB_CANNOT_ACCESS_DB"}],
["DB_CASTERROR_PROBLEM_WITH_ID_OR_SUCH", {errCode: "1301", statusCode: "500", desc: "DB_CASTERROR_PROBLEM_WITH_ID_OR_SUCH"}],
["DUPLICATE_DATA", {errCode: "1302", statusCode: "422", desc: "DUPLICATE_DATA"}],

/*Error relating to insufficient/incorrect data to save*/
["DIRECTORY_USER_EMAIL_NOT_PRESENT", {errCode: "1400", statusCode: "401", desc: "DIRECTORY_USER_EMAIL_NOT_PRESENT"}],
["DIRECTORY_USER_NO_SUCH_USER", {errCode: "1401", statusCode: "401", desc: "DIRECTORY_USER_NO_SUCH_USER"}],
["DIRECTORY_USER_EMAIL_FORMAT_INCORRECT", {errCode: "1402", statusCode: "422", desc: "DIRECTORY_USER_EMAIL_FORMAT_INCORRECT"}],
["DIRECTORY_USER_EMAIL_ALREADY_REGISTERED", {errCode: "1403", statusCode: "401", desc: "DIRECTORY_USER_EMAIL_ALREADY_REGISTERED"}],
["DIRECTORY_USER_PASSWORD_NOT_PRESENT", {errCode: "1405", statusCode: "401", desc: "DIRECTORY_USER_PASSWORD_NOT_PRESENT"}],
["PHONE_NUMBER_NOT_PRESENT", {errCode: "1406", statusCode: "422", desc: "PHONE_NUMBER_NOT_PRESENT"}],
["PHONE_NUMBER_INVALID", {errCode: "1407", statusCode: "422", desc: "PHONE_NUMBER_INVALID"}],
["PHONE_NUMBER_OWNER_NAME_NOT_PRESENT", {errCode: "1408", statusCode: "422", desc: "PHONE_NUMBER_OWNER_NAME_NOT_PRESENT"}],
["PHONE_NUMBER_ALREADY_EXISTS_IN_DIRECTORY", {errCode: "1409", statusCode: "422", desc: "PHONE_NUMBER_ALREADY_EXISTS_IN_DIRECTORY"}],

/*Error relating to Access*/
["UNAUTHERIZED_ACCESS", {errCode: "1500", statusCode: "401", desc: "UNAUTHERIZED_ACCESS",}],

/*Error related to invalid query for resource*/
["QUERY_INVALID_PHONE_NUMBER", {errCode: "1600", statusCode: "403", desc: "QUERY_INVALID_PHONE_NUMBER"}],
["QUERY_TOO_BROAD", {errCode: "1601", statusCode: "422", desc: "QUERY_TOO_BROAD"}],

/*Errors relating to Route*/
["ROUTE_NOT_FOUND", {errCode: "1700", statusCode: "404", desc: "ROUTE_NOT_FOUND"}],

/*Unidentified Errors*/
["UNRECOGNISED_VALIDATION_ERROR", {errCode: "9001", statusCode: "500", desc: "UNRECOGNISED_VALIDATION_ERROR"}],
["UNRECOGNISED_ERROR", {errCode: "9002", statusCode: "500", desc: "UNRECOGNISED_ERROR"}]
]
```



























