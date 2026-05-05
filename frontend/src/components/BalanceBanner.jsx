function BalanceBanner({ saldo, title = "Saldo disponivel", subtitle = "moedas" }) {
  return (
    <section className="balance-center">
      <span>{title}</span>
      <strong>{Number(saldo || 0).toLocaleString("pt-BR")}</strong>
      <p>{subtitle}</p>
    </section>
  );
}

export default BalanceBanner;
