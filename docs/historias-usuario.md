# Histórias de Usuário — Sistema de Moeda Estudantil (Release 1)

> **Projeto:** Sistema de Moeda Estudantil  
> **Sprint:** 01  
> **Disciplina:** Laboratório de Desenvolvimento de Software — PUC Minas  
> **Professor:** João Paulo Carneiro Aramuni

-----

## Atores

|Ator                |Descrição                                                  |
|--------------------|-----------------------------------------------------------|
|**Aluno**           |Estudante cadastrado que recebe e troca moedas             |
|**Professor**       |Docente pré-cadastrado que distribui moedas aos alunos     |
|**Empresa Parceira**|Empresa cadastrada que oferece vantagens em troca de moedas|
|**Sistema**         |Componente responsável por notificações e geração de cupons|

-----

## US01 — Cadastro de Aluno

**Como** aluno,  
**quero** me cadastrar no sistema informando meus dados pessoais e minha instituição de ensino,  
**para que** eu possa participar do programa de mérito estudantil.

### Critérios de Aceitação

- O sistema deve solicitar: nome, email, CPF, RG, endereço, instituição de ensino e curso.
- As instituições participantes devem estar pré-cadastradas e disponíveis para seleção.
- O sistema deve impedir cadastro com CPF ou email já existente.
- Após o cadastro, o aluno deve conseguir fazer login com email e senha.

-----

## US02 — Login de Aluno

**Como** aluno cadastrado,  
**quero** fazer login no sistema com meu email e senha,  
**para que** eu possa acessar minhas funcionalidades de forma segura.

### Critérios de Aceitação

- O sistema deve validar email e senha.
- Credenciais inválidas devem exibir mensagem de erro.
- O acesso deve ser negado para usuários não cadastrados.

-----

## US03 — Login de Professor

**Como** professor pré-cadastrado,  
**quero** fazer login no sistema com meu email e senha,  
**para que** eu possa acessar minhas funcionalidades de distribuição de moedas.

### Critérios de Aceitação

- O professor não realiza cadastro — ele já está pré-cadastrado pela instituição.
- O sistema deve validar email e senha do professor.
- Credenciais inválidas devem exibir mensagem de erro.

-----

## US04 — Cadastro de Empresa Parceira

**Como** empresa parceira,  
**quero** me cadastrar no sistema,  
**para que** eu possa oferecer vantagens aos alunos em troca de moedas.

### Critérios de Aceitação

- O sistema deve solicitar dados da empresa e credenciais de acesso (login e senha).
- Após o cadastro, a empresa pode adicionar vantagens ao sistema.

-----

## US05 — Login de Empresa Parceira

**Como** empresa parceira cadastrada,  
**quero** fazer login no sistema,  
**para que** eu possa gerenciar minhas vantagens e acompanhar os resgates.

### Critérios de Aceitação

- O sistema deve validar login e senha da empresa.
- Credenciais inválidas devem exibir mensagem de erro.

-----

## US06 — Envio de Moedas pelo Professor

**Como** professor,  
**quero** enviar moedas a um aluno indicando o motivo do reconhecimento,  
**para que** eu possa recompensar bom comportamento, participação e desempenho.

### Critérios de Aceitação

- O professor deve ter saldo suficiente para realizar o envio.
- O professor deve selecionar o aluno destinatário.
- O professor deve informar uma mensagem obrigatória de reconhecimento.
- O saldo do professor deve ser debitado após o envio.
- O saldo do aluno deve ser creditado após o envio.
- O aluno deve ser notificado por email ao receber as moedas.
- A transação deve ser registrada no extrato de ambos.

-----

## US07 — Recarga Semestral de Moedas do Professor

**Como** professor,  
**quero** receber automaticamente 1.000 moedas a cada semestre,  
**para que** eu possa continuar reconhecendo meus alunos.

### Critérios de Aceitação

