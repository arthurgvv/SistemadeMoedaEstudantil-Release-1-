-- ============================================================
-- INSTITUICOES
-- ============================================================
INSERT INTO institutions (id, nome, email, senha, telefone, endereco, identificador_institucional, criado_em)
VALUES
    ('00000001-0000-0000-0000-000000000001', 'PUC Minas',        'contato@pucminas.br',    'PucMinas1',  '(31) 3319-4444', 'Belo Horizonte, MG', '17311498000161', NOW()),
    ('00000001-0000-0000-0000-000000000002', 'UFMG',             'contato@ufmg.br',         'Ufmg12345',  '(31) 3409-4000', 'Belo Horizonte, MG', '17217985000104', NOW()),
    ('00000001-0000-0000-0000-000000000003', 'CEFET-MG',         'contato@cefetmg.br',      'Cefet1234',  '(31) 3319-7000', 'Belo Horizonte, MG', '21220299000121', NOW()),
    ('00000001-0000-0000-0000-000000000004', 'Instituicao Demo', 'contato@instituicao.com', 'Inst1234',   '(31) 3000-0000', 'Belo Horizonte, MG', '00000000000100', NOW())
ON CONFLICT DO NOTHING;

-- ============================================================
-- EMPRESAS
-- ============================================================
INSERT INTO companies (id, nome_fantasia, cnpj, email, senha)
VALUES
    ('00000004-0000-0000-0000-000000000001', 'Empresa Demo', '00000000000101', 'empresa@empresa.com', 'Emp1234')
ON CONFLICT DO NOTHING;

-- ============================================================
-- PROFESSORES (vinculados a instituicoes com cursos definidos)
-- ============================================================
INSERT INTO professors (id, nome, cpf, email, senha, institution_id, saldo_moedas, ultimo_aviso)
VALUES
    ('00000002-0000-0000-0000-000000000000', 'Professor Padrao',     NULL, 'professor@happyCoin.com',   'Professor123', '00000001-0000-0000-0000-000000000001', 1000, ''),
    ('00000002-0000-0000-0000-000000000001', 'Prof. Carlos Mendes',  NULL, 'professor@emoney.com',      'Professor123', '00000001-0000-0000-0000-000000000001', 400,  'Semestre iniciado. Voce distribuiu moedas aos seus alunos.'),
    ('00000002-0000-0000-0000-000000000002', 'Prof. Ana Lima',       NULL, 'professor@professor.com',   'Prof1234',     '00000001-0000-0000-0000-000000000004', 800,  'Semestre iniciado. Voce distribuiu moedas aos seus alunos.'),
    ('00000002-0000-0000-0000-000000000003', 'Prof. Beatriz Santos', NULL, 'beatriz@ufmg.br',           'Prof1234',     '00000001-0000-0000-0000-000000000002', 800,  'Semestre iniciado. Voce distribuiu moedas aos seus alunos.'),
    ('00000002-0000-0000-0000-000000000004', 'Prof. Roberto Alves',  NULL, 'roberto@cefetmg.br',        'Prof1234',     '00000001-0000-0000-0000-000000000003', 800,  'Semestre iniciado. Voce distribuiu moedas aos seus alunos.')
ON CONFLICT DO NOTHING;

-- Cursos dos professores (professor e aluno devem compartilhar instituicao + curso)
DELETE FROM professor_cursos
WHERE professor_id IN (
    '00000002-0000-0000-0000-000000000000',
    '00000002-0000-0000-0000-000000000001',
    '00000002-0000-0000-0000-000000000002',
    '00000002-0000-0000-0000-000000000003',
    '00000002-0000-0000-0000-000000000004'
);

INSERT INTO professor_cursos (professor_id, curso)
VALUES
    ('00000002-0000-0000-0000-000000000000', 'Engenharia de Software'),
    ('00000002-0000-0000-0000-000000000001', 'Engenharia de Software'),
    ('00000002-0000-0000-0000-000000000001', 'Ciencia da Computacao'),
    ('00000002-0000-0000-0000-000000000002', 'Engenharia de Software'),
    ('00000002-0000-0000-0000-000000000002', 'Sistemas de Informacao'),
    ('00000002-0000-0000-0000-000000000003', 'Medicina'),
    ('00000002-0000-0000-0000-000000000003', 'Psicologia'),
    ('00000002-0000-0000-0000-000000000004', 'Engenharia Civil'),
    ('00000002-0000-0000-0000-000000000004', 'Arquitetura e Urbanismo');

