const errorCodes = {
    "EMAIL_ID_ALREADY_EXIT": {
        "status": false,
        "status_code": 400,
        "message": "Email Id is Already exit in our database"
    },
    "EMAIL_ID_NOT_FOUND": {
        "status": false,
        "status_code": 400,
        "message": "Email Id is not found in our database"
    },
    "PASSWORD_MISMATCH": {
        "status": false,
        "status_code": 400,
        "message": "confirm password not same as password"
    },
    "PASSWORD_WRONG": {
        "status": false,
        "status_code": 400,
        "message": "your password is incorrect"
    },
    "USR_SAVE_ERROR": {
        "status": false,
        "status_code": 400,
        "message": "Error in Saving the User Data"
    },
    "UNKNOWN_ERROR": {
        "status": false,
        "status_code": 500,
        "message": "Something went wrong!!"
    },
    "INTERNAL_ERROR": {
        "status": false,
        "status_code": 500,
        "message": "Internal Server Error!!"
    }

}


module.exports = errorCodes;