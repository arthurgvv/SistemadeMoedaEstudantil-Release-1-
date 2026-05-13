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

DELETE FROM products
WHERE id IN (
    '00000003-0000-0000-0000-000000000007',
    '00000003-0000-0000-0000-000000000008',
    '00000003-0000-0000-0000-000000000009',
    '00000003-0000-0000-0000-000000000010'
);

INSERT INTO products (id, nome, empresa_parceira, descricao, custo_moedas, image_url, company_id)
VALUES
    ('00000003-0000-0000-0000-000000000001', 'Fundamentos da Arquitetura de Software', 'Novatec Editora', 'Uma abordagem moderna para engenharia e arquitetura de software.', 180, '/assets/products/fundamentos-arquitetura-software.jpg', NULL),
    ('00000003-0000-0000-0000-000000000002', 'Criando Microservicos', 'Novatec Editora', 'Projetando sistemas com componentes menores e mais especializados.', 170, '/assets/products/criando-microservicos.jpg', NULL),
    ('00000003-0000-0000-0000-000000000003', 'Programacao Utilizando IA', 'Novatec Editora', 'Otimizando planejamento, programacao, testes e implantacao com IA.', 150, '/assets/products/programacao-utilizando-ia.jpg', NULL),
    ('00000003-0000-0000-0000-000000000004', 'Fluencia em Dados e IA', 'Alta Books', 'Estrategias e praticas para trabalhar e viver em um mundo dirigido por dados.', 160, '/assets/products/fluencia-dados-ia.png', NULL),
    ('00000003-0000-0000-0000-000000000005', 'Descontao Boca do Forno', 'Boca do Forno', 'Voucher especial para usar em doces e salgados da Boca do Forno.', 80, '/assets/products/boca-forno.png', NULL),
    ('00000003-0000-0000-0000-000000000006', 'Desconto de Mensalidade', 'PUC Parceira', 'Credito simbolico para abatimento em mensalidade academica.', 500, '/assets/products/mensalidade.svg', NULL)
ON CONFLICT (id) DO UPDATE SET
    nome = EXCLUDED.nome,
    empresa_parceira = EXCLUDED.empresa_parceira,
    descricao = EXCLUDED.descricao,
    custo_moedas = EXCLUDED.custo_moedas,
    image_url = EXCLUDED.image_url,
    company_id = EXCLUDED.company_id;
