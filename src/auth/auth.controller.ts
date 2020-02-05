import { Controller, Get, Post, Middleware } from "@overnightjs/core";
import { Request, Response } from "express";
import { authorizationJWT, validateToken, authenticationJWT, refreshJWT } from "./jwt";

// This is hardcoded for testing. Idealy it should came from a database registrantion or some other data source
const clients = [
    {
        id: 'client-id-001',
        secret: 'client-secred-001',
        launchUrls: [
            'http://localhost:4200/launch'
        ],
        redirectUrls: [
            'http://localhost:4200/'
        ]
    },
    {
        id: 'client-id-002',
        secret: 'client-secred-002',
        launchUrls: [
            'http://localhost:4200/launch'
        ],
        redirectUrls: [
            'http://localhost:4200/'
        ]
    },
    {
        id: 'client-id-003',
        secret: 'client-secred-003',
        launchUrls: [
            'http://localhost:4200/launch'
        ],
        redirectUrls: [
            'http://localhost:4200/'
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
        const invalidMessage = this.validateParams(req.query);
        if (invalidMessage) {
            return res.status(400).json({ message: invalidMessage });
        }

        return res.render('authentication', {
            query: req.query,
            failed: false
        });

    }

    @Post('authentication')
    authentication(req: Request, res: Response) {
        const invalidMessage = this.validateParams(req.body);
        if (invalidMessage) {
            return res.status(400).json({ message: invalidMessage });
        }

        // authenticate user
        if (req.body.username !== 'user' && req.body.password !== '123') {
            return res.render('authentication', {
                query: req.body,
                failed: true
            });
        }

        // generate authorization code
        const code = authorizationJWT({
            username: 'user',
            userid: '123',
            client_id: req.body.client_id,
            scope: req.body.scope
        });

        const params = `code=${code}&state=${req.body.state}`;
        let url = req.body.redirect_uri;
        if (url.indexOf('?') === -1) {
            url += `?${params}`;
        } else if (url.indexOf('?') === url.length - 1) {
            url += params;
        } else {
            url += `&${params}`;
        }

        // redirect to redirect_uri?code?state
        return res.redirect(url);
    }

    @Post('token')
    async token(req: Request, res: Response) {
        const regexExec: any[] = /^[Bb]asic (.*)$/.exec(req.headers.authorization || '') || [];
        const buff = Buffer.from(regexExec[1] || '', 'base64');
        const authorization = buff.toString('ascii').split(':');
        const clientId = authorization[0] || '';
        const clientSecret = authorization[1] || '';
        let payload: any;

        if (req.body.grant_type !== 'authorization_code') {
            return res.status(400).json({ message: 'invalid grant_type parameter' });
        }

        try {
            payload = await validateToken(req.body.code);
        } catch (err) {
            return res.status(400).json({ message: 'invalid code parameter' });
        }

        const client = clients.find(c => c.id === payload.client_id);
        if (client.id !== req.body.client_id && client.id !== clientId) {
            return res.status(400).json({ message: 'invalid client_id' });
        }

        if (clientId && client.secret !== clientSecret) {
            return res.status(400).json({ message: 'invalid client secret' });
        }

        const redirectUrl = client.redirectUrls.find(url => url === req.body.redirect_uri);
        if (!redirectUrl) {
            return res.status(400).json({ message: 'invalid redirect_uri parameter' });
        }

        const { username, userid, scope } = payload;
        payload = { username, userid, scope, client_id: client.id };
        const token = authenticationJWT({ ...payload });
        const refresh = refreshJWT({ ...payload });

        res.set({ 'Cache-Control': 'no-store', 'Pragma': 'no-cache' });
        return res.status(200).json({
            access_token: token,
            expires_in: 15 * 60,
            token_type: 'Bearer',
            scope: payload.scope,
            refresh_token: refresh,
            patient: '123'
        });
    }

    private validateParams(params: any): string {
        const scope = params.scope;
        const state = params.state;

        // response_type query parameter HAVE to be equal the string 'code'
        if (params.response_type !== 'code') {
            return 'invalid response_type parameter';
        }

        // client_id query parameter HAVE to be a registered client id
        const client = clients.find(c => c.id === params.client_id);
        if (!client) {
            return 'invalid client_id parameter';
        }

        // redirect_uri query parameter HAVE to be present in the client redirectUrls array registration
        const redirectUrl = client.redirectUrls.find(url => url === params.redirect_uri);
        if (!redirectUrl) {
            return 'invalid redirect_uri parameter';
        }

        // TODO - perform better scope validation
        if (!scope) {
            return 'invalid scope parameter';
        }

        // state query parameter HAVE to be present and different than empty
        if (!state) {
            return 'invalid state parameter';
        }

        // aud must be a valid fhir server
        if (!fhirServers.find(s => s === params.aud)) {
            return 'invalid aud parameter';
        }

        return "";
    }
};