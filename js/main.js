const questions = [
    new ButtonQuestion("<b>Einsatz?</b><br><i>Wofür wirst du das Fahrrad verwenden?</i>", 
        [
            new ImageButton("Stadt", "EinsatzA.png"),
            new ImageButton("Offroad", "EinsatzB.png"),
            new ImageButton("Marathon", "EinsatzC.png"),
        ]
    ),
    new ButtonQuestion("<b>Streckenlänge?</b><br><i>Wie lang sind die Strecken?</i>", 
        [
            new ImageButton("Kurzstrecken", "DistanzA.png"),
            new ImageButton("Langstrecken", "DistanzB.png"),
        ]
    ),
    new ButtonQuestion("<b>E-Bike?</b><br><i>Soll es ein E-Bike sein?</i>", 
        [
            new ImageButton("Ja", "EbikeA.png"),
            new ImageButton("Nein", "EbikeB.png"),
        ]
    ),
    new ButtonQuestion("<b>Rahmentyp?</b><br><i>Was für ein Rahmen soll da Fahrrad haben?</i>", 
        [
            new ImageButton("Diamant", "RahmenA.png"),
            new ImageButton("Trapez", "RahmenB.png"),
            new ImageButton("Wave", "RahmenC.png"),
        ]
    ),
    new ButtonQuestion("<b>STVZO?</b><br><i>Soll das Fahrrad mit StVZO Austattung vorinstalliert kommen?</i>", 
        [
            new ImageButton("Ja", "STVOA.png"),
            new ImageButton("Nein", "STVOB.png"),
        ]
    ),
    new ButtonQuestion("<b>Bremsen?</b><br><i>Welche Bremsen soll es haben?</i>", 
        [
            new ImageButton("Felgenbremsen", "BremseA.png"),
            new ImageButton("Scheibenbremsen", "BremseB.png"),
        ]
    ),
    new ButtonQuestion("<b>Federung?</b><br><i>Soll es eine Federung haben?</i>", 
        [
            new ImageButton("Ja", "FederungA.png"),
            new ImageButton("Nein", "FederungB.png"),
        ]
    ),
    new ButtonQuestion("<b>Schaltung?</b><br><i>Welche Schaltung soll es haben?</i>", 
        [
            new ImageButton("Nabenschaltung", "schaltungA.png"),
            new ImageButton("Kettenschaltung", "schaltungB.png"),
        ]
    ),
    new SliderQuestion("<b>Preis?</b><br><i>Wie hoch ist dein Budget?</i>", 0, 9999),
]

const answers = [];

function startQuiz() {
    if (questions.length <= 0) return;
    showQuestion(0)
    
}

function showQuestion(index) {
    const question = questions[index];
    if (question instanceof ButtonQuestion) {
        renderButtonQuestion(question, index);
    } else {
        renderSliderQuestion(question, index);
    }

}

function renderButtonQuestion(question, currentIndex) {
    document.getElementsByClassName("question")[0].innerHTML = question.title;
    document.getElementsByClassName("current-question")[0].innerHTML = `${currentIndex + 1} / ${questions.length}`;
    const container = document.getElementsByClassName("column")[0];
    const grid = document.createElement('div');
    grid.classList.add("grid");
    container.appendChild(grid);
    question.answers.forEach(imageButton => {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('relative');

        const button = document.createElement('button');
        button.classList.add("question-button");
        const image = document.createElement('img');
        image.src = `../assets/images/${imageButton.image}`;
        button.appendChild(image);

        const answer = document.createElement('p');
        answer.classList.add('question-answer');
        answer.textContent = imageButton.answerText;

        buttonWrapper.appendChild(button);
        buttonWrapper.appendChild(answer);

        grid.appendChild(buttonWrapper);
        button.addEventListener('click', function() {
            handleAnswerSelection(question, imageButton, currentIndex); 
        });

    });
}

function handleAnswerSelection(question, answer, index) {
    console.log(question, answer);
    answers.push({qusetion: question, answer: answer})
    nextQuestion(index);
}

function renderSliderQuestion(question, currentIndex) {
    let currentValue = question.min;
    document.getElementsByClassName("question")[0].innerHTML = question.title;
    document.getElementsByClassName("current-question")[0].innerHTML = `${currentIndex + 1} / ${questions.length}`;
    const container = document.getElementsByClassName("column")[0];
    const sliderQuestion = document.createElement('div');
    sliderQuestion.classList.add("slider-question");

    const sliderValue = document.createElement('p');
    sliderValue.classList.add("slider-value");
    sliderValue.innerText = `${question.min} €`;

    sliderQuestion.appendChild(sliderValue);

    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add("slidercontainer");

    const sliderInput = document.createElement("input");
    sliderInput.type = "range";
    sliderInput.min = question.min;    
    sliderInput.max = question.max;  
    sliderInput.value = question.min; 
    sliderInput.classList.add("slider");
    sliderInput.id = "myRange"; 
    sliderContainer.appendChild(sliderInput);
    sliderQuestion.appendChild(sliderContainer);
    sliderInput.addEventListener("input", (event) => {
        currentValue = event.target.value;
        document.getElementsByClassName("slider-value")[0].innerText = `${currentValue} €`
    });

    const continueButton = document.createElement('button');
    continueButton.classList.add("continue-button");
    continueButton.innerText = "Weiter";
    continueButton.addEventListener('click', function() {
        answers.push({question: question, answer: currentValue})
        nextQuestion(currentIndex);
    });
    

    container.appendChild(sliderQuestion);
    container.appendChild(continueButton);
    
}

// function handleSliderChange(event) {
//     const currentValue = event.target.value;
//     document.getElementsByClassName("slider-value")[0].innerText = `${currentValue} €`
// }

function makeClear() {
    const buttonQuestion = document.getElementsByClassName("grid");
    const sliderQuestion = document.getElementsByClassName("slider-question");
    const column = document.getElementsByClassName("column")[0];
    
    
    if (sliderQuestion != undefined) {
        const continueButton = document.getElementsByClassName("continue-button")[0];
        if (continueButton) column.removeChild(continueButton);
        while (sliderQuestion.length > 0) {
            sliderQuestion[0].parentNode.removeChild(sliderQuestion[0]);
        }
    }
    
    if (buttonQuestion != undefined) {
        while (buttonQuestion.length > 0) {
            buttonQuestion[0].parentNode.removeChild(buttonQuestion[0]);
        }
    }
    
}

function nextQuestion(currentIndex) {
    makeClear();
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        showQuestion(currentIndex);
    } else {
        clearQuestionHeader();
        location.href = "./result.html";


    }
}

function clearQuestionHeader() {
    const question = document.getElementsByClassName("question")[0];
    const currentQuestion = document.getElementsByClassName("current-question")[0];
    question.remove();
    currentQuestion.remove();
}
startQuiz();