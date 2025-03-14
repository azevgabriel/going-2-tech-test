# Teste Técnico - Desenvolvedor Full-Stack

## Como rodar o projeto?

### Front-end

#### Pasta: `/client`

#### Versão do Node.js: `v20.16.0`

1. Acesse o diretório do projeto:

```bash
cd client
```

2. Utilize o Node.js na versão `v20.16.0` ou execute:

```bash
nvm use
```

3. Rode as depencias do projeto:

```bash
npm ci
```

4. Inicie o projeto:

```bash
npm run dev
```

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

### Front-end

#### Regras de négocio

- [x] Criar interface de login e armazenamento do JWT.
- [x] Criar restrições visuais baseadas no nível de acesso do usuário..
- [x] Criar formulário de cadastro/edição de usuário com validação.
- [x] Exibir mensagens de erro quando o usuário tentar acessar recursos sem
      permissão.
- [x] Permissões verificadas no front-end.

##### Tecnologia

- [x] Next.JS + Tailwind CSS + Context API
- [x] Fetch API para integração

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

#### Regras de négocio

- [x] Criar entidade `Users` com `id`, `name`, `email`, `password` e `role`;
- [x] Implementar
  - [x] CRUD para a tabela `Users`
- [ ] Testes unitários

#### Critérios Técnicos

##### Tecnologia

- [x] Criar um servidor Nest.JS + TypeORM;
- [x] Utilizar o PostgreSQL como Banco de dados;
- [x] Utilizar o JWT para autenticação de usuários;
- [x] Utilizar o CASL para o controle de permissões.

##### Segurança

- [x] Utilizar o bcrypt como encriptador de senhas. Ao salvar no Banco;
- [x] Sistema validado com JWT em rotas privadas. `src/modules/auth/auth.guard.ts`
  - [x] Usuário não autenticado, retorno do status code `401 (Unauthorized.)`
- [x] Controle de permissões:
  - [x] Usuário não autenticado não acessa rotas privadas. Como: Listagem de Usuários.
  - [x] Usuário comum `"type": "user"` não tem acesso a listagem de usuários.
  - [x] Usuário gerente `"type": "manager"` não tem acesso a alteração de cargo `role`
    - [x] Retorno do status code `403 (Forbidden)`
  - [x] Usuário administador tem acesso à tudo.
  - [x] Usuário não pode se cadastrar com um email existente.
    - [x] Retorno do status code `400 (Email already in use)`

#### Comandos relevantes:

##### Criando migrações com o TypeORM (Caso não utilizar o `synchronize`)

```bash
typeorm migration:create ./[MIGRATION_PATH_DIR]/[MIGRATION_FILE_NAME]
```

`MIGRATION_PATH_DIR`: `src/db/typeorm/migrations`
