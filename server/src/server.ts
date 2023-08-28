// for absolute path import
import "module-alias/register";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
// custom components
import app from "./app";
//❗ note: only import config after app
import config from "config";
// utils
import { connectMongoServer, log } from "@common/utils";
import { initSocket } from "@common/utils/socketManager";

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

// create express server
const expressServer = createServer(app);
// socket
const io = new Server(expressServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

initSocket(io);

// start server: host: '0.0.0' for docker
expressServer.listen(port, host, async () => {
  log.info(`🚀Listening at http://${host}:${port}`);
  await connectMongoServer();
});
