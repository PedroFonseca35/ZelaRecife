export default function ModalDetalhes({ ocorrencia, onFechar }) {
  if (!ocorrencia) return null;

  const campos = [
    ["CEP", ocorrencia.cep],
    ["Logradouro", ocorrencia.logradouro],
    ["Número e complemento", ocorrencia.numeroComplemento || "Não informado"],
    ["Bairro", ocorrencia.bairro],
    ["Cidade", ocorrencia.cidade],
    ["Tipo de resíduo", ocorrencia.tipoResiduo],
    ["Observações", ocorrencia.observacoes || "Sem observações"],
    ["Status", ocorrencia.status],
  ];

  return (
    <div className="modal-fundo" onClick={onFechar}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Detalhes da ocorrência</h2>

        {campos.map(([rotulo, valor]) => (
          <div className="modal-campo" key={rotulo}>
            <strong>{rotulo}</strong>
            <span>{valor}</span>
          </div>
        ))}

        <button className="botao-secundario" onClick={onFechar}>
          Fechar
        </button>
      </div>
    </div>
  );
}