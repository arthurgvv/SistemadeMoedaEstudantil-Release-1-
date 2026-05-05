# Front-end React e-money

Front-end em React do e-money com:

- Cadastro e login de aluno
- Dashboard do aluno com saldo de moedas
- Produtos/descontos de empresas parceiras
- Minha conta para editar dados pessoais
- Tela de professor para enviar moedas
- Tela de empresa parceira para cadastrar produtos/descontos
- Cadastro de vantagem com nome, descricao, custo em moedas e foto

## Arquitetura

```txt
src/
  components/    Componentes visuais reutilizaveis
  pages/         Telas principais
  hooks/         Estado e fluxos da interface
  services/      Comunicacao com a API Spring Boot
```

## Como executar

Instale as dependencias e rode o Vite:

```bash
cd frontend
npm install
npm run dev
```

Depois acesse `http://localhost:5173`.

Para o login/cadastro funcionar, rode tambem o back-end:

```bash
cd ../backend
mvn spring-boot:run
```

## Endpoints esperados

Por padrao, a tela chama:

- `POST http://localhost:8080/api/auth/register`
- `POST http://localhost:8080/api/auth/login`
- `GET http://localhost:8080/api/auth/me`
- `POST http://localhost:8080/api/auth/companies/register`
- `GET http://localhost:8080/api/students`
- `PUT http://localhost:8080/api/students/me`
- `GET http://localhost:8080/api/students/institutions`
- `GET http://localhost:8080/api/products`
- `POST http://localhost:8080/api/products`
- `POST http://localhost:8080/api/professors/transfer`

## Professor especial

```txt
Email: professor@emoney.com
Senha: Professor123
```
