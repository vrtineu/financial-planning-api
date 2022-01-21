import { Response } from "express";

/** Default messages and status code to be used in the response
 * @param res: Response express object
 * @param statusCode: number of status code http
 * @param message: string key of message to be used in the response
 */
function resDefaultMessage(
  res: Response,
  statusCode: number,
  message: string
) {
  if (!statusCode) statusCode = 200;

  const messageToReturn: object = {
    sucess: "Cadastrado com sucesso",
    registered: "Já existe um cadastro com essa descrição neste mesmo mês",
    notFound: "Não foi encontrado nenhum cadastro",
    updated: "Atualizado com sucesso",
    deleted: "Excluído com sucesso",
  };

  return res.status(statusCode).json((messageToReturn as any)[message]);
}

function resError(res: Response, error: object) {
  return res.status(400).json(error);
}

export { resDefaultMessage , resError };
