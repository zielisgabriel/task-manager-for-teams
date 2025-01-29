# Task Manager for Teams

**Task Manager for Teams** é uma API desenvolvida para facilitar o gerenciamento de tarefas em equipe, promovendo colaboração eficiente e organização otimizada. Este documento fornece uma visão detalhada do projeto, incluindo suas funcionalidades, arquitetura, instruções de instalação e uso, além de diretrizes para contribuição.

## Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Arquitetura do Sistema](#arquitetura-do-sistema)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Configuração](#instalação-e-configuração)
- [Uso da API](#uso-da-api)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Visão Geral

O **Task Manager for Teams** é uma API projetada para auxiliar equipes na gestão de tarefas, permitindo a criação, atribuição, acompanhamento e conclusão de atividades de forma colaborativa. A API visa melhorar a produtividade e a comunicação dentro das equipes, fornecendo um backend centralizado para o gerenciamento de tarefas.

## Funcionalidades Principais

- **Criação de Tarefas:** Permite que os usuários criem novas tarefas com detalhes como título, descrição, data de vencimento e prioridade.
- **Atribuição de Tarefas:** Possibilita a designação de tarefas a membros específicos da equipe, facilitando a distribuição de responsabilidades.
- **Acompanhamento de Progresso:** Oferece uma visão clara do status de cada tarefa (pendente, em andamento, concluída).
- **Autenticação e Autorização:** Implementadas com JSON Web Tokens (JWT) para segurança das operações.
- **Histórico de Ações:** Rastreia alterações feitas nas tarefas para auditoria e transparência.

## Arquitetura do Sistema

A API segue uma arquitetura RESTful baseada em:

- **Backend:** Construído com Node.js e Express.js para manipulação de requisições HTTP.
- **Banco de Dados:** PostgreSQL para armazenamento seguro e eficiente.
- **Autenticação:** Implementação baseada em JWT.
- **ORM:** Prisma para facilitar interação com o banco de dados.

## Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **JWT (JSON Web Token)**
- **Prisma ORM**
- **Docker**

## Instalação e Configuração

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/zielisgabriel/task-manager-for-teams.git
   cd task-manager-for-teams
   ```
2. **Instale as Dependências:**
   ```bash
   npm install
   ```
3. **Configuração do Banco de Dados:**
   - Configure o PostgreSQL e adicione as credenciais no arquivo `.env`.
4. **Execute as Migrações:**
   ```bash
   npx prisma migrate dev
   ```
5. **Inicie a API:**
   ```bash
   npm run dev
   ```

A API estará disponível em `http://localhost:3000`.

## Uso da API

A API expõe endpoints REST para manipulação de tarefas. Exemplo de uso:


### Tipos de usuários
- **ADMIN**: Visualizar e gerenciar todas as tarefas, usuários e times.
- **MEMBER**: Visualiza tarefas do time e pode editar apenas suas tarefas.

### Listar Usuários (ADMIN)

```bash
GET /users

# lista todos os usuários
```

### Criar um Usuário (ADMIN and MEMBER)

```bash
POST /users
{
  "name": "Seu Nome",
  "email": "seuemail@email.com",
  "password": "senha123"
}
```

### Iniciar uma Sessão (ADMIN and MEMBER)

```bash
POST /sessions
{
  "email": "seuemail@email.com",
  "password": "senha123"
}
```

### Criar um Time (ADMIN)
```bash
POST /teams
{
   "name": "Nome do Time"
   "description": "Descrição do Time"
}
```

### Listar Times (ADMIN)
```bash
GET /teams

# lista de times
```

### Adicionar Membros a um Time (ADMIN)
```bash
POST /teams-members
{
   "teamId": "ID do time",
   "userId": "ID do usuário"
}
```

### Criar uma Tarefa (ADMIN)

```bash
POST /teams/tasks
{
  "title": "Nova tarefa",
  "description": "Detalhes da tarefa",
  "priority": "HIGH"
  "assignedTo": "id do membro"
  "teamId": "id do time"
}
```

### Listar Tarefas (ADMIN)

```bash
GET /teams/tasks

# lista todas as tarefas existentes
```

### Listar Apenas as Tarefas do Membro (MEMBER)
```bash
GET /teams/tasks

# lista das tarefas do usuário que solicitou
```

### Atualizar o Status de uma Tarefa (MEMBER)
```bash
PATCH /tasks/:id
{
  "status": "COMPLETED"
}
```

### Atualizar o Status ou Prioridade de uma Tarefa (MEMBER)
```bash
PATCH /tasks/:id
{
  "status": "COMPLETED",
  "priority": "HIGH"
}

# ambos são opcionais
```

## Contribuição

1. **Fork o Repositório**
2. **Crie uma Branch para sua Feature:**
   ```bash
   git checkout -b minha-feature
   ```
3. **Commit suas Alterações:**
   ```bash
   git commit -m 'Adiciona minha feature'
   ```
4. **Envie para o Repositório Remoto:**
   ```bash
   git push origin minha-feature
   ```
5. **Abra um Pull Request**

---

Este documento visa fornecer uma compreensão abrangente do **Task Manager for Teams**. Para dúvidas ou suporte adicional, sinta-se à vontade para abrir uma issue no repositório ou entrar em contato diretamente.

