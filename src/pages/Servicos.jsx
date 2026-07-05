import { useState, useEffect } from "react";
import supabase from "../services/supabase";

function Servicos() {

    const [servicos, setServicos] = useState([]);
    const [nome, setNome] = useState("");

    useEffect(() => {
        carregarServicos();
    }, []);

    async function carregarServicos() {

        const { data, error } = await supabase
            .from("servicos")
            .select("*");

        if (error) {
            console.error(error);
            return;
        }

        setServicos(data);
    }

    async function cadastrar() {

        if (!nome.trim()) {
            alert("Digite o nome do serviço");
            return;
        }

        const { error } = await supabase
            .from("servicos")
            .insert([{ nome }]);

        if (error) {
            console.error(error);
            alert("Erro ao cadastrar");
            return;
        }

        setNome("");
        carregarServicos();
    }

    async function remover(id) {

        const { error } = await supabase
            .from("servicos")
            .delete()
            .eq("id", id);

        if (error) {
            console.error(error);
            alert("Erro ao remover");
            return;
        }

        carregarServicos();
    }

    return (
        <div>

            <h2>Gestão de Serviços</h2>

        <div className="formulario">
            <input
                type="text"
                placeholder="Nome do serviço"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <button onClick={cadastrar}>
                Cadastrar
            </button>
            </div>

            <hr />

        <div nameClass="lista-cards">
            {servicos.map((servico) => (
                <div key={servico.id} className="card">

                    <h3>{servico.nome}</h3>

                    <button onClick={() => remover(servico.id)}>
                        Excluir
                    </button>

                </div>
            ))}
            </div>
        </div>
    );
}

export default Servicos;