- O sistema deve adicionar 1.000 moedas ao saldo do professor a cada semestre.
- O saldo é acumulativo — moedas não distribuídas não são perdidas.
- A recarga deve ocorrer automaticamente, sem ação manual do professor.

-----

## US08 — Consulta de Extrato pelo Professor

**Como** professor,  
**quero** consultar o extrato da minha conta,  
**para que** eu possa visualizar meu saldo atual e o histórico de envios de moedas.

### Critérios de Aceitação

- O extrato deve exibir o saldo atual de moedas.
- O extrato deve listar todas as transações de envio realizadas.
- Cada transação deve exibir: aluno destinatário, valor enviado, motivo e data.

-----

## US09 — Consulta de Extrato pelo Aluno

**Como** aluno,  
**quero** consultar o extrato da minha conta,  
**para que** eu possa visualizar meu saldo atual e o histórico de recebimentos e trocas.

### Critérios de Aceitação

- O extrato deve exibir o saldo atual de moedas.
- O extrato deve listar todas as transações: recebimentos de professores e resgates de vantagens.
- Cada transação deve exibir: tipo (recebimento/resgate), valor, origem/destino e data.

-----

## US10 — Cadastro de Vantagem pela Empresa Parceira

**Como** empresa parceira,  
**quero** cadastrar vantagens no sistema com descrição, foto e custo em moedas,  
**para que** os alunos possam visualizá-las e resgatá-las.

### Critérios de Aceitação

- A empresa deve informar: nome da vantagem, descrição, foto do produto e custo em moedas.
- A vantagem deve ficar disponível para os alunos após o cadastro.
- O custo deve ser um valor positivo em moedas.

-----

## US11 — Resgate de Vantagem pelo Aluno

**Como** aluno,  
**quero** resgatar uma vantagem disponível no sistema usando minhas moedas,  
**para que** eu possa usufruir dos benefícios oferecidos pelas empresas parceiras.

### Critérios de Aceitação

- O aluno deve ter saldo suficiente para resgatar a vantagem escolhida.
- O valor da vantagem deve ser descontado do saldo do aluno.
- Um email com cupom e código único deve ser enviado ao aluno.
- Um email com o mesmo código deve ser enviado à empresa parceira.
- A transação deve ser registrada no extrato do aluno.

-----

## US12 — Notificação de Recebimento de Moedas

**Como** aluno,  
**quero** ser notificado por email ao receber moedas de um professor,  
**para que** eu saiba que fui reconhecido e possa acompanhar meu saldo.

### Critérios de Aceitação

- O email deve ser enviado automaticamente pelo sistema após o crédito das moedas.
- O email deve conter: nome do professor, valor recebido e mensagem de reconhecimento.

-----

## US13 — Notificação de Resgate para Empresa Parceira

**Como** empresa parceira,  
**quero** ser notificada por email quando um aluno resgatar uma das minhas vantagens,  
**para que** eu possa confirmar a troca presencialmente.

### Critérios de Aceitação

- O email deve ser enviado automaticamente pelo sistema após o resgate.
- O email deve conter: nome do aluno, vantagem resgatada e código de verificação único.
- O mesmo código deve estar presente no email enviado ao aluno.

-----

## Resumo das Histórias

|ID  |Ator     |Resumo                                     |
|----|---------|-------------------------------------------|
|US01|Aluno    |Cadastro no sistema                        |
|US02|Aluno    |Login                                      |
|US03|Professor|Login                                      |
|US04|Empresa  |Cadastro no sistema                        |
|US05|Empresa  |Login                                      |
|US06|Professor|Envio de moedas para aluno                 |
|US07|Professor|Recarga semestral automática               |
|US08|Professor|Consulta de extrato                        |
|US09|Aluno    |Consulta de extrato                        |
|US10|Empresa  |Cadastro de vantagem                       |
|US11|Aluno    |Resgate de vantagem                        |
|US12|Sistema  |Notificação de recebimento (email ao aluno)|
|US13|Sistema  |Notificação de resgate (email à empresa)   |
