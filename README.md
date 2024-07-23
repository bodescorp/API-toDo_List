# Cadastro de Pagamentos

Esta aplicação é uma API REST desenvolvida com NestJS para gerenciar o cadastro de Tarefas, incluindo a validação de contas, atualização de saldo, armazenamento de pagamentos no banco de dados e geração de relatórios de transações.

## Índice

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Tecnologias](#tecnologias)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Instalação

### Usando Docker Compose

1. Clone o repositório:

   ```bash
   git clone https://github.com/bodescorp/API-toDo_List.git
   cd API-toDo_List
   ```

2. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

   ```env
    JWT_SECRET=
    JWT_EXPIRATION_TIME=

    DB_HOST=
    DB_PORT=
    DB_USERNAME=
    DB_PASSWORD=
    DB_NAME=
   ```

3. Construa e inicie os containers Docker:

   ```bash
   docker-compose up --build
   ```

4. A API estará disponível em `http://localhost:3000`.

### Manualmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/bodescorp/API-toDo_List.git
   cd API-toDo_List
   ```

2. Instale as dependências:

   ```bash
   yarn install
   ```

3. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```env
  JWT_SECRET=
  JWT_EXPIRATION_TIME=

  DB_HOST=
  DB_PORT=
  DB_USERNAME=
  DB_PASSWORD=
  DB_NAME=
```

4. Configure a conexão com o banco de dados no arquivo `src/app.module.ts` se necessário.

5. Inicie o Banco de Dados:

   ```bash
   yarn migration:run
   ```

6. Inicie o servidor:

   ```bash
   yarn start:dev
   ```

7. A API estará disponível em `http://localhost:3000`.

## Uso

1. Para iniciar a aplicação com Docker Compose:

   ```bash
   docker-compose up --build
   ```

2. Para parar os containers:

   ```bash
   docker-compose down
   ```

## Endpoints

### Usuarios

- `POST /users`
  - **Descrição:** Criação de usuário e retorna o usuario criado.
  - **Body:** `{ "username": "seu-email", "password": "sua-senha" }`
  - **Resposta:** `{ "id": "id", "username":"seu-email"}`

### Autenticação

- `POST /auth/login`
  - **Descrição:** Autentica um usuário e retorna um token JWT.
  - **Body:** `{ "username": "seu-email", "password": "sua-senha" }`
  - **Resposta:** `{ "token": "seu-token", "expiresIn":3600}`

### Tarefas

- `POST /tasks`

  - **Descrição:** Cria uma nova tarefa com título, descrição e status (pendente ou concluída).
  - **Autenticação:** Bearer token
  - **Body:** `{ "title": "Título da tarefa", "description": Descrição da tarefa", "status": "Status da tarefa (pendente ou concluída)." }`

- `GET /tasks`

  - **Descrição:** Lista todas as tarefas com possibilidade de filtrar por status.
  - **Autenticação:** Bearer token
  - **Parâmetros Query Opcionais**:
    - `title`: Filtra as tarefas pelo titulo.
    - `status`: Filtrar tarefas pelo status (pendente ou concluída).
  - **Resposta:** `[ {"title": "title",	"description": "description", "description": "description"}, ... ]`

  - `GET /tasks/id`
  - **Descrição:** Retorna um tarefa específica.
  - **Autenticação:** Bearer token
  - **Resposta:** `{"id": "id",	"title": "title", "description": "description",	"status": "status"}`

- `PUT /tasks/id`

  - **Descrição:** Atualiza o título, descrição ou status de uma tarefa.
  - **Autenticação:** Bearer token
  - **Body:** `{"título": "título", "descrição": "descrição",	"status": "status"}`

- `DELETE /tasks/id`
  - **Descrição:** Exclui uma tarefa.
  - **Autenticação:** Bearer token

### Documentação

- A documentação da API é gerada usando Swagger e está disponível em `/api`.

## Uso

Acesse `http://localhost:3000/api` para visualizar a documentação Swagger e testar os endpoints.

## Extras

### Multi-tenancy

- Suporte para múltiplos inquilinos (multi-tenancy).

## Tecnologias

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Swagger](https://swagger.io/docs/)

## Contribuição

1. Faça um fork do repositório.
2. Crie uma nova branch com sua feature: `git checkout -b minha-feature`.
3. Commit suas mudanças: `git commit -m 'Adiciona minha feature'`.
4. Faça um push para a branch: `git push origin minha-feature`.
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
