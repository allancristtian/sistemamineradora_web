import { useState } from "react";

import Menu from "./components/Menu";

import Inicio from "./pages/Inicio";
import Equipamentos from "./pages/Equipamentos";
import Cidades from "./pages/Cidades";
import Funcionarios from "./pages/Funcionarios";
import Servicos from "./pages/Servicos";

function App() {

  const [pagina, setPagina] = useState("inicio");

  return (
    <div>

      <Menu mudarPagina={setPagina} />

      <hr />

      {pagina === "inicio" && <Inicio />}

      {pagina === "equipamentos" && <Equipamentos />}

      {pagina === "cidades" && <Cidades />}

      {pagina === "funcionarios" && <Funcionarios />}

      {pagina === "servicos" && <Servicos />}

    </div>
  );
}

export default App;