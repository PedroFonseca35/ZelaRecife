import { useMemo, useState } from "react";
import { OCORRENCIAS_INICIAIS } from "../data/ocorrenciasMock";
import { STATUS } from "../data/constantes";
import CardKpi from "../components/CardKpi";
import ModalDetalhes from "../components/ModalDetalhes";

function formatarData(iso) {
  return new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function formatarCep(cep) {
  return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

export default function AdminPage() {
  const [ocorrencias, setOcorrencias] = useState(OCORRENCIAS_INICIAIS);
  const [filtroBairro, setFiltroBairro] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [selecionada, setSelecionada] = useState(null);

  // Lista de bairros montada a partir dos próprios chamados (dropdown dinâmico).
  const bairros = useMemo(() => {
    const unicos = new Set(ocorrencias.map((o) => o.bairro));
    return [...unicos].sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, [ocorrencias]);

  // Aplica os filtros e ordena do mais recente para o mais antigo.
  const visiveis = useMemo(() => {
    return ocorrencias
      .filter((o) => !filtroBairro || o.bairro === filtroBairro)
      .filter((o) => !filtroStatus || o.status === filtroStatus)
      .sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
  }, [ocorrencias, filtroBairro, filtroStatus]);

  // Os KPIs consideram todos os chamados, sem os filtros.
  const total = ocorrencias.length;
  const pendentes = ocorrencias.filter((o) => o.status === "Pendente").length;
  const concluidos = ocorrencias.filter((o) => o.status === "Concluído").length;

  function alterarStatus(id, novoStatus) {
    setOcorrencias((anterior) =>
      anterior.map((o) => (o.id === id ? { ...o, status: novoStatus } : o))
    );
  }

  function limparFiltros() {
    setFiltroBairro("");
    setFiltroStatus("");
  }

  return (
    <section>
      <p className="eyebrow">Operação de limpeza urbana</p>
      <h1>Painel de Gestão</h1>
      <h2 className="subtitulo-admin">Limpeza Urbana &amp; Zeladoria Recife</h2>
      <p className="subtitulo">
        Acompanhe os chamados e organize o atendimento nos bairros do Recife.
      </p>

      <div className="kpis">
        <CardKpi titulo="Total de Chamados" valor={total} />
        <CardKpi titulo="Chamados Pendentes" valor={pendentes} />
        <CardKpi titulo="Chamados Concluídos" valor={concluidos} />
      </div>

      <div className="filtros cartao">
        <label className="campo">
          Bairro
          <select value={filtroBairro} onChange={(e) => setFiltroBairro(e.target.value)}>
            <option value="">Todos</option>
            {bairros.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>

        <label className="campo">
          Status
          <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
            <option value="">Todos</option>
            {STATUS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <button className="botao-secundario" onClick={limparFiltros}>
          Limpar Filtros
        </button>
      </div>

      <div className="tabela-cabecalho">
        <h2>Ocorrências</h2>
        <span className="dica">{visiveis.length} chamado(s) · mais recentes primeiro</span>
      </div>

      <div className="tabela-wrapper">
        <table className="tabela">
          <thead>
            <tr>
              <th>Data</th>
              <th>CEP</th>
              <th>Logradouro</th>
              <th>Bairro</th>
              <th>Tipo de Resíduo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {visiveis.length === 0 && (
              <tr>
                <td colSpan={7} className="vazio">
                  Nenhum chamado encontrado com esses filtros.
                </td>
              </tr>
            )}

            {visiveis.map((o) => (
              <tr key={o.id}>
                <td>{formatarData(o.dataCriacao)}</td>
                <td>{formatarCep(o.cep)}</td>
                <td>{o.logradouro}</td>
                <td>{o.bairro}</td>
                <td>{o.tipoResiduo}</td>
                <td>{o.status}</td>
                <td className="acoes">
                  <select
                    value={o.status}
                    onChange={(e) => alterarStatus(o.id, e.target.value)}
                    aria-label={`Alterar status do chamado em ${o.logradouro}`}
                  >
                    {STATUS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button className="botao-secundario" onClick={() => setSelecionada(o)}>
                    Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalDetalhes ocorrencia={selecionada} onFechar={() => setSelecionada(null)} />
    </section>
  );
}