import {injectable} from "inversify";

@injectable()
export class ApplicationLogic {
    sayHello(): string {
        return 'Hello, World!';
    }
}

