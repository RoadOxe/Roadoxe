import {injectable} from "inversify";

@injectable()
export class ApplicationService {
    sayHello() {
        return { message: 'Hello, World!' };
    }
}

