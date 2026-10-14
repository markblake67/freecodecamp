const questions = [
  {
    category: "PCo",
    question: "fav color ?",
    choices: ['Red', 'Black', 'Both'],
    answer: 'Red'
  },
  {
    category: "PCa",
    question: "Fav car ?",
    choices: ['Honda', 'BMW', 'both'],
    answer: 'Honda'
  },
  {
    category: "PB",
    question: "Fav brand ?",
    choices: ['Amazon', 'Google', 'Both'],
    answer: 'Google'
  },
  {
    category: "PF",
    question: "Fav fruit ?",
    choices: ['Apple', 'Grapes', 'Mango'],
    answer: 'Mango'
  },
  {
    category: "PH",
    question: "fav hobby ?",
    choices: ['Singing', 'Coding', 'Both'],
    answer: 'Both'
  }
];


//gets a random question 
function getRandomQuestion(quest) {
  let randomQuest = Math.floor(Math.random() * quest.length);
  return quest[randomQuest]
}



//gets a random choice need to call using something like below
function getRandomComputerChoice(quest) {
  let randChoice = Math.floor(Math.random() * quest.length);
  return quest[randChoice]
}

//checks the results of the random question matches the computer choice
const getResults = (quest, choice) => {

  if (choice === quest.answer) {
    return "The computer's choice is correct!"
  }
  return `The computer's choice is wrong. The correct answer is: ${quest.answer}`
}

let randQuest = getRandomQuestion(questions) //gets the random question in a variable
let randChoice = getRandomComputerChoice(randQuest.choices) //chooses random choice from those the randomly chosen question

console.log(getResults(randQuest, randChoice))//checks results




