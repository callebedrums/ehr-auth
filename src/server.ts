
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import { Server } from '@overnightjs/core';
import { FHIRController } from './fhir/fhir.controller';
import { AuthController } from './auth/auth.controller';

export class EHRAuthServer extends Server {

    constructor() {
        super();

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        // log requests on console
        this.app.use(morgan('dev'));

        // enable cors
        this.app.use(cors({
            credentials: true,
            allowedHeaders: [
                'content-type',
                'origin',
                'authorization',
                'accept',
                'x-requested-with'
            ],
            exposedHeaders: [
            ]
        }));

        this.app.get('/', (req, res) => {
            res.send('Hellow world!');
        });

        super.addControllers([
            new FHIRController(),
            new AuthController()
        ]);
    }

    public start(port: number) {
        this.app.listen(port, () => {
            // tslint:disable-next-line:no-console
            console.log(`server started at http://localhost:${port}`);
        });
    }
}