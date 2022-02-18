const startBtn = document.querySelector("#start")
const screens = document.querySelectorAll(".screen")
const timeList = document.querySelector(".time-list")
const timeEL = document.querySelector("#time")
const board = document.querySelector("#board")
let time = 0
let score = 0

startBtn.addEventListener("click", (event) => {
event.preventDefault()
screens[0].classList.add("up")
})

timeList.addEventListener("click", event => {
    if (event.target.classList.contains("time-btn")) {
        time = parseInt(event.target.getAttribute("data-time"))
        screens[1].classList.add("up")
        startGame()
    }
})

board.addEventListener("click", event => {
    if (event.target.classList.contains("circle")) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})



function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0 ) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
    
}   

function setTime(value) {
    timeEL.innerHTML = `00:${value}`
}

function finishGame() {
    timeEL.parentElement.classList.add("hide")
    board.innerHTML = `<h1>Ваш счет: <span class = "primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement("div")
    const size = getRandomNumber(10, 60)
    const {height, width} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width-size)
    const y = getRandomNumber(0, height-size)
    const color = getRandomColor()

    circle.classList.add("circle")
    circle.style.background = `${color}`
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)
}
    

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}


function getRandomColor() {
    const colorsArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
    let hexCode = "#"
    for (i = 0; i < 6; i++) {
        hexCode += colorsArr[Math.floor(Math.random()*colorsArr.length)]
    }
    return hexCode
}