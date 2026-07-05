import { useState, useEffect } from "react";
import supabase from "../services/supabase";

function Servicos() {

    const [servicos, setServicos] = useState([]);
    const [nome, setNome] = useState("");
    const [busca, setBusca] = useState("");

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

    const servicosFiltrados = servicos.filter((servico) =>
        servico.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div>

            <h2>Gestão de Serviços</h2>

            <div className="formulario busca">
                <input
                    type="text"
                    placeholder="Buscar serviço..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>

            <div className="formulario cadastro">

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

            <div className="lista-cards">
                {servicosFiltrados.length > 0 ? (
                    servicosFiltrados.map((servico) => (
                        <div key={servico.id} className="card">

                            <h3>{servico.nome}</h3>

                            <button onClick={() => remover(servico.id)}>
                                Excluir
                            </button>

                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: "center" }}>
                        Nenhum serviço encontrado
                    </p>
                )}
            </div>

        </div>
    );
}

export default Servicos;