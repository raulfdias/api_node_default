'use strict';

class APIException extends Error {
    constructor(message, status = 500, codeMessage = null) {
        super(message);

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.codeMessage = codeMessage;
        this.status = status;
    }
}

module.exports = APIException;
