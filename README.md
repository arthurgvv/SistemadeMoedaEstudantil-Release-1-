# e-money

Sistema de Moeda Estudantil com front-end React e back-end Java + Spring Boot.

## Front-end React

Estrutura:

- `src/components/`
- `src/pages/`
- `src/hooks/`
- `src/services/`

Para executar:

```bash
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Back-end

Back-end em Java + Spring Boot com MVC:

- `controller`
- `service`
- `model`
- `repository`

Para executar:

```bash
cd backend
mvn spring-boot:run
```

API padrao em `http://localhost:8080/api`.

## Login especial do professor

```txt
Email: professor@emoney.com
Senha: Professor123
```

O professor inicia com 1.000 moedas e pode enviar moedas para alunos cadastrados informando quantidade e motivo obrigatorio.

## Empresa parceira

Na tela inicial, use a aba `Empresa` para cadastrar uma empresa parceira. O cadastro exige CNPJ com exatamente 14 digitos, email e senha com letras e numeros.

Depois do login, a empresa acessa um painel para cadastrar produtos ou descontos que aparecem na vitrine dos alunos.
Cada vantagem exige nome, descricao, custo em moedas e pode receber uma URL de foto do produto.

Endpoints padrao:

- `http://localhost:8080/api/alunos`
- `http://localhost:8080/api/empresas-parceiras`
