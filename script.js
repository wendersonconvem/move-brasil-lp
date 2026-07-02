const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzvIg0ZUcsSahcTSfCQZt83JF4Nd8_UKDYrlsatrMD3jGZ6QXa3QwRry3YPY6fkehnQ/exec";

const WHATSAPP_NUMBER = "5582981573869";

const form = document.querySelector("#lead-form");
const errorBox = document.querySelector("#form-error");
const submitButton = document.querySelector("#submit-button");
const successBox = document.querySelector("#success-box");
const whatsappButton = document.querySelector("#whatsapp-button");

function getFormData() {
  const data = new FormData(form);

  return {
    nome: String(data.get("nome") || "").trim(),
    whatsapp: String(data.get("whatsapp") || "").trim(),
    cidade: String(data.get("cidade") || "").trim(),
    estado: String(data.get("estado") || "").trim().toUpperCase(),
    cnh: String(data.get("cnh") || "").trim(),
    apps: String(data.get("apps") || "").trim(),
    modelo: String(data.get("modelo") || "").trim(),
  };
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
}

function clearError() {
  errorBox.textContent = "";
  errorBox.hidden = true;
}

function createWhatsAppUrl(lead) {
  const message = [
    "Olá!",
    "",
    "Acabei de preencher meu cadastro na Landing Page do Programa MOVE BRASIL e gostaria de continuar meu atendimento.",
    "",
    `Meu nome é: ${lead.nome}`,
    "",
    `Cidade: ${lead.cidade}`,
    "",
    `Modelo desejado: ${lead.modelo}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function createWebhookBody(lead) {
  return {
    ...lead,
    origem: "Landing Page Programa MOVE BRASIL",
    enviadoEm: new Date().toISOString(),
  };
}

async function sendLead(lead) {
  await fetch(WEBHOOK_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(createWebhookBody(lead)),
  });
}

form.addEventListener("input", (event) => {
  if (event.target.name === "estado") {
    event.target.value = event.target.value.toUpperCase();
  }

  clearError();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const lead = getFormData();
  const hasEmptyField = Object.values(lead).some((value) => !value);

  if (hasEmptyField) {
    showError("Preencha todos os campos para continuar.");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";
  clearError();

  try {
    await sendLead(lead);
    whatsappButton.href = createWhatsAppUrl(lead);
    form.hidden = true;
    successBox.hidden = false;
    successBox.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch {
    showError("Não foi possível enviar agora. Verifique sua conexão e tente novamente.");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Quero minha Honda";
  }
});
