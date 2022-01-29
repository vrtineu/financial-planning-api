import app from "..";
import request from "supertest";

describe("Testes nos endpoints de receitas", () => {
  it("Deve ser possível criar uma receita", async () => {
    const response = await request(app).post("/api/receitas").send({
      descricao: "Receita de teste",
      valor: 100,
      data: "2020-03-01",
    });

    expect(response.status).toEqual(201);
    expect(response.body).toEqual("Cadastrado com sucesso");
  });

  it("Não deve ser possível cadastrar duas receitas com a mesma descrição no mesmo mês", async () => {
    const response = await request(app).post("/api/receitas").send({
      descricao: "Receita de teste",
      valor: 100,
      data: "2020-03-01",
    });

    expect(response.status).toEqual(400);
    expect(response.body).toEqual(
      "Já existe um cadastro com essa descrição neste mesmo mês"
    );
  });

  it("Deve retornar todas as receitas cadastradas", async () => {
    const response = await request(app).get("/api/receitas");
    expect(response.status).toBe(200);

    const receitas = response.body;
    expect(receitas[0]).toHaveProperty("valor");
    expect(receitas[0]).toHaveProperty("data");
    expect(receitas[0]).toHaveProperty("descricao");
  });

  it("Deve retornar uma receita específica", async () => {
    const response = await request(app).get("/api/receitas/1");
    const receita = response.body;

    expect(response.status).toBe(200);
    expect(receita).toHaveProperty("valor");
    expect(receita).toHaveProperty("data");
    expect(receita).toHaveProperty("descricao");
  });

  it("Deve ser possível atualizar uma receita", async () => {
    const response = await request(app).put("/api/receitas/1").send({
      descricao: "Receita update",
      valor: 9000,
      data: "2022-01-28",
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual("Atualizado com sucesso");
  });

  it("Deve retornar erro ao tentar atualizar uma receita inexistente", async () => {
    const response = await request(app).put("/api/receitas/123").send({
      descricao: "Receita update",
      valor: 9000,
      data: "2022-01-28",
    });
    expect(response.status).toBe(404);
    expect(response.body).toEqual("Não foi encontrado nenhum cadastro");
  });

  it("Deve ser possível deletar uma receita", async () => {
    const response = await request(app).delete("/api/receitas/4");
    expect(response.status).toBe(200);
    expect(response.body).toEqual("Excluído com sucesso");
  });

  it("Deve retornar erro ao tentar deletar uma receita inexistente", async () => {
    const response = await request(app).delete("/api/receitas/123");
    expect(response.status).toBe(404);
    expect(response.body).toEqual("Não foi encontrado nenhum cadastro");
  });

  it("Deve ser possível buscar receitas por ano e mês", async () => {
    const response = await request(app).get("/api/receitas/2022/1");
    expect(response.status).toBe(200);

    const receitas = response.body;
    expect(receitas[0]).toHaveProperty("valor");
    expect(receitas[0]).toHaveProperty("data");
    expect(receitas[0]).toHaveProperty("descricao");
  });

  it("Deve retornar erro ao tentar buscar receitas por ano e mês inexistente", async () => {
    const response = await request(app).get("/api/receitas/2020/1");
    expect(response.status).toBe(404);
    expect(response.body).toEqual("Não foi encontrado nenhum cadastro");
  });
});
