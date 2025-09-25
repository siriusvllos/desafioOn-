# Desafio Onfly ✈️

Este repositório contém a minha submissão para o desafio do Recruta Onfly. O código-fonte consiste em um microsserviço de backend em Node.js + TypeScript, em uma instância da ferramenta de automação **n8n** com a definição de um nó personalizado, e na infraestrutura necessária para executá-lo, orquestrado via Docker Compose.

---

## Estrutura

A estrutura desse projeto é organizada da seguinte forma:

| Diretório/Arquivo | Descrição |
| :--- | :--- |
| **`n8n/`** | Contém arquivos de configuração e dados da instância n8n. |
| **`n8n/custom/`** | Diretório para o código-fonte do nó personalizado do n8n (`Random.node.ts`). |
| **`docker-compose.yml`** | Define e orquestra os serviços Docker necessários (servidor, n8n, banco de dados, etc.). |
| **`package.json`** | Lista as dependências do Node.js e os scripts de automação. |
| **`tsconfig.json`** | Configurações do compilador TypeScript. |

---

## Pré-requisitos

Para rodar o projeto localmente, você precisa ter instalado:

1.  **Node.js e npm** (vers. 22/LTS)
2.  **Docker** e **Docker Compose**

---

## Instalação e Configuração

Passo-a-passo para preparar o ambiente e instalar as dependências:

### 1. Clonar o Repositório

```bash
git clone [https://github.com/siriusvllos/desafioTecnico.git](https://github.com/siriusvllos/desafioTecnico.git)
cd desafioTecnico
```

### 2. Instalar as Dependências Node.js

Todas as dependências de produção e desenvolvimento do Node.js são instaladas através do npm.
```bash
npm install
```

### 3. Compilar o Código

Este passo é necessário antes de subir o Docker, porque o código TypeScript precisa ser compilado para JavaScript:
```bash
npm run build
```

### 4. Iniciar os Serviços com Docker Compose

Use o script definido no package.json para subir os contêineres em segundo plano (-d):
```bash
npm run docker:up
```
_# ou diretamente: docker-compose up -d_

### 5. Acessar a Aplicação
Após alguns instantes a instância n8n estará rodando e acessível em: [http://localhost:5678](url). 
