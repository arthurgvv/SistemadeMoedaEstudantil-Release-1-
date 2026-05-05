function BalanceBanner({ saldo }) {
  return (
    <section className="balance-center">
      <span>Saldo disponivel</span>
      <strong>{Number(saldo || 0).toLocaleString("pt-BR")}</strong>
      <p>moedas</p>
    </section>
  );
}

export default BalanceBanner;
