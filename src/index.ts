import { EHRAuthServer } from "./server";

const port: number = +process.env.PORT || 8080;
const server = new EHRAuthServer();
server.start(port);