function Equipamento({ nome, setor, onDelete }) {
    return (
        <div className="card">

            <h3>{nome}</h3>

            <p>Setor: {setor}</p>

            <button onClick={onDelete}>
                Excluir
            </button>

        </div>
    );
}

export default Equipamento;