'use strict';

class APIException extends Error {
    constructor(message, status = 500, messageCode = null) {
        super(message);

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.messageCode = messageCode;
        this.status = status;
    }

    getMessage() {
        return this.message;
    }

    getMessageCode() {
        return this.messageCode;
    }

    getStatus() {
        return this.status;
    }
}

module.exports = APIException;
