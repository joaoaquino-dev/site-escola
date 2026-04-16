const questions = [
  {
    q: "Em que ano o filme Bohemian Rhapsody foi lançado?",
    options: ["2015", "2016", "2018", "2020"],
    answer: 2,
    explain: "Bohemian Rhapsody estreou em outubro de 2018.",
  },
  {
    q: "Qual ator interpretou Freddie Mercury no filme e ganhou o Oscar de Melhor Ator?",
    options: ["Tom Hanks", "Rami Malek", "Joaquin Phoenix", "Eddie Redmayne"],
    answer: 1,
    explain: "Rami Malek venceu o Oscar de Melhor Ator por essa atuação.",
  },
  {
    q: "Em que posição o Irã se encontra entre os países com maiores reservas de petróleo do mundo?",
    options: ["1ª", "2ª", "4ª", "10ª"],
    answer: 2,
    explain: "O Irã possui as 4ª maiores reservas de petróleo do planeta.",
  },
  {
    q: "Qual general iraniano foi morto em ataque de drone em janeiro de 2020?",
    options: [
      "Ali Khamenei",
      "Hassan Rouhani",
      "Qasem Soleimani",
      "Mahmoud Ahmadinejad",
    ],
    answer: 2,
    explain:
      "O general Qasem Soleimani foi morto em Bagdá por ordem do presidente Trump.",
  },
  {
    q: "Em que ano aconteceu a primeira cerimônia do Oscar?",
    options: ["1929", "1935", "1945", "1951"],
    answer: 0,
    explain: "O primeiro Oscar foi entregue em 16 de maio de 1929.",
  },
  {
    q: "Qual hashtag ficou famosa pela falta de diversidade no Oscar?",
    options: [
      "#OscarsDiversity",
      "#OscarsSoWhite",
      "#OscarsInclusion",
      "#BlackOscars",
    ],
    answer: 1,
    explain:
      "#OscarsSoWhite viralizou em 2015 e 2016, questionando a falta de indicados negros.",
  },
  {
    q: "Qual filme brasileiro foi indicado ao Oscar de Melhor Filme Internacional em 2003?",
    options: [
      "Tropa de Elite",
      "Central do Brasil",
      "Cidade de Deus",
      "O Auto da Compadecida",
    ],
    answer: 2,
    explain:
      "Cidade de Deus, de Fernando Meirelles, concorreu em 2003 — inclusive a Melhor Diretor.",
  },
  {
    q: "Qual é a taxa aproximada de analfabetismo no Brasil atualmente?",
    options: ["20%", "15%", "7%", "2%"],
    answer: 2,
    explain:
      "O analfabetismo caiu de ~20% nos anos 90 para cerca de 7% nos últimos anos.",
  },
];

let current = 0;
let score = 0;
let answered = false;

const progressEl = document.getElementById("quiz-progress");
const questionEl = document.getElementById("quiz-question");
const optionsEl = document.getElementById("quiz-options");
const feedbackEl = document.getElementById("quiz-feedback");
const nextBtn = document.getElementById("quiz-next");
const gameEl = document.getElementById("quiz-game");
const resultEl = document.getElementById("quiz-result");
const restartBtn = document.getElementById("quiz-restart");

function loadQuestion() {
  answered = false;
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";

  const q = questions[current];
  progressEl.textContent = `Pergunta ${current + 1} de ${questions.length}`;
  questionEl.textContent = q.q;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "quiz-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => selectAnswer(i));
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(idx) {
  if (answered) return;
  answered = true;

  const q = questions[current];
  const btns = optionsEl.querySelectorAll(".quiz-btn");

  btns.forEach((b) => (b.disabled = true));

  if (idx === q.answer) {
    btns[idx].classList.add("correct");
    feedbackEl.textContent = "✅ Correto! " + q.explain;
    score++;
  } else {
    btns[idx].classList.add("wrong");
    btns[q.answer].classList.add("correct");
    feedbackEl.textContent = "❌ Errou. " + q.explain;
  }

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  gameEl.style.display = "none";
  resultEl.style.display = "block";

  const pct = Math.round((score / questions.length) * 100);
  let emoji = pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📖";
  document.getElementById("result-title").textContent =
    `${emoji} ${score}/${questions.length} acertos`;
  document.getElementById("result-text").textContent =
    pct === 100
      ? "Perfeito! Você dominou todos os temas!"
      : pct >= 80
        ? "Excelente! Você estudou bem o material."
        : pct >= 50
          ? "Bom trabalho! Vale revisar alguns tópicos."
          : "Continue estudando — você chegará lá!";
}

restartBtn.addEventListener("click", () => {
  current = 0;
  score = 0;
  gameEl.style.display = "block";
  resultEl.style.display = "none";
  loadQuestion();
});

loadQuestion();

function toggleMenu() {
  const menu = document.getElementById("menu-links");
  menu.classList.toggle("active");
}
