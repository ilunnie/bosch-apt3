function adicionarItem() {
  // Obter os valores dos campos de entrada
  var nome = document.getElementById("nome").value;
  var valor = document.getElementById("valor").value;
  var quantidade = document.getElementById("quantidade").value;
  var fornecedor = document.getElementById("fornecedor").value;
  var estado = document.getElementById("estado").value;

  // Validar se os campos estão preenchidos
  if (!nome || !valor || !quantidade || !fornecedor || !estado) {
    alert("Preencha todos os campos.");
    return;
  }

  // Criar uma linha na tabela
  var tabela = document
    .getElementById("tabela")
    .getElementsByTagName("tbody")[0];
  var novaLinha = tabela.insertRow(tabela.rows.length);
  var celulaNome = novaLinha.insertCell(0);
  var celulaValor = novaLinha.insertCell(1);
  var celulaQuantidade = novaLinha.insertCell(2);
  var celulaFornecedor = novaLinha.insertCell(3);
  var celulaEstado = novaLinha.insertCell(4);

  // Preencher as células com os valores
  celulaNome.innerHTML = nome;
  celulaValor.innerHTML = valor;
  celulaQuantidade.innerHTML = quantidade;
  celulaFornecedor.innerHTML = fornecedor;
  celulaEstado.innerHTML = estado;

  // Limpar os campos de entrada
  document.getElementById("nome").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("fornecedor").value = "";
  document.getElementById("estado").value = "";
}

function exportarParaExcel() {
  var tabela = document.getElementById("tabela");
  var nomeArquivo = "tabela_produtos.xlsx";
  var wb = XLSX.utils.table_to_book(tabela, { sheet: "Tabela de Produtos" });
  XLSX.writeFile(wb, nomeArquivo);
}
