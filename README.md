# API para Sistema de Controle de Carteira de Ações e Fundos Imobiliários
## Funcionalidades
- **Autenticação OAuth com Google**: Login seguro utilizando o Google OAuth 2.0.
- **Autorização com Bearer Token**: Proteção dos endpoints privados utilizando JWT.
- **Gestão de Ativos**: Cadastro, consulta e atualização de informações sobre ações e fundos.
- **Depósitos e Retiradas**: Registro de movimentações financeiras.
- **Registro de Dividendos**: Armazenamento de pagamentos de dividendos para ativos.
- **Cálculo de Rentabilidade Mensal**: Análise de desempenho da carteira.
- **Histórico de Transações**: Consulta detalhada de todas as operações realizadas.
- **Consumo de API Externa**: Integração com serviço externo para obter preços atualizados dos ativos.

## Tecnologias Utilizadas
- **Node.js**: Plataforma para execução do servidor.
- **Express.js**: Framework para construção de APIs.
- **SQLite**: Banco de dados utilizado.
- **Sequelize**: ORM para interação com o banco de dados.
- **Passport.js**: Biblioteca para autenticação OAuth.
- **JSON Web Token (JWT)**: Sistema de geração e validação de tokens.
- **Dotenv**: Gerenciamento de variáveis de ambiente.
- **API Twelve Data**: Para obter preços em tempo real de ações e fundos.

## Endpoints da API
### Autenticação
- `GET /api/auth/google`  
   Inicia o processo de login pelo Google.
- `GET /api/auth/callback/google`  
   Callback para concluir a autenticação e retornar o token JWT.

### Usuários
- `GET /api/users`  
   Lista informações do usuário autenticado. *(Privado)*

### Ativos
- `GET /api/assets`  
   Lista ativos cadastrados. *(Privado)*
- `POST /api/assets`  
   Cadastra novos ativos. *(Privado)*

### Transações
- `POST /api/transactions/deposit`  
   Registra um depósito. *(Privado)*
- `POST /api/transactions/withdraw`  
   Registra uma retirada. *(Privado)*
- `POST /api/transactions/dividend`  
   Registra o pagamento de dividendos. *(Privado)*

## Integração com API Externa: Twelve Data
A API utiliza o **Twelve Data** para consultar preços atualizados de ativos financeiros.  
**URL Base**: `https://api.twelvedata.com`

### Endpoints Consumidos
1. **Consultar preço atual de um ativo**:
   - **Endpoint**: `/price`
   - **Método**: `GET`
   - **Parâmetros**:
     - `symbol`: Código do ativo (ex.: `AAPL` para Apple).
     - `apikey`: Chave de API fornecida pelo Twelve Data.
   - **Exemplo de Requisição**:
     ```bash
     GET https://api.twelvedata.com/price?symbol=AAPL&apikey=YOUR_API_KEY
     ```
   - **Resposta**:
     ```json
     {
       "symbol": "AAPL",
       "price": "150.25",
       "currency": "USD"
     }
     ```

2. **Consultar histórico de preços**:
   - **Endpoint**: `/time_series`
   - **Método**: `GET`
   - **Parâmetros**:
     - `symbol`: Código do ativo.
     - `interval`: Intervalo entre os dados (ex.: `1day`, `1week`).
     - `apikey`: Chave de API.
   - **Exemplo de Requisição**:
     ```bash
     GET https://api.twelvedata.com/time_series?symbol=AAPL&interval=1day&apikey=YOUR_API_KEY
     ```
   - **Resposta**:
     ```json
     {
       "meta": {
         "symbol": "AAPL",
         "interval": "1day"
       },
       "values": [
         { "datetime": "2024-11-01", "close": "150.25" },
         { "datetime": "2024-10-31", "close": "148.00" }
       ]
     }
     ```

### Configurando a API
1. Crie uma conta no [Twelve Data](https://twelvedata.com/).
2. Gere uma chave de API.
3. Adicione sua chave ao arquivo `.env`:
   ```env
   TWELVE_DATA_API_KEY=sua_chave_de_api
