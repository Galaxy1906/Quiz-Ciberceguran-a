// Lista de perguntas para o quiz, cada objeto contém a pergunta, opções, resposta correta e explicação
const quizQuestions = [
    {
        question: "O que significa 'senha'?",
        options: [
            "A) Um número aleatório",
            "B) Um código secreto para acessar uma conta",
            "C) Um tipo de vírus de computador",
            "D) Um programa de software"
        ],
        answer: 1, // Resposta correta é a segunda opção
        explanation: "Uma senha é um código secreto que permite acessar contas e proteger informações."
    },
    {
        question: "Por que é importante manter o antivírus atualizado?",
        options: [
            "A) Para melhorar a velocidade da internet",
            "B) Para ganhar mais espaço no disco",
            "C) Para proteger contra novos vírus",
            "D) Para desligar o computador mais rápido"
        ],
        answer: 2,
        explanation: "Manter o antivírus atualizado garante proteção contra as ameaças mais recentes."
    },
    {
        question: "O que você deve fazer se receber um e-mail de um remetente desconhecido com um link?",
        options: [
            "A) Clicar imediatamente no link",
            "B) Ignorar e excluir o e-mail",
            "C) Compartilhar com amigos",
            "D) Salvar o link para mais tarde"
        ],
        answer: 1,
        explanation: "E-mails de remetentes desconhecidos podem conter links maliciosos, então é melhor ignorá-los."
    },
    {
        question: "O que é um 'hacker'?",
        options: [
            "A) Um jogador de videogame",
            "B) Uma pessoa que conserta computadores",
            "C) Uma pessoa que invade sistemas de computador",
            "D) Um tipo de software"
        ],
        answer: 2,
        explanation: "Hackers invadem sistemas para roubar informações ou causar danos."
    },
    {
        question: "Por que você deve usar senhas diferentes para suas contas?",
        options: [
            "A) Para lembrar de todas facilmente",
            "B) Para proteger todas as contas se uma senha for roubada",
            "C) Para gastar menos tempo online",
            "D) Para aumentar a velocidade do computador"
        ],
        answer: 1,
        explanation: "Usar senhas diferentes impede que todas as suas contas sejam comprometidas se uma senha for descoberta."
    }
];

let currentQuestion = 0; // Índice da pergunta atual
let score = 0; // Contador de pontuação

// Função que carrega a pergunta atual
function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = ""; // Limpar o conteúdo anterior

    // Carregar a pergunta e as opções da questão atual
    const questionData = quizQuestions[currentQuestion];
    const questionElement = document.createElement("h2");
    questionElement.textContent = questionData.question;
    questionContainer.appendChild(questionElement);

    // Criar botões para cada opção de resposta
    questionData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option";
        // Ao clicar, verifica se a resposta está correta
        button.onclick = () => checkAnswer(index, button);
        questionContainer.appendChild(button);
    });
}

// Função que verifica a resposta selecionada pelo usuário
function checkAnswer(selectedOption, button) {
    const questionData = quizQuestions[currentQuestion];
    const options = document.querySelectorAll(".option");

    // Loop para destacar a resposta correta e a errada
    options.forEach((btn, index) => {
        if (index === questionData.answer) {
            btn.classList.add("correct"); // Marca a opção correta com verde
        }
        if (index === selectedOption && selectedOption !== questionData.answer) {
            button.classList.add("incorrect"); // Marca a opção errada com vermelho
        }
        btn.onclick = null; // Desativa os cliques após a seleção
    });

    // Mostrar a explicação abaixo das respostas
    const explanationElement = document.createElement("div");
    explanationElement.className = "explanation";
    if (selectedOption === questionData.answer) {
        explanationElement.textContent = "Correto!"; // Mensagem se acertar
        score++; // Aumenta a pontuação
    } else {
        explanationElement.textContent = `Incorreto! ${questionData.explanation}`; // Explicação se errar
    }
    document.getElementById("question-container").appendChild(explanationElement);

    // Exibir o botão para a próxima pergunta
    document.getElementById("next-button").classList.remove("hidden");
}

// Função que carrega a próxima pergunta
function nextQuestion() {
    currentQuestion++; // Passa para a próxima questão
    if (currentQuestion < quizQuestions.length) {
        loadQuestion();
        document.getElementById("next-button").classList.add("hidden"); // Esconde o botão novamente
    } else {
        showResult(); // Exibe o resultado final
    }
}

// Função que exibe o resultado final ao terminar o quiz
function showResult() {
    const questionContainer = document.getElementById("question-container");
    const resultContainer = document.getElementById("result");

    // Esconder o container de perguntas e o botão de próxima
    questionContainer.classList.add("hidden");
    document.getElementById("next-button").classList.add("hidden");

    // Mostrar a pontuação final
    resultContainer.classList.remove("hidden");
    resultContainer.innerHTML = `<h2>Você acertou ${score} de ${quizQuestions.length} perguntas!</h2>`;
}

// Carregar a primeira pergunta ao carregar a página
window.onload = loadQuestion;
