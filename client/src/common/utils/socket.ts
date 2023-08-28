import { io } from "socket.io-client";
/**
 * https://socket.io/how-to/use-with-react
 */

const ENDPOINT = "http://localhost:5000";
// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : ENDPOINT;
console.log('URL: ', URL)

export const socket = io(URL as string, { autoConnect: true });