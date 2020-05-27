document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelector('span')
  const startBtn = document.querySelector('.start')

  const width = 100
  let currentIndex = 0
  let appleIndex = 0
  let currentSnake = [2,1,0]
  let direction = 1
  let score = 0
  let speed = 0.9
  let intervalTime = 0
  let interval = 0

  //Reset or Start Game
  function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2,1,0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
  }

  function moveOutcomes() {

    //Boundaries
    if (
      (currentSnake[0] + width >= (width * width) && direction === width ) || //bottom
      (currentSnake[0] % width === width -1 && direction === 1) || //right
      (currentSnake[0] % width === 0 && direction === -1) || //left
      (currentSnake[0] - width < 0 && direction === -width) ||  //top
      squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
    ) {
      return clearInterval(interval) //clear the interval
    }

    const tail = currentSnake.pop() //removes last ite of the array and shows it
    squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
    currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array

    //deals with snake getting apple
    if(squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple')
      squares[tail].classList.add('snake')
      currentSnake.push(tail)
      randomApple()
      score++
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
  }

  function randomApple() {
    do{
      appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
    squares[appleIndex].classList.add('apple')
  }


  //assign functions to keycodes
  function control(e) {
    squares[currentIndex].classList.remove('snake') //remove the class of snake from ALL the squares.

    if(e.keyCode === 68) {
      direction = 1 //press d, the snake will go right one
    } else if (e.keyCode === 87) {
      direction = -45 //press w arrow, the snake will go back 100 divs, appearing to go up
    } else if (e.keyCode === 65) {
      direction = -1 //press a, the snake will go left one div
    } else if (e.keyCode === 83) {
      direction = +45 //press s, the snake head will instantly appear in the div 100 divs 
    }
  }

  document.addEventListener('keyup', control)
  startBtn.addEventListener('click', startGame)
})