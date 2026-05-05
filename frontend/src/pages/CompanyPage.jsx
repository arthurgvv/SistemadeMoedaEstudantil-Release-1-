import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import { useProducts } from "../hooks/useProducts.js";
import { productService } from "../services/productService.js";

const emptyProduct = {
  nome: "",
  descricao: "",
  fotoUrl: "",
  fotoNome: "",
  custoMoedas: "",
};

function CompanyPage({ user, onLogout, onToast }) {
  const { products, refresh } = useProducts();
  const [form, setForm] = useState(emptyProduct);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    try {
      await productService.create({
        nome: form.nome,
        descricao: form.descricao,
        fotoUrl: form.fotoUrl,
        custoMoedas: Number(form.custoMoedas),
      });
      setForm(emptyProduct);
      await refresh();
      onToast({ message: "Produto cadastrado com sucesso.", type: "success" });
    } catch (error) {
      onToast({ message: error.message, type: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  function update(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      onToast({ message: "Anexe um arquivo de imagem valido.", type: "error" });
      return;
    }

    const dataUrl = await readFileAsDataUrl(file);
    setForm((current) => ({ ...current, fotoUrl: dataUrl, fotoNome: file.name }));
  }

  async function handleDelete(product) {
    const confirmed = window.confirm(`Remover "${product.nome}"?`);
    if (!confirmed) {
      return;
    }

    try {
      await productService.remove(product.id);
      await refresh();
      onToast({ message: "Produto removido com sucesso.", type: "success" });
    } catch (error) {
      onToast({ message: error.message, type: "error" });
    }
  }

  const companyProducts = products.filter((product) => product.companyId === user.id);

  return (
    <div className="app-shell">
      <Navbar onLogout={onLogout} role="COMPANY" />

      <main className="student-home">
        <section className="company-hero">
          <p className="eyebrow">Empresa parceira</p>
          <h1>{user.nomeFantasia}</h1>
          <span>CNPJ {user.cnpj}</span>
        </section>

        <section className="professor-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Produtos e descontos</p>
              <h2>Cadastrar oferta para alunos</h2>
            </div>
          </div>

          <form className="entity-form professor-form" onSubmit={handleSubmit}>
            <label>
              Nome do produto ou desconto
              <input value={form.nome} onChange={(event) => update("nome", event.target.value)} required />
            </label>
            <label>
              Custo em moedas
              <input type="number" min="1" value={form.custoMoedas} onChange={(event) => update("custoMoedas", event.target.value)} required />
            </label>
            <label className="full-field">
              Foto do produto
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
            {form.fotoUrl && (
              <div className="image-preview full-field">
                <img src={form.fotoUrl} alt="Previa do produto" />
                <span>{form.fotoNome || "Imagem anexada"}</span>
              </div>
            )}
            <label className="full-field">
              Descricao
              <textarea value={form.descricao} onChange={(event) => update("descricao", event.target.value)} required />
            </label>
            <div className="form-actions">
              <button className="button button-primary" type="submit" disabled={submitting}>
                {submitting ? "Cadastrando..." : "Cadastrar produto"}
              </button>
            </div>
          </form>
        </section>

        <ProductGrid products={companyProducts} onDelete={handleDelete} />
      </main>
    </div>
  );
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default CompanyPage;
