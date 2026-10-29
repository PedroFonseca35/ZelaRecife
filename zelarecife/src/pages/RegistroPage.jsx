import { useState } from "react";
import { buscarCep } from "../services/viacep";

const TIPOS_RESIDUO = [
  "Entulho / Construção",
  "Lixo Doméstico",
  "Podas / Vegetação",
  "Móveis / Volumosos",
  "Outros",
];

const FORM_INICIAL = {
  cep: "",
  logradouro: "",
  bairro: "",
  numeroComplemento: "",
  tipoResiduo: "",
  observacoes: "",
};

export default function RegistroPage() {
  const [form, setForm] = useState(FORM_INICIAL);
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [erroCep, setErroCep] = useState("");

  function atualizar(campo, valor) {
    setForm((anterior) => ({ ...anterior, [campo]: valor }));
  }

  async function handleCepChange(e) {
    const cep = e.target.value.replace(/\D/g, "").slice(0, 8);
    atualizar("cep", cep);
    setErroCep("");

    if (cep.length !== 8) return;

    setBuscandoCep(true);
    try {
      const { logradouro, bairro } = await buscarCep(cep);
      setForm((anterior) => ({ ...anterior, logradouro, bairro }));
    } catch (erro) {
      setErroCep(erro.message);
    } finally {
      setBuscandoCep(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const ocorrencia = {
      ...form,
      cidade: "Recife",
      status: "Pendente",
      dataCriacao: new Date().toISOString(),
    };

    // Por enquanto só mostramos no console. Depois vamos salvar no Supabase aqui.
    console.log("Ocorrência:", ocorrencia);

    alert("Chamado registrado com sucesso!");
    setForm(FORM_INICIAL);
  }

  return (
    <section className="pagina-registro">
      <p className="eyebrow">Zeladoria urbana · Recife</p>
      <h1>Registro de Descarte Irregular</h1>
      <p className="subtitulo">
        Informe pontos de acúmulo de lixo para direcionar a limpeza urbana na cidade
      </p>

      <form className="cartao" onSubmit={handleSubmit}>
        <h2 className="secao">
          <span className="selo">01</span> Onde está o descarte?
        </h2>

        <label className="campo">
          CEP
          <input
            type="text"
            inputMode="numeric"
            placeholder="Ex.: 50010000"
            value={form.cep}
            onChange={handleCepChange}
            required
          />
        </label>
        <p className={erroCep ? "dica erro" : "dica"}>
          {buscandoCep
            ? "Buscando endereço..."
            : erroCep || "Digite os 8 dígitos. Buscaremos o endereço automaticamente."}
        </p>

        <div className="linha">
          <label className="campo">
            Logradouro / Rua
            <input
              type="text"
              placeholder="Informe a rua"
              value={form.logradouro}
              onChange={(e) => atualizar("logradouro", e.target.value)}
              required
            />
          </label>

          <label className="campo">
            Bairro
            <input
              type="text"
              placeholder="Informe o bairro"
              value={form.bairro}
              onChange={(e) => atualizar("bairro", e.target.value)}
              required
            />
          </label>
        </div>

        <label className="campo">
          Número e Complemento
          <input
            type="text"
            placeholder="Ex.: 120, próximo à esquina"
            value={form.numeroComplemento}
            onChange={(e) => atualizar("numeroComplemento", e.target.value)}
          />
        </label>

        <h2 className="secao">
          <span className="selo">02</span> O que precisa de atenção?
        </h2>

        <label className="campo">
          Tipo de Resíduo
          <select
            value={form.tipoResiduo}
            onChange={(e) => atualizar("tipoResiduo", e.target.value)}
            required
          >
            <option value="">Selecione o tipo de resíduo</option>
            {TIPOS_RESIDUO.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </label>

        <label className="campo">
          Ponto de Referência / Observações (opcional)
          <textarea
            rows={5}
            placeholder="Descreva o local e o acúmulo de resíduos. Não inclua dados pessoais."
            value={form.observacoes}
            onChange={(e) => atualizar("observacoes", e.target.value)}
          />
        </label>

        <p className="dica">CEP, logradouro, bairro e tipo de resíduo são obrigatórios.</p>

        <button type="submit" className="botao-enviar">
          Enviar Ocorrência
        </button>

        <p className="dica">
          Atendimento direcionado a pontos de descarte irregular na cidade do Recife.
        </p>
      </form>
    </section>
  );
}