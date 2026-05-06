INSERT INTO institutions (id, nome, email, senha, telefone, endereco, identificador_institucional, criado_em)
VALUES
    ('00000001-0000-0000-0000-000000000001', 'PUC Minas', 'contato@pucminas.br', 'PucMinas1', '(31) 3319-4444', 'Belo Horizonte, MG', '17311498000161', NOW()),
    ('00000001-0000-0000-0000-000000000002', 'UFMG', 'contato@ufmg.br', 'Ufmg12345', '(31) 3409-4000', 'Belo Horizonte, MG', '17217985000104', NOW()),
    ('00000001-0000-0000-0000-000000000003', 'CEFET-MG', 'contato@cefetmg.br', 'Cefet1234', '(31) 3319-7000', 'Belo Horizonte, MG', '21220299000121', NOW())
ON CONFLICT DO NOTHING;

INSERT INTO professors (id, nome, cpf, email, senha, institution_id, saldo_moedas, ultimo_aviso)
VALUES
    ('00000002-0000-0000-0000-000000000001', 'Professor Padrao', NULL, 'professor@emoney.com', 'Professor123', NULL, 1000, '')
ON CONFLICT DO NOTHING;

INSERT INTO products (id, nome, empresa_parceira, descricao, custo_moedas, image_url, company_id)
VALUES
    ('00000003-0000-0000-0000-000000000001', 'Data Science do Zero', 'Livraria Tech Minas', 'Livro introdutorio para ciencia de dados.', 120, '/assets/products/data-science.svg', NULL),
    ('00000003-0000-0000-0000-000000000002', 'Python para Analise de Dados', 'Code Books', 'Guia pratico para manipulacao e visualizacao de dados.', 160, '/assets/products/python-dados.svg', NULL),
    ('00000003-0000-0000-0000-000000000003', 'Engenharia de Software Moderna', 'PUC Store', 'Livro sobre requisitos, arquitetura, testes e entrega.', 140, '/assets/products/engenharia-software.svg', NULL),
    ('00000003-0000-0000-0000-000000000004', 'Clean Code', 'Livraria Parceira', 'Boas praticas para escrever codigo limpo e sustentavel.', 180, '/assets/products/clean-code.svg', NULL),
    ('00000003-0000-0000-0000-000000000005', 'Sistemas Distribuidos', 'BookLab', 'Fundamentos para sistemas escalaveis e resilientes.', 200, '/assets/products/sistemas-distribuidos.svg', NULL),
    ('00000003-0000-0000-0000-000000000006', 'Banco de Dados: Projeto e Pratica', 'Data Books', 'Modelagem, SQL e conceitos essenciais de bancos de dados.', 150, '/assets/products/banco-dados.svg', NULL),
    ('00000003-0000-0000-0000-000000000007', 'Voucher Boca do Forno', 'Boca do Forno', 'Desconto em lanche universitario no restaurante parceiro.', 80, '/assets/products/boca-forno.svg', NULL),
    ('00000003-0000-0000-0000-000000000008', 'Voucher refeicao Trailer', 'O Trailer', 'Credito para refeicao rapida dentro da universidade.', 70, '/assets/products/trailer.svg', NULL),
    ('00000003-0000-0000-0000-000000000009', 'Desconto de mensalidade', 'PUC Parceira', 'Credito simbolico para abatimento em mensalidade academica.', 500, '/assets/products/mensalidade.svg', NULL),
    ('00000003-0000-0000-0000-000000000010', 'Kit do D.A. de Ciencia da Computacao', 'D.A. da Ciencia da Computacao', 'Combo especial com caneca, adesivos e camiseta do curso.', 999, '/assets/products/kit-da-computacao.svg', NULL)
ON CONFLICT DO NOTHING;
