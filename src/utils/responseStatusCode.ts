import { Response } from "express";

/**
 *  Default messages and status code to be used in the response
 * @param res: express response object
 * @param statusCode: number of status code http
 * @param message: string key of message to be used in the response
 * @returns response object with status code and message to user
 */
function resDefaultMessage(res: Response, statusCode: number, message: string) {
  if (!statusCode) statusCode = 200;

  const defaultMessages: Record<string, string> = {
    success: "Cadastrado com sucesso",
    registered: "Já existe um cadastro com essa descrição neste mesmo mês",
    notFound: "Não foi encontrado nenhum cadastro",
    updated: "Atualizado com sucesso",
    deleted: "Excluído com sucesso",
  };

  let messageResponse: string = defaultMessages[message];
  if (!messageResponse) messageResponse = '"message" not found';

  return res.status(statusCode).json(messageResponse);
}

/**
 * function to return a error response
 * @param res express response object
 * @param error response error object
 * @returns response object with status code and error message
 */
function resError(res: Response, error: string | object | unknown) {
  return res.status(400).json({ error: error });
}

export { resDefaultMessage, resError };
