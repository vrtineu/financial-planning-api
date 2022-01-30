import app from "../..";
import Counters from "../../models/Counters";
import { defaultMessages } from "../../utils";
import Despesas from "../../models/Despesas";
import Receitas from "../../models/Receitas";
import request from "supertest";

const dadosReceita = {
  descricao: "Test",
  valor: 1000,
  data: new Date(),
};

const dadosDespesa = {
  descricao: "Test",
  valor: 1000,
  data: new Date(),
  categoria: "Moradia",
};

async function limparReceitas() {
  await Receitas.deleteMany({});
  await Counters.findOneAndDelete({ id: "idReceita" });
}

async function limparDespesas() {
  await Despesas.deleteMany({});
  await Counters.findOneAndDelete({ id: "idDespesa" });
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

async function criarDespesa(dadosDespesa: object) {
  const despesa = await request(app)
    .post("/api/despesas")
    .send(dadosDespesa)
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body).toBe(defaultMessages.success);
    });

  return despesa;
}

export {
  dadosReceita,
  dadosDespesa,
  limparReceitas,
  limparDespesas,
  criarReceita,
  criarDespesa,
};
