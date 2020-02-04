# EHR Auth

This project is a PoC on how to implement an EHR Authorization Server that conforms with SMART on FHIR Protocol

## Running

```Shell
    npm install
    npm run build
    npm start
```

When in development mode, run the dev command to keep listening for files changes and restart the server

```Shell
    npm run dev
```

## Tech Stack

Only because of my own background with frontend technologies, mainly JavaScript and TypeScript, I chose to use node, express and typescript to implement this server.
The main techs are:

* [express](https://www.npmjs.com/package/express)
* [@overnightjs/core](https://www.npmjs.com/package/@overnightjs/core)
* [typescript](https://www.npmjs.com/package/typescript)

## Env Variables

* PORT - tcp port where the server will listen - default: 8080

## Testing

This projects implements TDD

```Shell
    npm test
```

It will generage the coverage report inside the /coverage folder.

On development mode, run the tdd command to keep listening for files changes and execute the test continuously.

Testing Tech Stach:

* Mocha
* Chai
* Sinon
* Istanbul
