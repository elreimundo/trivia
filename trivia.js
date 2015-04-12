;(function (){

  function TriviaGame(questions, element) {
    this.model = new TriviaGame.Model(questions);
    this.view  = new TriviaGame.View(element);
    this.renderNextQuestion();
  }

  TriviaGame.prototype.renderNextQuestion = function() {
    this.view.render(this.model.pickAQuestion());
  }

  TriviaGame.Model = function(questions) {
    this.questions = questions;
  }

  TriviaGame.Model.prototype.pickAQuestion = function() {
    var indexToReturn = Math.floor(Math.random() * this.questions.length);
    return this.questions[indexToReturn];
  }

  TriviaGame.View  = function(element) {
    this.el = element;
  }

  TriviaGame.View.prototype.render = function(question) {
    this.el.innerHTML = '';

    var questionText = question.question;
    var questionList = document.createElement('ul');
    var questionEl = document.createElement('p');

    questionEl.innerText = questionText;
    questionList.appendChild(questionEl);
    this.el.appendChild(questionList);

    for (var i = 0; i < question.answers.length; i++) {
      var answerObj = question.answers[i];
      var li = document.createElement('li');
      li.innerText = answerObj.answer;
      var functionToRunLater = this.answerListener(answerObj);
      li.addEventListener('click', functionToRunLater);
      questionList.appendChild(li);
    }
    console.log(i);
  }

  TriviaGame.View.prototype.answerListener = function(answerObj) {
    return function() {
      alert(answerObj.correct ? 'you got it!' : 'oh noes!');
    }
  }

  var questions = [
    {
      question: 'What is the capital of California?',
      answers: [
        { answer: 'Los Angeles' },
        { answer: 'San Francisco' },
        { answer: 'Fresno' },
        { answer: 'Sacramento', correct: true }
      ]
    },
    {
      question: 'How many licks does it take to get to the tootsie roll center of a tootsie pop?',
      answers: [
        { answer: '1' },
        { answer: '2' },
        { answer: '3', correct: true },
        { answer: 'the world may never know'}
      ]
    },
    {
      question: 'Which of the following JS commands will return 4?',
      answers: [
        { answer: '"3" + 1' },
        { answer: '"5" - 1', correct: true},
        { answer: '[1,2,3,4,5][4]' },
        { answer: 'var x = {}; x["the-number-four"] = 4; x.the-number-four'}
      ]
    }
  ];
  var gameElement = document.getElementsByClassName('game')[0];
  game = new TriviaGame(questions, gameElement);

  var button = document.createElement('button');
  button.innerText = 'Get a new question!';
  button.addEventListener('click', function() {
    game.renderNextQuestion();
  });
  document.body.appendChild(button);
})();