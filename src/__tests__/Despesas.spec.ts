import app from "..";
import { dadosDespesa, limparDespesas, criarDespesa } from "./utils";
import { defaultMessages } from "../utils/responseStatusCode";
import request from "supertest";

describe("Testes nos endpoints de despesa", () => {
  beforeAll(async () => {
    await limparDespesas();
  });

  describe("Testes de criação", () => {
    it("Deve ser possível criar uma despesa", async () => {
      const response = await request(app)
        .post("/api/despesas")
        .send(dadosDespesa);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(defaultMessages.success);
    });

    it("Não deve ser possível criar outra despesa com a mesma descrição no mesmo mês", async () => {
      const response = await request(app)
        .post("/api/despesas")
        .send(dadosDespesa);

      expect(response.status).toBe(400);
      expect(response.body).toEqual(defaultMessages.registered);
    });
  });

  describe("Testes de listagem", () => {
    it("Deve ser possível listar todas as despesas", async () => {
      const response = await request(app).get("/api/despesas");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
    });

    it("Deve ser possível listar uma despesa específica", async () => {
      const response = await request(app).get("/api/despesas/1");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("descricao", "Test");
      expect(response.body).toHaveProperty("valor", 1000);
      expect(response.body).toHaveProperty("data", expect.any(String));
    });

    it("Deve ser possivel listar as despesas pela descricao", async () => {
      const response = await request(app).get("/api/despesas?descricao=Test");
      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty("descricao", "Test");
      expect(response.body[0]).toHaveProperty("valor", 1000);
      expect(response.body[0]).toHaveProperty("data", expect.any(String));
    });

    it("Deve exibir mensagem se não existir despesas cadastradas", async () => {
      await limparDespesas();
      const response = await request(app).get("/api/despesas");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(defaultMessages.notFound);
    });
  });

  describe("Testes de atualização", () => {
    it("Deve ser possível atualizar uma despesa", async () => {
      await limparDespesas();
      await criarDespesa(dadosDespesa);
      const response = await request(app)
        .put("/api/despesas/1")
        .send({ ...dadosDespesa, descricao: "UPDATED" });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(defaultMessages.updated);
    });

    it("Deve exibir mensagem se não existir despesas cadastradas", async () => {
      await limparDespesas();
      const response = await request(app).put("/api/despesas/1");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(defaultMessages.notFound);
    });

    it("Deve exibir mensagem se não existir despesa com o id informado", async () => {
      await limparDespesas();
      const response = await request(app).put("/api/despesas/123");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(defaultMessages.notFound);
    });

    it("Não deve ser possível atualizar uma despesa com a mesma descrição no mesmo mês", async () => {
      await limparDespesas();
      await criarDespesa(dadosDespesa);
      await criarDespesa({ ...dadosDespesa, data: new Date("2022-02-01") });
      const response = await request(app)
        .put("/api/despesas/1")
        .send({ ...dadosDespesa, data: new Date("2022-02-01") });
      expect(response.status).toBe(400);
      expect(response.body).toEqual(defaultMessages.registered);
    });
  });

  describe("Testes de exclusão", () => {
    it("Deve ser possível excluir uma despesa", async () => {
      await limparDespesas();
      await criarDespesa(dadosDespesa);
      const response = await request(app).delete("/api/despesas/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(defaultMessages.deleted);
    });

    it("Deve exibir mensagem se não existir despesas cadastradas", async () => {
      await limparDespesas();
      const response = await request(app).delete("/api/despesas/1");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(defaultMessages.notFound);
    });

    it("Deve exibir mensagem se não existir despesa com o id informado", async () => {
      await limparDespesas();
      const response = await request(app).delete("/api/despesas/123");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(defaultMessages.notFound);
    });
  });

  describe("Teste listar despesas por ano e mês", () => {
    it("Deve ser possível buscar despesas por ano e mês", async () => {
      await limparDespesas();
      await criarDespesa(dadosDespesa);
      await criarDespesa({ ...dadosDespesa, data: new Date("2022-02-01") });
      const response = await request(app).get("/api/despesas/2022/02");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
    });

    it("Deve exibir mensagem se não existir despesas cadastradas", async () => {
      await limparDespesas();
      const response = await request(app).get("/api/despesas/2020/02");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(defaultMessages.notFound);
    });
  });
});
