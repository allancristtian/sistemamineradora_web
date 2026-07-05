import { useEffect, useState } from "react";
import supabase from "../services/supabase";
import Equipamento from "../components/Equipamento";

export default function Equipamentos() {

  const [equipamentos, setEquipamentos] = useState([]);
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    buscarEquipamentos();
  }, []);

  const buscarEquipamentos = async () => {
    const { data, error } = await supabase
      .from("equipamentos")
      .select("*");

    if (error) {
      console.log("Erro ao buscar:", error.message);
    } else {
      setEquipamentos(data);
    }
  };

  const adicionarEquipamento = async () => {

    if (!nome || !setor) {
      alert("Preencha todos os campos!");
      return;
    }

    const { error } = await supabase
      .from("equipamentos")
      .insert([
        {
          nome: nome,
          setor: setor,
        },
      ]);

    if (error) {
      console.log("Erro ao adicionar:", error.message);
      return;
    }

    setNome("");
    setSetor("");
    buscarEquipamentos();
  };

  const removerEquipamento = async (id) => {

    const { error } = await supabase
      .from("equipamentos")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("Erro ao remover:", error.message);
      return;
    }

    buscarEquipamentos();
  };

  const equipamentosFiltrados = equipamentos.filter((eq) =>
    eq.nome.toLowerCase().includes(busca.toLowerCase()) ||
    eq.setor.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>

      <h2>Equipamentos</h2>

      <div className="formulario busca">
        <input
          type="text"
          placeholder="Buscar equipamento..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="formulario cadastro">

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Setor"
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
        />

        <button onClick={adicionarEquipamento}>
          Adicionar
        </button>

      </div>

      <hr />

      <div className="lista-cards">
        {equipamentosFiltrados.length > 0 ? (
          equipamentosFiltrados.map((equipamento) => (
            <Equipamento
              key={equipamento.id}
              nome={equipamento.nome}
              setor={equipamento.setor}
              onDelete={() => removerEquipamento(equipamento.id)}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>
            Nenhum equipamento encontrado
          </p>
        )}
      </div>

    </div>
  );
}