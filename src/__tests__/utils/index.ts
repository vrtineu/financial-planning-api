import app from "../..";
import Counters from "../../models/Counters";
import { defaultMessages } from "../../utils/responseStatusCode";
import Receitas from "../../models/Receitas";
import request from "supertest";

const dadosReceita = {
  descricao: "Test",
  valor: 1000,
  data: new Date(),
};

async function limparReceitas() {
  await Receitas.deleteMany({});
  await Counters.deleteMany({});
}

async function criarReceita(dadosReceita: object) {
  const receita = await request(app)
    .post("/api/receitas")
    .send(dadosReceita)
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body).toBe(defaultMessages.success);
    });

  return receita;
}

export { dadosReceita, limparReceitas, criarReceita };
