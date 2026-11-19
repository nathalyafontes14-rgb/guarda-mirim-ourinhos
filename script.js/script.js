<script src="script.js"></script>
const $ = (s) => document.querySelector(s);
$("#year").textContent = new Date().getFullYear();

const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const chatPanel = $("#chatPanel");
const chatMessages = $("#chatMessages");
let welcomed = false;
function openChat() {
  chatPanel.hidden = false;
  if (!welcomed) {
    addBot("Olá! Sou o assistente virtual da AMO-SIM. Posso orientar sobre a instituição, atividades, endereço e formas de contato. Como posso ajudar?");
    welcomed = true;
  }
  $("#chatInput").focus();
}
function closeChat(){ chatPanel.hidden = true; }
$("#chatLaunch").addEventListener("click", openChat);
$("#chatClose").addEventListener("click", closeChat);

function addMessage(text, who) {
  const el = document.createElement("div");
  el.className = "chat-msg " + who;
  el.textContent = text;
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function addBot(text){ addMessage(text, "bot"); }

function answerQuestion(raw) {
  const q = raw.toLocaleLowerCase("pt-BR");
  if (/hist[oó]ria|fundad|quando começou|ano/.test(q))
    return "A AMO-SIM foi oficialmente fundada em 9 de agosto de 1971, por cidadãos da sociedade ourinhense.";
  if (/atividade|curso|aula|portugu|matem|cidadania|disciplina|zona azul|trabalho|emprego/.test(q))
    return "O material institucional apresenta atividades de Língua Portuguesa, Matemática, Cidadania, Disciplina, Preparação profissional e oportunidades relacionadas à Zona Azul. Para saber a programação e disponibilidade atuais, consulte a equipe.";
  if (/equipe|psic[oó]logo|professor|assistente social/.test(q))
    return "O material-base descreve uma equipe com profissionais da administração, professores, profissionais de disciplina, psicólogo e assistente social.";
  if (/idade|requisito|document|inscri|ingress|vaga|sele[cç][aã]o/.test(q))
    return "Os critérios de idade, documentação, vagas e seleção devem ser confirmados diretamente com a equipe. Entre em contato pelo telefone (14) 3326-2141 ou WhatsApp (14) 99765-6211.";
  if (/hor[aá]rio|aberto|funciona/.test(q))
    return "O horário informado no material-base é de segunda a sexta-feira, das 8h às 18h.";
  if (/endere[cç]o|local|onde fica|mapa/.test(q))
    return "A instituição está na Rua Amazonas, 205 – Vila Nova Christoni, Ourinhos – SP, CEP 19911-710.";
  if (/empresa|parceria/.test(q))
    return "Empresas interessadas podem entrar em contato pelos canais oficiais para conversar com a equipe: (14) 3326-2141 ou contato@amosim.com.br.";
  if (/telefone|whats|contato|e-?mail/.test(q))
    return "Telefone: (14) 3326-2141. WhatsApp: (14) 99765-6211. E-mail: contato@amosim.com.br.";
  return "Não tenho essa informação confirmada. Para evitar orientar incorretamente, recomendo falar diretamente com a equipe pelo telefone (14) 3326-2141, WhatsApp (14) 99765-6211 ou e-mail contato@amosim.com.br.";
}
function sendChat(text) {
  const clean = text.trim();
  if (!clean) return;
  addMessage(clean, "user");
  addBot(answerQuestion(clean));
}
$("#chatForm").addEventListener("submit", e => {
  e.preventDefault();
  const input = $("#chatInput");
  sendChat(input.value);
  input.value = "";
});
document.querySelectorAll("[data-question]").forEach(btn => {
  btn.addEventListener("click", () => sendChat(btn.dataset.question));
});
