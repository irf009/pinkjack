//game before started
const playBtn = document.querySelector(`.play`);
const mainScreen = document.querySelector(`.main-screen`);
const goOnBtn = document.querySelector(`.continue`);
const enterValue = document.querySelector(`.enter-value`);
const amountContainer = document.querySelector(`.amount-div`);
const stopBtn = document.querySelector(`.stop`);
let gameStarted = false;
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const meValue = document.querySelector(`.me-score`);
const dealerValue = document.querySelector(`.dealer-score`);
const playAgain = document.querySelector(`.play-again`);
const gameResult = document.querySelector(`.game-result`);
let meValueBack;
let meValueFront;
let dealerValueBack;
let dealerValueFront;
let dealerValueFrontEnd;
let meNum1;
let meNum2;
let dealerNum1;
let dealerNum2;
let gameEnd = false;

playBtn.addEventListener(`click`, function (e) {
	playBtn.classList.add(`noneO`);
	mainScreen.classList.add(`show-main-screen`);
	amountContainer.classList.remove(`none`);
	goOnBtn.classList.remove(`none`);
	const amountValue = document.querySelector(`.amount`);
	amountValue.value = 0;
	gameStarted = false;
	gameEnd = false;
	meValue.innerHTML = `??`;
	dealerValue.innerHTML = `??`;
});

goOnBtn.addEventListener(`click`, function (e) {
	const amountValue = document.querySelector(`.amount`).value;
	if (!amountValue || amountValue <= 0) {
		enterValue.classList.remove(`none`);
	} else {
		if (!gameStarted) {
			enterValue.classList.add(`none`);
			amountContainer.classList.add(`none`);
			stopBtn.classList.remove(`none`);
			firstPress();
			gameStarted = true;
		} else {
			if (!gameEnd) {
				gameContinue();
			}
		}
	}
	gameOtoEnd();
});

stopBtn.addEventListener(`click`, function () {
	gameManualEnd();
	if (meValueBack == dealerValueBack) {
		gameResult.innerHTML = `Draw`;
		gameResult.classList.remove(`none`);
		gameResult.classList.add(`draw`);
	} else if (meValueBack < dealerValueBack && dealerValueBack <= 21) {
		gameResult.innerHTML = `You Lost`;
		gameResult.classList.remove(`none`);
		gameResult.classList.add(`lost`);
	} else {
		gameResult.innerHTML = `You Won`;
		gameResult.classList.remove(`none`);
		gameResult.classList.add(`won`);
	}
});

playAgain.addEventListener(`click`, function () {
	playAgain.classList.add(`none`);
	playBtn.classList.remove(`noneO`);
	mainScreen.classList.remove(`show-main-screen`);
	gameResult.classList.add(`none`);
	gameResult.classList.remove(`draw`);
	gameResult.classList.remove(`won`);
	gameResult.classList.remove(`lost`);
});

//
function firstPress() {
	meNum1 = numbers[getRandomNumber()];
	meNum2 = numbers[getRandomNumber()];
	meValueBack = meNum1 + meNum2;
	meValueFront = `${meNum1} + ${meNum2}`;
	meValue.innerHTML = meValueFront;
	dealerNum1 = numbers[getRandomNumber()];
	dealerNum2 = numbers[getRandomNumber()];
	dealerValueBack = dealerNum1 + dealerNum2;
	dealerValueFront = `${dealerNum1} + ??`;
	dealerValueFrontEnd = `${dealerNum1} + ${dealerNum2}`;
	dealerValue.innerHTML = dealerValueFront;
}

function getRandomNumber() {
	return Math.floor(Math.random() * numbers.length);
}
//game after started

function gameContinue() {
	let meNum = numbers[getRandomNumber()];
	meValueFront += ` + ${meNum}`;
	meValueBack += meNum;
	let dealerNum = numbers[getRandomNumber()];
	dealerValueFrontEnd += ` + ${dealerNum}`;
	dealerValueBack += dealerNum;
	meValue.innerHTML = meValueFront;
	dealerValue.innerHTML = dealerValueFront;
}
//game ends

function gameOtoEnd() {
	if (meValueBack > 21) {
		meValueFront += ` = ${meValueBack}`;
		gameEnd = true;
		dealerValueFrontEnd += ` = ${dealerValueBack}`;
		meValue.innerHTML = meValueFront;
		dealerValue.innerHTML = dealerValueFrontEnd;
		goOnBtn.classList.add(`none`);
		stopBtn.classList.add(`none`);
		playAgain.classList.remove(`none`);
		if (dealerValueBack > 21) {
			gameResult.innerHTML = `Draw`;
			gameResult.classList.remove(`none`);
			gameResult.classList.add(`draw`);
		} else {
			gameResult.innerHTML = `You Lost`;
			gameResult.classList.remove(`none`);
			gameResult.classList.add(`lost`);
		}
	}
}
function gameManualEnd() {
	meValueFront += ` = ${meValueBack}`;
	gameEnd = true;
	dealerValueFrontEnd += ` = ${dealerValueBack}`;
	meValue.innerHTML = meValueFront;
	dealerValue.innerHTML = dealerValueFrontEnd;
	goOnBtn.classList.add(`none`);
	stopBtn.classList.add(`none`);
	playAgain.classList.remove(`none`);
}
