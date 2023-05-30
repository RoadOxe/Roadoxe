import { Request, Response } from 'express'
import { controller, httpGet } from 'inversify-express-utils'

@controller('/api')
export class MockController {
  @httpGet('/')
    public index(req: Request, res: Response) {
        res.json({ message: 'Success' })
    }
}
