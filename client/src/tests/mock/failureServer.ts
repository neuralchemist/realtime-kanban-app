// msw
import { rest } from "msw";
//  mock data
import { projectsUrl } from "./projects";

// Define an MSW handler that returns an error response
export const failureResponseHandler = [
  rest.get(projectsUrl, (req, res, ctx) => {
    const errorMsg = "Failed to fetch....";
    return res(ctx.status(500), ctx.json({ msg: errorMsg }));
  }),
];
