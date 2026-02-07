export class CreateAttemptsExceededError extends Error {
    constructor(message: string = "The maximum number of attempts to create a URL has been exceeded") {
        super(message);
        this.name = "CreateAttemptsExceededError";
    }
}

export class UrlNotFoundError extends Error {
    constructor(message: string = "The URL you are looking for does not exist") {
        super(message);
        this.name = "UrlNotFoundError";
    }
}




  