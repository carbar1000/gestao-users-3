# Mente React 3 - Sistema de Gerenciamento de Usuários

## Descrição Geral
O Mente React 3 é uma aplicação web moderna para gerenciamento de usuários, desenvolvida com tecnologias front-end e back-end de ponta. O sistema permite a criação, edição, visualização e controle de status de usuários, com integração a serviços externos.

## Funcionalidades Principais
- Cadastro de novos usuários com informações detalhadas
- Edição de dados dos usuários existentes
- Controle de status dos usuários (Ativo/Não Ativo)
- Histórico de alterações de status com data/hora
- Integração com API Brevo para envio de e-mails
- Interface responsiva e intuitiva

## Tecnologias e Ferramentas Utilizadas

### Front-end
- React.js (vite)
- React Router DOM (v6)
- Styled Components
- Axios (para requisições HTTP)
- Supabase (autenticação e banco de dados)

### Back-end
- Supabase (banco de dados PostgreSQL)
- RESTful API
- Autenticação JWT

### Ferramentas de Desenvolvimento
- Vite (build tool)
- ESLint (linting)
- Prettier (formatação de código)
- Git (controle de versão)

## Configuração e Execução

### Pré-requisitos
- Node.js (v18 ou superior)
- NPM ou Yarn
- Conta no Supabase

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/carbar1000/mente-react-3.git
   ```
2. Instale as dependências:
   ```bash
   cd mente-react-3
   npm install
   ```
3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione as variáveis necessárias (consulte .env.example)

### Execução
1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
2. Acesse a aplicação no navegador:
   ```
   http://localhost:3000
   ```

## Contribuição
Contribuições são bem-vindas! Siga as diretrizes de contribuição no arquivo CONTRIBUTING.md

## Licença
Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE.md para detalhes
