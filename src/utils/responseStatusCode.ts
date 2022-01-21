import { Response } from "express";

/** Function to return a response with a status code default
 * @param res Response object
 * @param statusCode Status code http, default 200
 * @param message Message to return to client
 */
function responseStatusCode(
  res: Response,
  statusCode: number,
  message: string | object
) {
  if (!statusCode) statusCode = 200;
  if (!message) message = "";

  if (statusCode >= 400) {
    return res.status(statusCode).json({
      error: message,
    });
  }
  return res.status(statusCode).json(message);
}

export { responseStatusCode };
