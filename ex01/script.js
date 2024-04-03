var nomeGlobal;
var mensagemGlobal;
var dateGlobal;

function conferirMensagemWhatsApp() {
    var nome = document.getElementById("nome").value;
    var mensagem = document.getElementById("mensagem").value;
    
    var date = formatDate(new Date(), "pt-br");

    nomeGlobal = nome;
    mensagemGlobal = mensagem;
    dateGlobal = date;

    document.getElementById("confNome").textContent = nome;
    document.getElementById("confMsg").textContent = mensagem;
    document.getElementById("confDate").textContent = date;

    document.getElementById("conferir_mensagem").style.display = "none";
    document.getElementById("enviar_mensagem").style.display = "flex";
}

function formatDate(date, locales) {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }
    return Intl.DateTimeFormat(locales, options).format(date);
}

function enviar() {
    var numeroTelefone = "5541999999999";

    var linkWhatsApp = `https://wa.me/${numeroTelefone}?text=NOME DO RECEPTOR(A): ${nomeGlobal} - ${mensagemGlobal} - ${dateGlobal}`

    window.open(linkWhatsApp, "_blank");
}

function theme() {
    var root = document.querySelector(':root');
    var rs = getComputedStyle(root);

    if (rs.getPropertyValue('--background-color') == 'white')
    {
        root.style.setProperty('--background-color', '#181818');
        root.style.setProperty('--text-color', '#adadad');
    } else {
        root.style.setProperty('--background-color', 'white');
        root.style.setProperty('--text-color', 'black');
    }
}