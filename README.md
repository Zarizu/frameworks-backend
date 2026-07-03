# Frameworks Backend

Backend de batalhas entre gladiadores, construído em **NestJS** com arquitetura modular, **Prisma ORM** sobre **PostgreSQL**, testes unitários e funcionais com **Jest** e **Supertest**.

## Stack

- [NestJS](https://nestjs.com/) — framework backend, arquitetura modular
- [Prisma ORM](https://www.prisma.io/) (v7) — acesso ao banco de dados
- [PostgreSQL](https://www.postgresql.org/) — banco de dados, rodando via Docker Compose
- [Jest](https://jestjs.io/) — testes unitários e funcionais
- [Supertest](https://github.com/ladjs/supertest) — testes de integração HTTP (e2e)
- [Docker Compose](https://docs.docker.com/compose/) — orquestração dos bancos (dev e teste)

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18+ e npm
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e em execução
  - No Windows, o Docker Desktop depende do **WSL2**. Verifique com `wsl --status` e `wsl -l -v`. Se necessário, instale com `wsl --install`.

## Modelo de dados (ER)

```
USERS (1) ──< (N) GLADIATORS (1) ──< (N) BATTLE_CONTESTANTS >── (N) (1) BATTLES
```

- Um **User** possui vários **Gladiators**.
- Um **Gladiator** pode participar de várias **Battles**, e uma **Battle** pode ter entre **0 e 5 Gladiators**, através da tabela associativa **BattleContestants** (chave composta `battle_id` + `gladiator_id`).
- Cada **Battle** possui um `file_id`, referência usada para buscar (via GET) o histórico de replay — uma lista de JSONs — em um microsserviço externo de storage.

## Setup do projeto

### 1. Clonar o repositório e instalar dependências

```bash
git clone <url-do-repositorio>
cd frameworks-backend
npm install
```

### 2. Subir os bancos de dados via Docker Compose

O projeto usa dois bancos Postgres isolados: um para desenvolvimento e outro para os testes e2e.

```bash
docker compose up -d
docker compose ps
```

Ambos os serviços (`postgres` na porta `5432` e `postgres_test` na porta `5433`) devem aparecer como `Up`.

### 3. Configurar variáveis de ambiente

Crie o arquivo `.env` na raiz do projeto (baseado no `.env.example`, se existir):

```env
DATABASE_URL="postgresql://user:password@localhost:5432/replays_db?schema=public"
STORAGE_SERVICE_URL="http://localhost:4000"
```

Crie também o `.env.test`, usado exclusivamente pelos testes e2e (banco isolado, porta `5433`):

```env
DATABASE_URL="postgresql://user:password@localhost:5433/replays_db_test?schema=public"
```

> Ambos os arquivos `.env*` (exceto `.env.example`) estão no `.gitignore` e não devem ser commitados.

### 4. Gerar o Prisma Client e rodar as migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Isso cria as tabelas `users`, `gladiators`, `battles` e `battle_contestants` no banco de desenvolvimento.

### 5. Rodar a aplicação

```bash
# modo desenvolvimento (watch mode)
npm run start:dev

# modo produção
npm run build
npm run start:prod
```

A aplicação sobe por padrão em `http://localhost:3000`.

## Testes

### Testes unitários (WIP)

Testam services e controllers isoladamente, com o `PrismaService` e o `StorageService` mockados (nenhuma conexão real com banco ou rede).

```bash
npm run test
npm run test:cov   # com relatório de cobertura
```

### Testes funcionais (e2e) (WIP)

Sobem a aplicação Nest completa e testam via HTTP real (Supertest), contra o banco de teste isolado (`replays_db_test`, porta `5433`). O único ponto mockado é o `StorageService` (integração externa).

```bash
# garante que o banco de teste está com o schema atualizado
npm run pretest:e2e

# roda a suíte e2e
npm run test:e2e
```

> Certifique-se de que os containers Docker estão no ar (`docker compose up -d`) antes de rodar os testes e2e.

## Estrutura do projeto

```
src/
├── app.module.ts
├── app.controller.ts
├── main.ts
├── prisma/              # PrismaModule (global) e PrismaService
├── users/               # CRUD de usuários
├── gladiators/          # CRUD de gladiadores
└── battles/             # CRUD de batalhas + participantes (0-5 gladiadores)
test/
└── rest/                # Pasta com exemplos de request (Rest Client VSCode Extension)
prisma/
├── schema.prisma
└── migrations/
docker-compose.yml        # Postgres (dev) + Postgres (test)
prisma.config.ts           # configuração de conexão do Prisma (v7+)
```

## Comandos úteis do Docker

```bash
docker compose up -d              # sobe os bancos em background
docker compose stop               # para os containers (mantém os dados)
docker compose down               # remove os containers (mantém volumes/dados)
docker compose down -v            # remove containers E volumes (apaga os dados)
docker compose logs -f postgres   # acompanha logs do banco de dev em tempo real
```

## Solução de problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| `'docker' não é reconhecido` | Docker Desktop não instalado/PATH não atualizado | Instalar Docker Desktop, reabrir o terminal |
| `datasource property 'url' is no longer supported` | Prisma 7 moveu a config de conexão | Usar `prisma.config.ts` + `PrismaPg` adapter (ver `src/prisma/prisma.service.ts`) |
| `Module has no exported member 'PrismaClient'` | Client desatualizado ou não gerado | Rodar `npx prisma generate` |
| `SASL: client password must be a string` | `.env` não carregado no processo Node | Garantir `import 'dotenv/config'` como primeira linha de `src/main.ts` |

## Licença

Uso interno / educacional.