-- ============================================================
-- ALUNOS (mesma instituicao e curso do professor que os orienta)
-- ============================================================
INSERT INTO students (id, nome, email, cpf, rg, endereco, institution_id, instituicao, curso, senha, saldo_moedas, ultimo_aviso, criado_em)
VALUES
    -- PUC Minas / Engenharia de Software  →  Prof. Carlos Mendes
    ('00000005-0000-0000-0000-000000000001', 'Aluno Demo',      'aluno@aluno.com',   '00000000001', '000000001', 'Belo Horizonte, MG', '00000001-0000-0000-0000-000000000001', 'PUC Minas',        'Engenharia de Software', 'Aluno1234', 120, 'Voce gastou 80 moedas no resgate de Descontao Boca do Forno.',     NOW()),
    ('00000005-0000-0000-0000-000000000002', 'Maria Oliveira',  'maria@aluno.com',   '00000000002', '000000002', 'Belo Horizonte, MG', '00000001-0000-0000-0000-000000000001', 'PUC Minas',        'Engenharia de Software', 'Aluno1234',  50, 'Voce gastou 150 moedas no resgate de Programacao Utilizando IA.',  NOW()),
    -- PUC Minas / Ciencia da Computacao   →  Prof. Carlos Mendes
    ('00000005-0000-0000-0000-000000000003', 'Joao Santos',     'joao@aluno.com',    '00000000003', '000000003', 'Belo Horizonte, MG', '00000001-0000-0000-0000-000000000001', 'PUC Minas',        'Ciencia da Computacao',  'Aluno1234',  40, 'Voce gastou 160 moedas no resgate de Fluencia em Dados e IA.',     NOW()),
    -- Instituicao Demo / Sistemas de Informacao  →  Prof. Ana Lima
    ('00000005-0000-0000-0000-000000000004', 'Ana Costa',       'ana@aluno.com',     '00000000004', '000000004', 'Belo Horizonte, MG', '00000001-0000-0000-0000-000000000004', 'Instituicao Demo', 'Sistemas de Informacao', 'Aluno1234', 120, 'Voce gastou 80 moedas no resgate de Descontao Boca do Forno.',     NOW()),
    -- UFMG / Medicina  →  Prof. Beatriz Santos
    ('00000005-0000-0000-0000-000000000005', 'Pedro Lima',      'pedro@aluno.com',   '00000000005', '000000005', 'Belo Horizonte, MG', '00000001-0000-0000-0000-000000000002', 'UFMG',             'Medicina',               'Aluno1234',  50, 'Voce gastou 150 moedas no resgate de Programacao Utilizando IA.',  NOW()),
    -- CEFET-MG / Engenharia Civil  →  Prof. Roberto Alves
    ('00000005-0000-0000-0000-000000000006', 'Lucia Ferreira',  'lucia@aluno.com',   '00000000006', '000000006', 'Belo Horizonte, MG', '00000001-0000-0000-0000-000000000003', 'CEFET-MG',         'Engenharia Civil',       'Aluno1234', 200, '',                                                                  NOW())
ON CONFLICT DO NOTHING;

-- ============================================================
-- PRODUTOS (alguns vinculados a Empresa Demo)
-- ============================================================
DELETE FROM products
WHERE id IN (
    '00000003-0000-0000-0000-000000000007',
    '00000003-0000-0000-0000-000000000008',
    '00000003-0000-0000-0000-000000000009',
    '00000003-0000-0000-0000-000000000010'
);

INSERT INTO products (id, nome, empresa_parceira, descricao, custo_moedas, image_url, company_id)
VALUES
    ('00000003-0000-0000-0000-000000000001', 'Fundamentos da Arquitetura de Software', 'Novatec Editora',  'Uma abordagem moderna para engenharia e arquitetura de software.',              180, '/assets/products/fundamentos-arquitetura-software.jpg', NULL),
    ('00000003-0000-0000-0000-000000000002', 'Criando Microservicos',                  'Novatec Editora',  'Projetando sistemas com componentes menores e mais especializados.',            170, '/assets/products/criando-microservicos.jpg',            NULL),
    ('00000003-0000-0000-0000-000000000003', 'Programacao Utilizando IA',              'Empresa Demo',     'Otimizando planejamento, programacao, testes e implantacao com IA.',            150, '/assets/products/programacao-utilizando-ia.jpg',        '00000004-0000-0000-0000-000000000001'),
    ('00000003-0000-0000-0000-000000000004', 'Fluencia em Dados e IA',                 'Empresa Demo',     'Estrategias e praticas para trabalhar e viver em um mundo dirigido por dados.', 160, '/assets/products/fluencia-dados-ia.png',                '00000004-0000-0000-0000-000000000001'),
    ('00000003-0000-0000-0000-000000000005', 'Descontao Boca do Forno',                'Empresa Demo',     'Voucher especial para usar em doces e salgados da Boca do Forno.',              80,  '/assets/products/boca-forno.png',                       '00000004-0000-0000-0000-000000000001'),
    ('00000003-0000-0000-0000-000000000006', 'Desconto de Mensalidade',                'Empresa Demo',     'Credito simbolico para abatimento em mensalidade academica.',                    500, '/assets/products/mensalidade.svg',                      '00000004-0000-0000-0000-000000000001')
ON CONFLICT (id) DO UPDATE SET
    nome             = EXCLUDED.nome,
    empresa_parceira = EXCLUDED.empresa_parceira,
    descricao        = EXCLUDED.descricao,
    custo_moedas     = EXCLUDED.custo_moedas,
    image_url        = EXCLUDED.image_url,
    company_id       = EXCLUDED.company_id;

