import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";

// This is hardcoded for testing. Idealy it should came from a database registrantion or some other data source
const clients = [
    {
        id: 'client-id-001',
        launchUrls: [
            'http://localhost:4200/launch'
        ],
        redirectUrls: [
            'http://localhost:4200/authorized'
        ]
    },
    {
        id: 'client-id-002',
        launchUrls: [
            'http://localhost:4200/launch'
        ],
        redirectUrls: [
            'http://localhost:4200/authorized'
        ]
    },
    {
        id: 'client-id-003',
        launchUrls: [
            'http://localhost:4200/launch'
        ],
        redirectUrls: [
            'http://localhost:4200/authorized'
        ]
    }
];

const fhirServers = [
    'http://localhost:8080/fhir'
]

@Controller('auth')
export class AuthController {

    @Get('authorize')
    authorize(req: Request, res: Response) {

        const launch = req.query.launch;
        const scope = req.query.scope;
        const state = req.query.state;

        console.log(req.query);

        // response_type query parameter HAVE to be equal the string 'code'
        if (req.query.response_type !== 'code') {
            return res.status(400).json({
                message: 'invalid response_type parameter'
            });
        }

        // client_id query parameter HAVE to be a registered client id
        const client = clients.find(c => c.id === req.query.client_id);
        if (!client) {
            return res.status(400).json({
                message: 'invalid client_id parameter'
            })
        }

        // redirect_uri query parameter HAVE to be present in the client redirectUrls array registration
        const redirectUrl = client.redirectUrls.find(url => url === req.query.redirect_uri);
        if (!redirectUrl) {
            return res.status(400).json({
                message: 'invalid redirect_uri parameter'
            });
        }

        // TODO - perform better scope validation
        if (!scope) {
            return res.status(400).json({ message: 'invalid scope parameter' });
        }
        console.log(scope.split(' '));

        // state query parameter HAVE to be present and different than empty
        if (!state) {
            return res.status(400).json({ message: 'invalid state parameter' });
        }

        // aud must be a valid fhir server
        if (!fhirServers.find(s => s === req.query.aud)) {
            return res.status(400).json({ message: 'invalid aud parameter' });
        }

        // TODO - authenticate user and authorize user/application
        // TODO - generate authorization code
        // TODO - redirect to redirect_uri?code?state

    }
};