import { useState, useEffect } from "react";
import supabase from "../services/supabase";

function Cidades() {

    const [cidades, setCidades] = useState([]);
    const [nome, setNome] = useState("");

    useEffect(() => {
        carregarCidades();
    }, []);

    async function carregarCidades() {

        const { data, error } = await supabase
            .from("cidades")
            .select("*");

        if (error) {
            console.error(error);
            return;
        }

        setCidades(data);
    }

    async function cadastrar() {

        if (!nome.trim()) {
            alert("Digite o nome da cidade");
            return;
        }

        const { error } = await supabase
            .from("cidades")
            .insert([{ nome }]);

        if (error) {
            console.error(error);
            alert("Erro ao cadastrar");
            return;
        }

        setNome("");
        carregarCidades();
    }

    async function remover(id) {

        const { error } = await supabase
            .from("cidades")
            .delete()
            .eq("id", id);

        if (error) {
            console.error(error);
            alert("Erro ao remover");
            return;
        }

        carregarCidades();
    }

    return (
        <div>

            <h2>Gestão de Cidades</h2>

            <input
                type="text"
                placeholder="Nome da cidade"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <button onClick={cadastrar}>
                Cadastrar
            </button>

            <hr />

            {cidades.map((cidade) => (
                <div key={cidade.id} className="card">

                    <h3>{cidade.nome}</h3>

                    <button onClick={() => remover(cidade.id)}>
                        Excluir
                    </button>

                </div>
            ))}

        </div>
    );
}

export default Cidades;