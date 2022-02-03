"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resError = exports.resDefaultMessage = exports.defaultMessages = void 0;
var defaultMessages = {
    success: "Cadastrado com sucesso",
    registered: "Já existe um cadastro com essa descrição neste mesmo mês",
    notFound: "Não foi encontrado nenhum cadastro",
    updated: "Atualizado com sucesso",
    deleted: "Excluído com sucesso",
    missingFieldsLogin: "Email ou Senha não informados",
};
exports.defaultMessages = defaultMessages;
/**
 *  Default messages and status code to be used in the response
 * @param res: express response object
 * @param statusCode: number of status code http
 * @param message: string key of message to be used in the response
 * @returns response object with status code and message to user
 */
function resDefaultMessage(res, statusCode, message) {
    if (!statusCode)
        statusCode = 200;
    var messageResponse = defaultMessages[message];
    if (!messageResponse)
        messageResponse = '"message" not found';
    return res.status(statusCode).json(messageResponse);
}
exports.resDefaultMessage = resDefaultMessage;
/**
 * function to return a error response
 * @param res express response object
 * @param error response error object
 * @returns response object with status code and error message
 */
function resError(res, error) {
    return res.status(400).json({ error: error });
}
exports.resError = resError;
