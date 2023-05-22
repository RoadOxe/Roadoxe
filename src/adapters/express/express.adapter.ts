import { Request, Response } from 'express';
import { interfaces, controller, httpGet } from 'inversify-express-utils';
import {ApplicationLogic} from "../../main/appLogic.main";

@controller('/')
export class ExpressAdapter implements interfaces.Controller {
    constructor(private applicationLogic: ApplicationLogic) {}

    @httpGet('/')
    private sayHello(req: Request, res: Response): void {
        const message = this.applicationLogic.sayHello();
        res.send(message);
    }
}
