<h1 align="center">Financial Planning API</h1>

### Contexto

API padrão REST desenvolvida para o challenge back-end 2 da Alura, com o objetivo de criar um serviço de controle financeiro, com as principais funcionalidades sendo o cadastro de receitas e despesas do usuário, com possibilidade de consulta, atualização e exclusão dos mesmos.

### Desenvolvimento

Foi utilizado no desenvolvimento TypeScript, MongoDB, Express.js e Jest para os testes automátizados.

### Deploy

Foi utilizado a plataforma do Heroku no deploy da API, os end-points podem ser acessados através do link: [https://financial-planning-api.herokuapp.com/](https://financial-planning-api.herokuapp.com/).

### Autenticação

Todas as requisições devem ser autenticadas, o usuário deve estar cadastrado no sistema, para isso, é necessário informar o email e a senha do usuário.

### End-points

```
User
POST /api/login
POST /api/register

Receitas
POST /api/receitas
GET /api/receitas
GET /api/receitas/:id
GET /api/despesas/:year/:month
PUT /api/receitas/:id
DELETE /api/receitas/:id

Despesas
POST /api/despesas
GET /api/despesas
GET /api/despesas/:id
GET /api/despesas/:year/:month
PUT /api/despesas/:id
DELETE /api/despesas/:id

Resumo
GET /api/resumo/:year/:month
```

### Documentação

#### User

```
POST /api/login

{
    "email": string,
    "password": string
}

Retorno:

{
    "token": string,
    "_id": string,
    "email": string,
    "name": string,
    "lastname": string
}
```

```
POST /api/register

{
    "email": string,
    "password": string,
    "name": string,
    "lastname": string
}

Retorno:

{
    message: string
}
```

#### Receitas

```
POST /api/receitas

{
    "descricao": string,
    "valor": number,
    "data": string,
}

Retorno:

{
    "message": string
}
```

```
GET /api/receitas

Retorno:

[
    {
        "descricao": string,
        "valor": number,
        "data": string,
    }
]
```

```
GET /api/receitas/:id

Retorno:

{
    "descricao": string,
    "valor": number,
    "data": string,
}
```

```
GET /api/despesas/:year/:month

Retorno:

[
    {
        "descricao": string,
        "valor": number,
        "data": string,
    }
]
```

```
PUT /api/receitas/:id

{
    "descricao": string,
    "valor": number,
    "data": string,
}

Retorno:

{
    "message": string
}
```

```
DELETE /api/receitas/:id

Retorno:

{
    "message": string
}
```

#### Despesas

```
POST /api/despesas

{
    "categoria": string,
    "descricao": string,
    "valor": number,
    "data": string,
}

Retorno:

{
    "message": string
}
```

```
GET /api/despesas

Retorno:

[
    {
        "categoria": string,
        "descricao": string,
        "valor": number,
        "data": string,
    }
]
```

```
GET /api/despesas/:id

Retorno:

{
    "categoria": string,
    "descricao": string,
    "valor": number,
    "data": string,
}
```

```
GET /api/despesas/:year/:month

Retorno:

[
    {
        "categoria": string,
        "descricao": string,
        "valor": number,
        "data": string,
    }
]
```

```
PUT /api/despesas/:id

{
    "categoria": string,
    "descricao": string,
    "valor": number,
    "data": string,
}

Retorno:

{
    "message": string
}
```

```
DELETE /api/despesas/:id

Retorno:

{
    "message": string
}
```

#### Resumo

```
GET /api/resumo/:year/:month

Retorno:

{
    "message": string,
    "data": {
        "total-receitas": number,
        "total-despesas": number,
        "saldo": number
    },
    "despesas-by-category": {
        "categoria": number
    }
}
```

** Work in progress **