-- ============================================================
-- TRANSFERENCIAS DE MOEDAS (professores → alunos)
-- ============================================================
INSERT INTO coin_transfers (id, professor_id, student_id, quantidade, motivo, criado_em)
VALUES
    -- Prof. Carlos Mendes distribuiu 600 moedas (balance: 1000 - 600 = 400)
    ('aaaaaaaa-0001-0000-0000-000000000001', '00000002-0000-0000-0000-000000000001', '00000005-0000-0000-0000-000000000001', 200, 'Excelente desempenho no projeto final de disciplina.',           NOW() - INTERVAL '10 days'),
    ('aaaaaaaa-0001-0000-0000-000000000002', '00000002-0000-0000-0000-000000000001', '00000005-0000-0000-0000-000000000002', 200, 'Trabalho de conclusao de semestre entregue com excelencia.',     NOW() - INTERVAL '8 days'),
    ('aaaaaaaa-0001-0000-0000-000000000003', '00000002-0000-0000-0000-000000000001', '00000005-0000-0000-0000-000000000003', 200, 'Atividade de laboratorio com nota maxima e apresentacao impecavel.', NOW() - INTERVAL '6 days'),
    -- Prof. Ana Lima distribuiu 200 moedas (balance: 1000 - 200 = 800)
    ('aaaaaaaa-0001-0000-0000-000000000004', '00000002-0000-0000-0000-000000000002', '00000005-0000-0000-0000-000000000004', 200, 'Melhor aluna do semestre em Sistemas de Informacao.',            NOW() - INTERVAL '7 days'),
    -- Prof. Beatriz Santos distribuiu 200 moedas (balance: 1000 - 200 = 800)
    ('aaaaaaaa-0001-0000-0000-000000000005', '00000002-0000-0000-0000-000000000003', '00000005-0000-0000-0000-000000000005', 200, 'Pesquisa clinica com resultado excepcional apresentado em sala.', NOW() - INTERVAL '5 days'),
    -- Prof. Roberto Alves distribuiu 200 moedas (balance: 1000 - 200 = 800)
    ('aaaaaaaa-0001-0000-0000-000000000006', '00000002-0000-0000-0000-000000000004', '00000005-0000-0000-0000-000000000006', 200, 'Projeto arquitetonico aprovado com louvor pela banca avaliadora.', NOW() - INTERVAL '4 days')
ON CONFLICT DO NOTHING;

-- ============================================================
-- RESGATES DE PRODUTOS (alunos → produtos da Empresa Demo)
-- saldo dos alunos ja reflete as compras acima
-- ============================================================
INSERT INTO product_purchases (id, product_id, company_id, student_id, product_name, student_name, student_email, custo_moedas, criado_em)
VALUES
    -- Aluno Demo comprou Boca do Forno (80): 200 - 80 = 120 restantes
    ('bbbbbbbb-0001-0000-0000-000000000001',
     '00000003-0000-0000-0000-000000000005',
     '00000004-0000-0000-0000-000000000001',
     '00000005-0000-0000-0000-000000000001',
     'Descontao Boca do Forno', 'Aluno Demo', 'aluno@aluno.com', 80,
     NOW() - INTERVAL '9 days'),
    -- Maria Oliveira comprou Programacao IA (150): 200 - 150 = 50 restantes
    ('bbbbbbbb-0001-0000-0000-000000000002',
     '00000003-0000-0000-0000-000000000003',
     '00000004-0000-0000-0000-000000000001',
     '00000005-0000-0000-0000-000000000002',
     'Programacao Utilizando IA', 'Maria Oliveira', 'maria@aluno.com', 150,
     NOW() - INTERVAL '7 days'),
    -- Joao Santos comprou Fluencia em Dados (160): 200 - 160 = 40 restantes
    ('bbbbbbbb-0001-0000-0000-000000000003',
     '00000003-0000-0000-0000-000000000004',
     '00000004-0000-0000-0000-000000000001',
     '00000005-0000-0000-0000-000000000003',
     'Fluencia em Dados e IA', 'Joao Santos', 'joao@aluno.com', 160,
     NOW() - INTERVAL '5 days'),
    -- Ana Costa comprou Boca do Forno (80): 200 - 80 = 120 restantes
    ('bbbbbbbb-0001-0000-0000-000000000004',
     '00000003-0000-0000-0000-000000000005',
     '00000004-0000-0000-0000-000000000001',
     '00000005-0000-0000-0000-000000000004',
     'Descontao Boca do Forno', 'Ana Costa', 'ana@aluno.com', 80,
     NOW() - INTERVAL '6 days'),
    -- Pedro Lima comprou Programacao IA (150): 200 - 150 = 50 restantes
    ('bbbbbbbb-0001-0000-0000-000000000005',
     '00000003-0000-0000-0000-000000000003',
     '00000004-0000-0000-0000-000000000001',
     '00000005-0000-0000-0000-000000000005',
     'Programacao Utilizando IA', 'Pedro Lima', 'pedro@aluno.com', 150,
     NOW() - INTERVAL '3 days')
ON CONFLICT DO NOTHING;
