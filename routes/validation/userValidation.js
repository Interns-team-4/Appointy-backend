const userSignupSchema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "maxLength": 20
        },
        "email": {
            "type": "string",
            "format": "email"
        },
        "password": {
            "type": "string",
            "pattern": "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        },
        "confirm_password": {
            "type": "string",
            "pattern": "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        }
    },
    "required": [
        "name",
        "email",
        "password",
        "confirm_password"
    ]

}


module.exports = {
    userSignupSchema
}