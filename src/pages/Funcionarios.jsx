import { useState, useEffect } from "react";
import supabase from "../services/supabase";

function Funcionarios() {

    const [funcionarios, setFuncionarios] = useState([]);
    const [nome, setNome] = useState("");
    const [busca, setBusca] = useState("");

    useEffect(() => {
        carregarFuncionarios();
    }, []);

    async function carregarFuncionarios() {

        const { data, error } = await supabase
            .from("funcionarios")
            .select("*");

        if (error) {
            console.error(error);
            return;
        }

        setFuncionarios(data);
    }

    async function cadastrar() {

        if (!nome.trim()) {
            alert("Digite o nome do funcionário");
            return;
        }

        const { error } = await supabase
            .from("funcionarios")
            .insert([{ nome }]);

        if (error) {
            console.error(error);
            alert("Erro ao cadastrar");
            return;
        }

        setNome("");
        carregarFuncionarios();
    }

    async function remover(id) {

        const { error } = await supabase
            .from("funcionarios")
            .delete()
            .eq("id", id);

        if (error) {
            console.error(error);
            alert("Erro ao remover");
            return;
        }

        carregarFuncionarios();
    }

    const funcionariosFiltrados = funcionarios.filter((funcionario) =>
        funcionario.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div>

            <h2>Gestão de Funcionários</h2>

            <div className="formulario busca">
                <input
                    type="text"
                    placeholder="Buscar funcionário..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>

            <div className="formulario cadastro">
                <input
                    type="text"
                    placeholder="Nome do funcionário"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <button onClick={cadastrar}>
                    Cadastrar
                </button>
            </div>

            <hr />

            <div className="lista-cards">
                {funcionariosFiltrados.length > 0 ? (
                    funcionariosFiltrados.map((funcionario) => (
                        <div key={funcionario.id} className="card">

                            <h3>{funcionario.nome}</h3>

                            <button onClick={() => remover(funcionario.id)}>
                                Excluir
                            </button>

                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: "center" }}>
                        Nenhum funcionário encontrado
                    </p>
                )}
            </div>

        </div>
    );
}

export default Funcionarios;