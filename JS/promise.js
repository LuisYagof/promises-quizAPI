const QUESTIONS_API_KEY = "pholqlmD3g0GrFtOWGpN3Oqqr2D8cuZXmGzsp8e7";
const INPUTquestions = document.querySelector('#inputQuestions')
const SEARCHbtn = document.querySelector('#searchBTN')
const WRAPPERresult = document.querySelector('#wrapperResult')

function getQuestions(maxNumberQuestions = 5) {
	return new Promise((resolve, reject) => {
		if (!QUESTIONS_API_KEY)
			alert("An API KEY must be provided");
		else if (maxNumberQuestions < 1)
			alert("The number of questions must be greater than 0");
		else {
			fetch(`https://quizapi.io/api/v1/questions?apiKey=${QUESTIONS_API_KEY}&category=code&difficulty=Easy&limit=${maxNumberQuestions}&tags=JavaScript`)
			.then(response => response.json())
			.then(questions => resolve(questions))
			.catch(error => reject(error));
		}
	});
}

function printQuestion (data){
	let wrap = document.createElement("div")
	wrap.setAttribute("class", "wrap")
	WRAPPERresult.appendChild(wrap)

	let quesBox = document.createElement("div")
	quesBox.setAttribute("class", "quesBox")
	wrap.appendChild(quesBox)

	let ansBox = document.createElement("div")
	ansBox.setAttribute("class", "ansBox")
	wrap.appendChild(ansBox)

	let question = document.createElement("h4")
	let contQuest = document.createTextNode(data.question)
	question.appendChild(contQuest)
	quesBox.appendChild(question)

	let ansA = document.createElement("p")
	let contAnsA = document.createTextNode(data.answers.answer_a)
	ansA.appendChild(contAnsA)
	ansBox.appendChild(ansA)

	let ansB = document.createElement("p")
	let contAnsB = document.createTextNode(data.answers.answer_b)
	ansB.appendChild(contAnsB)
	ansBox.appendChild(ansB)

	let ansC = document.createElement("p")
	let contAnsC = document.createTextNode(data.answers.answer_c)
	ansC.appendChild(contAnsC)
	ansBox.appendChild(ansC)

}

SEARCHbtn.addEventListener("click", function(){
	getQuestions(INPUTquestions.value)
	.then(data => data.map(elem => printQuestion(elem)))
})