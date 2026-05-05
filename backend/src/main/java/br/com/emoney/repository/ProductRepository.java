package br.com.emoney.repository;

import br.com.emoney.model.Product;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class ProductRepository {
    private final List<Product> products = new ArrayList<>();

    public ProductRepository() {
        products.add(new Product("Data Science do Zero", "Livraria Tech Minas", "Livro introdutorio para ciencia de dados.", 120, "/assets/products/data-science.svg"));
        products.add(new Product("Python para Analise de Dados", "Code Books", "Guia pratico para manipulacao e visualizacao de dados.", 160, "/assets/products/python-dados.svg"));
        products.add(new Product("Engenharia de Software Moderna", "PUC Store", "Livro sobre requisitos, arquitetura, testes e entrega.", 140, "/assets/products/engenharia-software.svg"));
        products.add(new Product("Clean Code", "Livraria Parceira", "Boas praticas para escrever codigo limpo e sustentavel.", 180, "/assets/products/clean-code.svg"));
        products.add(new Product("Sistemas Distribuidos", "BookLab", "Fundamentos para sistemas escalaveis e resilientes.", 200, "/assets/products/sistemas-distribuidos.svg"));
        products.add(new Product("Banco de Dados: Projeto e Pratica", "Data Books", "Modelagem, SQL e conceitos essenciais de bancos de dados.", 150, "/assets/products/banco-dados.svg"));
        products.add(new Product("Voucher Boca do Forno", "Boca do Forno", "Desconto em lanche universitario no restaurante parceiro.", 80, "/assets/products/boca-forno.svg"));
        products.add(new Product("Voucher refeicao Trailer", "O Trailer", "Credito para refeicao rapida dentro da universidade.", 70, "/assets/products/trailer.svg"));
        products.add(new Product("Desconto de mensalidade", "PUC Parceira", "Credito simbolico para abatimento em mensalidade academica.", 500, "/assets/products/mensalidade.svg"));
        products.add(new Product("Kit do D.A. de Ciencia da Computacao", "D.A. da Ciencia da Computacao", "Combo especial com caneca, adesivos e camiseta do curso.", 999, "/assets/products/kit-da-computacao.svg"));
    }

    public List<Product> findAll() {
        return products;
    }

    public Product save(Product product) {
        products.add(product);
        return product;
    }

    public Optional<Product> findById(UUID id) {
        return products.stream()
                .filter(product -> product.getId().equals(id))
                .findFirst();
    }

    public void delete(Product product) {
        products.remove(product);
    }
}
