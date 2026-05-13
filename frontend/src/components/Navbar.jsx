function Navbar({ activePage, onChangePage, onLogout, role, tabs }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img src="/assets/happycoin-logo.png" alt="Happy Coin" />
        <span className="brand-wordmark" aria-label="HappyCoin">
          <span className="brand-happy">Happy</span><span className="brand-coin">Coin</span>
        </span>
      </div>

      <div className="nav-actions">
        {tabs
          ? tabs.map((tab) => (
              <button
                key={tab.key}
                className={activePage === tab.key ? "is-active" : ""}
                type="button"
                onClick={() => onChangePage(tab.key)}
              >
                {tab.label}
              </button>
            ))
          : role === "STUDENT" && (
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
