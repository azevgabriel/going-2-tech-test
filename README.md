# Teste Técnico - Desenvolvedor Full-Stack

Versão do node: `v20.16.0`

## Comandos importantes:

**Criando migrações com o TypeORM**
```bash
typeorm migration:create ./[MIGRATION_PATH_DIR]/[MIGRATION_FILE_NAME]
```

`MIGRATION_PATH_DIR`: `src/db/typeorm/migrations`

Description: Cadastro e Gerenciamento de Usuários com Controle de Acesso.

## Front-end: `Next.js`

- Tailwind CSS
- Redux ou Context API para gerenciamento de estado (JWT - useSession)
- Fetch API

### Login with JWT

● Criar página de listagem de usuários acessível apenas para administradores e
gerentes.
● Criar formulário de cadastro/edição de usuário com validação.
● Criar restrições visuais baseadas no nível de acesso do usuário.
● Implementar controle de permissões no front-end com CASL.
● Exibir mensagens de erro quando o usuário tentar acessar recursos sem

### Unit test

## Back-end: `Node with Nest.js`


- CRUD Users with permissions.
```ts
export interface UserModel {
  id: string;
  email: string; // unique
  password: styring; // bycript
  role: "admin" | "manager" | "user";
}
```
- O email deve ser único e validado antes do cadastro
Cenários de Teste
- Usuário gerente tenta alterar a role de um usuário → Deve receber erro 403
Forbidden.
-  Usuário tenta se cadastrar com um email já existente → Deve receber erro
400 Email already in use.

### System
  - LOGIN -> Auth wih token `expiresIn: 1d`

### ADMIN
  - Create users and update permissions

### MANAGER
  - Load all users and update all cols without permission

### USER
  - Load by self and update your cols without permissions

### Tratamento de Erros
  - Ações sem permissão

### Middlaware --> Token with permission
  - Use https://casl.js.org/v6/en/guide/intro on Permissions
