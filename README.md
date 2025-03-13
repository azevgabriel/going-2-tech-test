# Teste Técnico - Desenvolvedor Full-Stack

## Como rodar o projeto?

### Back-end

#### Pasta: `/api`
#### Versão do Node.js: `v20.16.0`

1. Acesse o diretório do projeto:
```bash
cd api
```

2. Utilize o Node.js na versão `v20.16.0` ou execute:
```bash
nvm use
```

3. Rode as depencias do projeto:
```bash
npm ci
```

4. Configure o `.env` com base no exemplo fornecido em `.env.example`
5. Execute a seed para gerar alguns usuários pré-definidos.
```bash
npm run seed
```

6. Inicie o projeto:
```bash
npm run dev
```

## Considerações sobre o código

### Back-end

#### Estrutura de pastas
```shell
  $ tree
  .
  ├── src
  │   ├── db
  │   └── modules
  │   └── presentation
  │   └── utils
  │   └── app.module.ts
  │   └── main.ts
  ├──.env.exemple
```
`db`: Contém toda a infraestrutura do banco de dados, incluindo migrations, seed e configuração inicial do TypeORM.
`modules`: Diretório onde os `controllers` e `services` estão organizados de forma modular, seguindo suas respectivas responsabilidades.
`presentation`: Contém utilitários para lidar com as extremidades de uma solicitação HTTP, como requisições (request) e respostas (response).
`utils`: Centraliza funções utilitárias e constantes importantes do projeto.

## Comandos importantes:

**Criando migrações com o TypeORM**
```bash
typeorm migration:create ./[MIGRATION_PATH_DIR]/[MIGRATION_FILE_NAME]
```

`MIGRATION_PATH_DIR`: `src/db/typeorm/migrations`

