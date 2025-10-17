# TrocAi — Frontend (instruções rápidas)

## Pré-requisitos
- Node.js (recomendado >= 16)
- npm ou yarn
- Git

## Rodar o frontend localmente
1. Na pasta do projeto frontend:
    - Instale dependências:
      - npm: `npm install`
      - yarn: `yarn`
2. Configure a URL do backend criando um arquivo `.env` na raiz do frontend:
    - Exemplo (`.env`):
      VITE_API_BASE_URL="http://localhost:3000/api"
    - Substitua a URL pela base do seu backend.
3. Inicie o servidor de desenvolvimento:
    - npm: `npm run dev`
    - yarn: `yarn dev`
4. Acesse no navegador (por padrão): `http://localhost:5173` (ou a porta que o Vite exibir).

Para gerar uma versão de produção:
- npm: `npm run build` e `npm run preview`

## Configurar o backend
1. Clone o backend:
    - `git clone https://github.com/felypemolinari/TrocAi.git`
2. Entre na pasta do backend e leia o README do repositório (pode haver instruções específicas):
    - `cd TrocAi`
    - Geralmente: `npm install` ou `yarn` e depois `npm run dev` / `yarn dev` ou `node index.js`
3. Configure variáveis de ambiente do backend conforme indicado no repositório (porta, banco de dados, chaves).
4. Certifique-se de que o backend esteja rodando e acessível no endereço que você colocou em `VITE_API_BASE_URL`.
5. Se o backend usar CORS, permita requisições do endereço do frontend (ex.: `http://localhost:5173`).

Observação: se o backend fornecer Dockerfile / docker-compose, você pode executar via Docker conforme as instruções do repositório.

## Sobre o código (resumo)
- Estrutura típica de um app React + Vite:
  - `src/` — código fonte (componentes, páginas, estilos)
  - `src/services` ou `src/api` — chamadas HTTP para o backend (use a variável `VITE_API_BASE_URL`)
  - `src/components` — componentes reutilizáveis (botões, formulários, etc.)
  - `index.html` e `src/main.jsx` — ponto de entrada e montagem do React
- O frontend consome a API do backend para operações de autenticação, listagem e troca de itens (verificar endpoints no backend).
- Use o arquivo `.env` para alterar apenas a base da API sem tocar no código.

## Dicas rápidas de depuração
- Verifique o console do navegador e a aba Network para chamadas à API.
- Verifique se o backend retorna CORS permitido e se a URL base está correta.
- Reinicie o dev server do frontend se alterar o `.env`.

Para instruções específicas do backend, abra o README do repositório: https://github.com/felypemolinari/TrocAi
