function Navbar({ activePage, onChangePage, onLogout, role }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img src="/assets/emoney-logo.png" alt="e-money" />
        <span>e-money</span>
      </div>

      <div className="nav-actions">
        {role === "STUDENT" && (
          <>
            <button className={activePage === "products" ? "is-active" : ""} type="button" onClick={() => onChangePage("products")}>
              Produtos
            </button>
            <button className={activePage === "account" ? "is-active" : ""} type="button" onClick={() => onChangePage("account")}>
              Minha conta
            </button>
          </>
        )}
        <button type="button" onClick={onLogout}>Sair</button>
      </div>
    </nav>
  );
}

export default Navbar;
