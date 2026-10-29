export async function buscarCep(cep) {
  const limpo = cep.replace(/\D/g, "");

  if (limpo.length !== 8) {
    throw new Error("O CEP deve ter 8 dígitos.");
  }

  const resposta = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);

  if (!resposta.ok) {
    throw new Error("Não foi possível consultar o CEP.");
  }

  const dados = await resposta.json();

  if (dados.erro) {
    throw new Error("CEP não encontrado.");
  }

  return { logradouro: dados.logradouro, bairro: dados.bairro };
}