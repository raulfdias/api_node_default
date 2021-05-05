<h1 align="center"> API NODE DEFAULT </h1>


## Dependências

#### Ambiente

    * NodeJS – v14.15.4
    * NPM - v6.14.10
    * Yarn - v1.22
    * MySQL - v5.7
    * JEST - v26.6.3


## Init

### Rodar comando para instalação da dependencias do package.json

    yarn     ou     npm i

    OBS: Em produção: yarn install --production=true     ou     npm i --production

### Crie o .env para o seu ambiente

    * Produção:           .env.exemple      -->   .env
    * Desenvolvimento:    .env.exemple      -->   .env
    * Teste:              .env.test         -->   .env

    OBS: Em produção o .env deve está o minimo preenchido . Todas as informações, por segurança, devem ser preenchidas nos
    arquivos de configuração, para evitar problema na leitura do .env.

### Subir a versão do banco de dados

    * Subir o schema: yarn sequelize db:create
    * Subir as tabelas: yarn sequelize db:migrate
    * Subir os registros: yarn sequelize db:seed:all

### Rodar a aplicação

    * Comando: yarn run dev

### Arquivos de documentação

    Os arquivos de documentação do projeto com outras informações está localizado em DOC.


## Estrutura principal em uso [/src/]

    * app       -> Fica a codificação do projeto;
    * config    -> Fica os arquivos de configuração do projeto e das bibliotecas/dependencias;
    * DOC       -> Fica a documentação e instruções do projeto;
    * routes    -> Fica todas as rotas da aplicação;
    * storage   -> Fica os arquivos armazenados os arquivos temporarios da aplicação;


## Banco de dados

    As configurações de acesso ao banco fica em "src/config/database.php" e podem está sendo sobreescrito
    pelo .env.

### Conexões

    * MySQL


## API

### Modelo da API

    Implementação efetuada via modelo RESTFul com o express

### Forma de Autenticação e comunicação

    JWT Token

### Token de Comunicação

    Tipo: Bearer Token

### Rotas de comunicação

    Todas as rotas de comunicação estão em DOC/Postman. Basicamente basta importar o .json no Postman.

### Documentação

    Documentação efetuada via swagger.
    Rota: http://127.0.0.1:PORT/api-docs

## TESTES

### Modelo

    TDD

### Estrutura de Testes

    Jest

### Arquivo principal de teste

    src/__tests__/integrations/Integration.test.js
    src/__tests__/unit/Unit.test.js

### Init

    * Subistituir o conteúdo do .env pelo .env.test;
    * Rodar os comandos para criação do schema de teste:
        - yarn sequelize db:create
        - yarn sequelize db:migrate

### Comandos de teste
```
* Teste com todos os arquivos de teste

    * Teste apresentando os console.log:
        - yarn run test

    * Teste apresentando os console.log quando necessário:
        - yarn run test --silent
```
```
* Teste com arquivo de teste especifico

    * Teste apresentando os console.log:
        - yarn run test Integration.test.js

    * Teste apresentando os console.log quando necessário:
        - yarn run test Integration.test.js --silent
```
