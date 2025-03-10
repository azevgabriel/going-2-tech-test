###Teste Técnico - Desenvolvedor Full-Stack

História de Usuário - Cadastro e Gerenciamento de Usuários com Controle de Acesso.

Descrição

### ADMIN
- CRUD Users: 

Como administrador do sistema, quero cadastrar, editar, visualizar e excluir usuários,
garantindo que cada usuário tenha um nível de acesso apropriado, para que as
permissões do sistema sejam controladas com base em suas funções.
Critérios de Aceitação
O sistema deve permitir que apenas usuários autenticados realizem operações de
criação, edição e exclusão de usuários.
O sistema deve armazenar usuários no banco de dados PostgreSQL, garantindo que
o email seja único.
As senhas devem ser criptografadas antes de serem armazenadas no banco de
dados.
O sistema deve permitir que um usuário faça login usando JWT, e o token deve expirar
após um tempo determinado.
O sistema deve permitir que usuários tenham diferentes níveis de acesso (Ex.:
Admin, Gerente, Usuário Comum) usando CASL para controle de permissões.
Apenas administradores podem criar novos usuários e alterar permissões.
Usuários com nível "Gerente" podem visualizar todos os usuários, mas só podem
editar algumas informações (não podem alterar permissões de outros usuários).
Usuários comuns só podem visualizar seu próprio perfil e editar suas próprias
informações.
O frontend em React com Next.js deve consumir a API do backend em Node .js com
Nest.js para gerenciar usuários.
O sistema deve exibir mensagens de erro adequadas caso o usuário tente executar
ações sem permissão.
Tarefas
Back-end (NestJS + PostgreSQL + JWT + CASL)
● Criar a entidade User com id, name, email (único), password
(criptografado), e role (nível de acesso).
● Implementar CRUD para usuários no NestJS.
● Criar autenticação com JWT e proteção de rotas.
● Implementar controle de permissões com CASL.
● Criar middleware para verificar permissões baseado no nível de acesso.
● Criar testes unitários e de integração para garantir a segurança do sistema.
Front-end (React + Next.js)
● Criar interface de login e armazenamento do token JWT.
● Criar página de listagem de usuários acessível apenas para administradores e
gerentes.
● Criar formulário de cadastro/edição de usuário com validação.
● Criar restrições visuais baseadas no nível de acesso do usuário.
● Implementar controle de permissões no front-end com CASL.
● Exibir mensagens de erro quando o usuário tentar acessar recursos sem
permissão.
Critérios Técnicos
● Backend:
○ Node.js com NestJS
○ PostgreSQL com TypeORM
○ JWT para autenticação
○ CASL para controle de permissões
● Frontend:/
○ React com Next.js
○ Tailwind CSS para estilização
○ Redux ou Context API para gerenciamento de estado
○ Fetch API para consumir o backend
● Segurança:
○ Senhas devem ser armazenadas de forma segura com bcrypt
○ O sistema deve validar corretamente tokens JWT
○ As permissões de usuários devem ser verificadas no backend e
frontend
○ O email deve ser único e validado antes do cadastro
Cenários de Teste
1. Usuário não autenticado tenta acessar a listagem de usuários → Deve
receber erro 401 Unauthorized.
2. Usuário comum tenta acessar a página de usuários → Deve ser bloqueado e
redirecionado.
3. Usuário gerente tenta alterar a role de um usuário → Deve receber erro 403
Forbidden.
4. Administrador edita um usuário com sucesso → O sistema deve retornar 200
OK e salvar as alterações.
5. Usuário tenta se cadastrar com um email já existente → Deve receber erro
400 Email already in use.
Observações:
1. O prazo de entrega é de 1 semana. Caso o projeto seja finalizado antes, sinta-se
à vontade para enviá-lo antecipadamente.
2. A entrega deve ser feita via Git.
3. Será verificado se a entrega ocorreu dentro do prazo estabelecido.
4. Se todo o desenvolvimento não estiver concluído, envie o que estiver pronto e
funcional.
5. Dê o seu melhor! Testes unitários serão considerados um diferencial.
