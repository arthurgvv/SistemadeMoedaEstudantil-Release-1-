import { useState } from "react";
import AccountForm from "../components/AccountForm.jsx";
import BalanceBanner from "../components/BalanceBanner.jsx";
import Navbar from "../components/Navbar.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import { useProducts } from "../hooks/useProducts.js";

function StudentPage({ user, onLogout, onUpdateUser, onToast }) {
  const [activePage, setActivePage] = useState("products");
  const { products } = useProducts();

  return (
    <div className="app-shell">
      <Navbar activePage={activePage} onChangePage={setActivePage} onLogout={onLogout} role="STUDENT" />

      <main className="student-home">
        <BalanceBanner saldo={user.saldoMoedas} />

        {activePage === "products" ? (
          <ProductGrid products={products} />
        ) : (
          <AccountForm user={user} onSave={onUpdateUser} onToast={onToast} />
        )}
      </main>
    </div>
  );
}

export default StudentPage;
