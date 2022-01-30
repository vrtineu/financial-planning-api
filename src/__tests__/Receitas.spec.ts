import app from "..";
import { dadosReceita, limparReceitas, criarReceita } from "./utils";
import { defaultMessages } from "../utils";
import request from "supertest";

describe("Testes nos endpoints de receitas", () => {
  beforeAll(async () => {
    await limparReceitas();
  });

  describe("Testes de criação", () => {
    it("Deve ser possível criar uma receita", async () => {
      const response = await request(app)
        .post("/api/receitas")
        .send(dadosReceita);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(defaultMessages.success);
    });
    it("Não deve ser possível criar outra receita com a mesma descrição no mesmo mês", async () => {
      const response = await request(app)
        .post("/api/receitas")
        .send(dadosReceita);
      expect(response.status).toBe(400);
      expect(response.body).toEqual(defaultMessages.registered);
    });
  });

  describe("Testes de listagem", () => {
    it("Deve ser possível listar todas as receitas", async () => {
      const response = await request(app).get("/api/receitas");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
    });

    it("Deve ser possível listar uma receita específica", async () => {
      const response = await request(app).get("/api/receitas/1");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("descricao", "Test");
      expect(response.body).toHaveProperty("valor", 1000);
      expect(response.body).toHaveProperty("data", expect.any(String));
    });

    it("Deve ser possivel listar as receitas pela descricao", async () => {
      const response = await request(app).get("/api/receitas?descricao=Test");
      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty("descricao", "Test");
      expect(response.body[0]).toHaveProperty("valor", 1000);
      expect(response.body[0]).toHaveProperty("data", expect.any(String));
    });

    it("Deve exibir mensagem se não existir receitas cadastradas", async () => {
      await limparReceitas();
      const response = await request(app).get("/api/receitas");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(defaultMessages.notFound);
    });
  });

  describe("Testes de atualização", () => {
    it("Deve ser possível atualizar uma receita", async () => {
      await limparReceitas();
      await criarReceita(dadosReceita);
      const response = await request(app)
        .put("/api/receitas/1")
        .send({ ...dadosReceita, descricao: "UPDATED" });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(defaultMessages.updated);
    });

    it("Deve exibir mensagem se não existir receitas cadastradas", async () => {
      await limparReceitas();
      const response = await request(app).put("/api/receitas/1");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(defaultMessages.notFound);
    });

    it("Deve exibir mensagem se não existir receita com o id informado", async () => {
      await limparReceitas();
      await criarReceita(dadosReceita);
      const response = await request(app).put("/api/receitas/123");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(defaultMessages.notFound);
    });

    it("Não deve ser possível atualizar uma receita se ja existe uma com a mesma descrição e mês", async () => {
      await limparReceitas();
      await criarReceita(dadosReceita);
      await criarReceita({ ...dadosReceita, data: new Date("2022-02-01") });
      const response = await request(app)
        .put("/api/receitas/1")
        .send({ ...dadosReceita, data: new Date("2022-02-01") });
      expect(response.status).toBe(400);
      expect(response.body).toEqual(defaultMessages.registered);
    });
  });

  describe("Testes de exclusão", () => {
    it("Deve ser possível excluir uma receita existente", async () => {
      await limparReceitas();
      await criarReceita(dadosReceita);
      const response = await request(app).delete("/api/receitas/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(defaultMessages.deleted);
    });

    it("Deve exibir mensagem se não existir receitas cadastradas", async () => {
      await limparReceitas();
      const response = await request(app).delete("/api/receitas/1");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(defaultMessages.notFound);
    });

    it("Deve exibir mensagem se não existir receita com o id informado", async () => {
      await limparReceitas();
      await criarReceita(dadosReceita);
      const response = await request(app).delete("/api/receitas/123");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(defaultMessages.notFound);
    });
  });

  describe("Teste listar receitas por ano e mês", () => {
    it("Deve ser possível obter as receitas por ano e mês", async () => {
      await limparReceitas();
      await criarReceita(dadosReceita);
      await criarReceita({ ...dadosReceita, data: new Date("2022-02-01") });
      const response = await request(app).get("/api/receitas/2022/02");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
    });

    it("Deve exibir mensagem se não existir receitas cadastradas", async () => {
      await limparReceitas();
      const response = await request(app).get("/api/receitas/2022/02");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(defaultMessages.notFound);
    });
  });
});
