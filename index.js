
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;

}

let questions = [
    new Question("Which is the silicon city of india", ["Banglore", "Delhi", "Mumbai", "Kolkata"], "Banglore"),
    new Question("Which language is used for styling web pages", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("HTML is a:", ["Programming Language", "Markup Language", "Script Language", "None of the these"], "Markup Language"),
    new Question("Javascript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language"),

];
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}

Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}


var quiz = new Quiz(questions);

//quiz.score;

function loadQuestions() {

    // check that do we came to an end of question so that prepare final score
    if (quiz.isEnded()) {
        showscores();
    } else {
        //show questions
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionByIndex().text;

        // show choices\
        var choices = quiz.getQuestionByIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var ele = document.getElementById("choice" + i);
            ele.innerHTML = choices[i];

            // add listeners to the button
            handleOptionButton("btn" + i, choices[i])
        }

        showProgress();
    }
}

function showscores() {
    var quizOverHtml = "<h1>Result</h1>";
    quizOverHtml += "<h2 id='score'> your Score: " + quiz.score + ". And mark percentage is: " + (quiz.score / quiz.questions.length * 100) + "%" + "</h2>";
    var ele = document.getElementById("quiz");
    ele.innerHTML = quizOverHtml;
}


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question" + currentQuestionNumber + " of " + quiz.questions.length;
}

function handleOptionButton(id, choice) {
    // get the element by id 
    // add onclick listener to ti
    // inside logic should evaluate the answer and increment the score and questionIndex
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();

    }
}
loadQuestions();

