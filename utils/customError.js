class CustomError extends Error {
    constructor(status, message){
        super(status, message);
        this.message = message;
        this.status = status;
    }
}

module.exports = CustomError;