function Menu({ mudarPagina }) {
  return (
    <div className="menu">
      <button onClick={() => mudarPagina("inicio")}>
        Início
      </button>

      <button onClick={() => mudarPagina("equipamentos")}>
        Equipamentos
      </button>

      <button onClick={() => mudarPagina("cidades")}>
        Cidades
      </button>

      <button onClick={() => mudarPagina("funcionarios")}>
        Funcionários
      </button>

      <button onClick={() => mudarPagina("servicos")}>
        Serviços
      </button>
    </div>
  );
}

export default Menu;