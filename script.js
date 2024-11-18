let selectedPeriod = "";

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
}

function selectPeriod(period) {
    selectedPeriod = period;
    document.getElementById("manha").classList.toggle("active", period === "Manhã");
    document.getElementById("tarde").classList.toggle("active", period === "Tarde");
    document.getElementById("qualquer").classList.toggle("active", period === "Qualquer");
    document.getElementById("confirmar").classList.toggle("active", period === "CONFIRMAR COM CLIENTE");
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}

function generateText() {
    const abertura = document.getElementById("abertura").value;
    const idOs = document.getElementById("idOs").value;
    const cliente = document.getElementById("cliente").value;
    const descricao = document.getElementById("descricao").value;
    const data = document.getElementById("data").value;
    const obs = document.getElementById("obs").value;
    const contato = document.getElementById("contato").value;
    const endereco = document.getElementById("endereco").value;
    const colaborador = document.getElementById("colaborador").value;

    // Verifica os campos obrigatórios
    if (!cliente || !colaborador || !abertura || !selectedPeriod || !data) {
        showPopupMessage("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    let outputText = "";

    if (!idOs) {
        outputText += "\n-------------------------------------------\n";
    }

    if (idOs) {
        outputText += `*${abertura}*\n`;
    }

    if (idOs) {
        outputText += `ID OS: ${idOs}\n`;
    }
    outputText += `Cliente: ${cliente}\n`;
    outputText += `Descrição: ${descricao}\n`;
    outputText += `Data: ${formatDate(data)}\n`;
    outputText += `Período: ${selectedPeriod}\n`;

    if (obs) {
        outputText += `Obs: ${obs}\n`;
    }
    outputText += `Contato: ${contato}\n`;
    outputText += `Endereço: ${endereco}\n`;

    if (colaborador) {
        outputText += `Colaborador: ${colaborador}\n`;
    }

    if (!idOs) {
        outputText += "-------------------------------------------\n";
    }

    document.getElementById("output").value = outputText;
}

function copyToClipboard() {
    const outputText = document.getElementById("output");
    outputText.select();
    document.execCommand("copy");

    showPopupMessage("Texto copiado para a área de transferência.");
}

// Exibe a mensagem de alerta ou confirmação
function showPopupMessage(message) {
    const popup = document.getElementById("popupMessage");
    popup.textContent = message;
    popup.style.display = "block";
    popup.style.opacity = "1";  // Garante visibilidade
    setTimeout(() => {
        popup.style.opacity = "0";  // Transição para desaparecer
    }, 1500);
    setTimeout(() => {
        popup.style.display = "none";
    }, 2000);  // Tempo total de exibição
}

function clearFields() {
    document.getElementById("abertura").value = "";
    document.getElementById("idOs").value = "";
    document.getElementById("cliente").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("data").value = "";
    document.getElementById("obs").value = "";
    document.getElementById("contato").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("colaborador").value = "";
    selectedPeriod = "";
    document.getElementById("output").value = "";
    document.getElementById("manha").classList.remove("active");
    document.getElementById("tarde").classList.remove("active");
    document.getElementById("qualquer").classList.remove("active");
    document.getElementById("confirmar").classList.remove("active");
}

function checkTipoOS() {
    const tipoOsSelect = document.getElementById("abertura");

    if (tipoOsSelect.value === "OUTROS") {
        tipoOsSelect.outerHTML = `<input type="text" id="abertura" placeholder="Insira o tipo de OS" onblur="resetTipoOS(this)">`;
        document.getElementById("abertura").focus();
    }
}

function resetTipoOS(inputElement) {
    if (inputElement.value === "") {
        inputElement.outerHTML = `
            <select id="abertura" onchange="checkTipoOS()">
                <option value="">Selecione o Tipo de OS</option>
                <option value="ATIVAÇÃO">ATIVAÇÃO</option>
                <option value="ATENUAÇÃO DE FIBRA ÓTICA">ATENUAÇÃO DE FIBRA ÓTICA</option>
                <option value="ROMPIMENTO">ROMPIMENTO</option>
                <option value="VISITA TÉCNICA">VISITA TÉCNICA</option>
                <option value="EXTENSOR - CABO DE REDE">EXTENSOR - CABO DE REDE</option>
                <option value="MUDANÇA DE ENDEREÇO">MUDANÇA DE ENDEREÇO</option>
                <option value="RETIRADA DE EQUIPAMENTO">RETIRADA DE EQUIPAMENTO</option>
                <option value="MUDANÇA DE CÔMODO">MUDANÇA DE CÔMODO</option>
                <option value="TROCA DE MODEM">TROCA DE MODEM</option>
                <option value="OUTROS">OUTROS</option>
            </select>`;
    }
}

function checkColaborador() {
    const colaboradorSelect = document.getElementById("colaborador");

    if (colaboradorSelect.value === "OUTROS") {
        colaboradorSelect.outerHTML = `
            <input type="text" id="colaborador" placeholder="Insira o nome do colaborador" onblur="resetColaborador(this)">
        `;
        document.getElementById("colaborador").focus();
    }
}

function resetColaborador(inputElement) {
    if (inputElement.value === "") {
        inputElement.outerHTML = `
            <select id="colaborador" onchange="checkColaborador()">
                <option value="">Selecione o Colaborador</option>
                <option value="Aline">Aline</option>
                <option value="Ana Beatriz">Ana Beatriz</option>
                <option value="Carolina">Carolina</option>
                <option value="Isabela">Isabela</option>
                <option value="Jorge">Jorge</option>
                <option value="Letícia">Letícia</option>
                <option value="Letícia Sei">Letícia Sei</option>
                <option value="Luan">Luan</option>
                <option value="Pedro">Pedro</option>
                <option value="Thayza">Thayza</option>
                <option value="Vinícius">Vinícius</option>
                <option value="OUTROS">OUTROS</option>
            </select>
        `;
    }
}


function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('theme-dark')) {
        body.classList.replace('theme-dark', 'theme-light');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.replace('theme-light', 'theme-dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Carrega o tema salvo no armazenamento local
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Padrão para tema escuro
    document.body.classList.add(`theme-${savedTheme}`);
});
