function ProductGrid({ products, onDelete }) {
  return (
    <section className="products-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Empresas parceiras</p>
          <h2>Produtos e descontos</h2>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            {product.imageUrl && <img src={product.imageUrl} alt={product.nome} />}
            <div>
              <span>{product.empresaParceira}</span>
              <h3>{product.nome}</h3>
              <p>{product.descricao}</p>
            </div>
            <div className="product-footer">
              <strong>{product.custoMoedas} moedas</strong>
              {onDelete && (
                <button className="button button-danger" type="button" onClick={() => onDelete(product)}>
                  Remover
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;
