import { useEffect, useState } from "react";
import AccountForm from "../components/AccountForm.jsx";
import BalanceBanner from "../components/BalanceBanner.jsx";
import Navbar from "../components/Navbar.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import { useProducts } from "../hooks/useProducts.js";
import { productService } from "../services/productService.js";

function StudentPage({ user, onLogout, onUpdateUser, onToast }) {
  const [activePage, setActivePage] = useState("products");
  const [purchasingId, setPurchasingId] = useState(null);
  const { products } = useProducts();

  useEffect(() => {
    if (user.ultimoAviso) {
      onToast({ message: user.ultimoAviso, type: "success" });
    }
  }, [user.ultimoAviso, onToast]);

  async function handlePurchase(product) {
    if (user.saldoMoedas < product.custoMoedas) {
      onToast({ message: "Saldo insuficiente para comprar este produto.", type: "error" });
      return;
    }

    setPurchasingId(product.id);
    try {
      const nextUser = await productService.purchase(product.id);
      onUpdateUser(nextUser);
      onToast({ message: "Compra realizada com sucesso.", type: "success" });
    } catch (error) {
      onToast({ message: error.message, type: "error" });
    } finally {
      setPurchasingId(null);
    }
  }

  return (
    <div className="app-shell">
      <Navbar activePage={activePage} onChangePage={setActivePage} onLogout={onLogout} role="STUDENT" />

      <main className="student-home">
        <BalanceBanner saldo={user.saldoMoedas} />

        {activePage === "products" ? (
          <ProductGrid products={products} walletBalance={user.saldoMoedas} purchasingId={purchasingId} onPurchase={handlePurchase} />
        ) : (
          <AccountForm user={user} onSave={onUpdateUser} onToast={onToast} />
        )}
      </main>
    </div>
  );
}

export default StudentPage;
