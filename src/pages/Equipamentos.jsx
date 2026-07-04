import { useEffect, useState } from "react";
import supabase from "../services/supabase";
import Equipamento from "../components/Equipamento";

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");

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
    } else {
      setNome("");
      setSetor("");
      buscarEquipamentos();
    }
  };

  const removerEquipamento = async (id) => {
    const { error } = await supabase
      .from("equipamentos")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("Erro ao remover:", error.message);
    } else {
      buscarEquipamentos();
    }
  };

  return (
    <div>
      <h2>Equipamentos</h2>

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

      <button onClick={adicionarEquipamento}>Adicionar</button>

      {equipamentos.map((equipamento) => (
        <Equipamento
          key={equipamento.id}
          nome={equipamento.nome}
          setor={equipamento.setor}
          onDelete={() => removerEquipamento(equipamento.id)}
        />
      ))}
    </div>
  );
}