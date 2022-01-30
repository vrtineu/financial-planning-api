import app from "..";
import request from "supertest";
import { defaultMessages } from "../utils/responseStatusCode";
import {
  limparDespesas,
  limparReceitas,
  criarReceita,
  criarDespesa,
  dadosDespesa,
  dadosReceita,
} from "./utils";

describe("Testes nos endpoints de resumo", () => {
  beforeAll(async () => {
    await limparDespesas();
    await limparReceitas();
  });

  describe("Obter resumos", () => {
    it("Deve retornar os resumos", async () => {
      await criarReceita(dadosReceita);
      await criarDespesa(dadosDespesa);

      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;

      const res = await request(app).get(`/api/resumo/${year}/${month}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data.total-receitas");
      expect(res.body).toHaveProperty("data.total-despesas");
      expect(res.body).toHaveProperty("data.saldo");
      expect(res.body).toHaveProperty("despesas-by-category");
    });

    it("Deve retornar conteudo parcial se não existir despesas ou receitas", async () => {
      await limparDespesas();

      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;

      const res = await request(app).get(`/api/resumo/${year}/${month}`);
      expect(res.status).toBe(206);
      expect(res.body).toHaveProperty("data.total-despesas", []);
      expect(res.body).toHaveProperty("despesas-by-category", []);

      await criarDespesa(dadosDespesa);
      await limparReceitas();

      const res2 = await request(app).get(`/api/resumo/${year}/${month}`);
      expect(res2.status).toBe(206);
      expect(res2.body).toHaveProperty("data.total-receitas", []);
    });

    it("Deve retornar erro 404 se não existir despesas ou receitas", async () => {
      await limparDespesas();
      await limparReceitas();

      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;

      const res = await request(app).get(`/api/resumo/${year}/${month}`);
      expect(res.status).toBe(404);
      expect(res.body).toEqual(defaultMessages.notFound);
    });
  });
});
