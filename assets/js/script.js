const timerMain = document.querySelector('.timer-main');
const timerL = document.querySelector('.timer-left');
const timerR = document.querySelector('.timer-right');

const viewerMain = document.querySelector('.timer-viewer')
const timerStart = document.querySelector('.input-start');
const timerPause = document.querySelector('.input-pause');
const timerReset = document.querySelector('.input-reset');

const viewerLeft = document.querySelector('.timerL')
const leftUpBtn = document.querySelector('.btn-l-up'); 
const leftDownBtn = document.querySelector('.btn-l-down'); 
const leftSubmitBtn = document.querySelector('.btn-l-submit'); 

const viewerRight = document.querySelector('.timerR')
const rightUpBtn = document.querySelector('.btn-r-up');
const rightDownBtn = document.querySelector('.btn-r-down');
const rightSubmitBtn = document.querySelector('.btn-r-submit');

let interval = null
let intervalBreak = null
let totalSeconds = 1500
let extraNumber = 0
let extraNumberR = 0
let countBreak = 0
let countResume = 0
let countReset = 0

function pomodoroController() {
  return {
    startAll() {
      this.buttonsLeft(),
      this.buttonsRight(),
      this.buttonsMain()
    },
    
    buttonsLeft() {
      timerL.addEventListener('click', e => {
        const el = e.target
        let viewerL = Number(viewerLeft.textContent)
        if (el.classList.contains('btn-l-up')) {
          viewerL++
          viewerLeft.textContent = viewerL
          viewerLeft.innerText = viewerL
        }
        if (el.classList.contains('btn-l-down')) {
          if(viewerL <= 0) {
            alert('[ERROR] Valor abaixo de 0!')
            return
          } 
          viewerL--
          viewerLeft.textContent = viewerL
          viewerLeft.innerText = viewerL
        }
        if (el.classList.contains('btn-l-submit')) {
          this.addNumberL()
          let convert = totalSeconds + extraNumber
          let hour = Math.floor(convert / 3600)
          let minutes = Math.floor((convert % 3600) / 60)
          let seconds = convert % 60
          let h = hour.toString().padStart(2, '0')
          let m = minutes.toString().padStart(2, '0')
          let s = seconds.toString().padStart(2, '0')
          let timer = `${h}:${m}:${s}`
          viewerMain.innerText = timer
        }
      })
    },

    buttonsRight() {
      timerR.addEventListener('click', e => {
        const el = e.target
        let viewerR = Number(viewerRight.textContent)
        if (el.classList.contains('btn-r-up')) {
          viewerR++
          viewerRight.textContent = viewerR
          viewerRight.innerText = viewerR
        }
        if (el.classList.contains('btn-r-down')) {
          if(viewerR <= 0) {
            alert('[ERROR] Valor abaixo de 0!')
            return
          } 
          viewerR--
          viewerRight.textContent = viewerR
          viewerRight.innerText = viewerR
        }
        if (el.classList.contains('btn-r-submit')) {
          this.addNumberR()
          let convert = totalSeconds + extraNumberR
          let hour = Math.floor(convert / 3600)
          let minutes = Math.floor((convert % 3600) / 60)
          let seconds = convert % 60
          let h = hour.toString().padStart(2, '0')
          let m = minutes.toString().padStart(2, '0')
          let s = seconds.toString().padStart(2, '0')
          let timer = `${h}:${m}:${s}`

        }
      })
    },

    buttonsMain() {
      timerMain.addEventListener('click', e => {
        const el = e.target
        let viewerM = Number(viewerMain.textContent)
        if (el.classList.contains('input-start')) {
          this.resumeTimer()
          if (interval !== null) return
          if (intervalBreak !== null) return
          totalSeconds = totalSeconds + extraNumber
          this.startTimer()
          this.playSound('start')
        }
        if (el.classList.contains('input-pause')) {
          this.pauseTimer()
        }
        if (el.classList.contains('input-reset')) {
          this.resetTimer()
        }
      })
    },

    startTimer() {
      interval = setInterval(() => {
        if (totalSeconds <= 0) {
        clearInterval(interval)
        countBreak++
        this.playSound('start')
        

        if (countBreak === 4) {
          document.body.classList.add('long-mode')
          this.playSound('long')
          this.longBreak()
          this.resumeTimer()
          countBreak = 0
        }else {
          this.playSound('break')
          this.break()
        }
        return
        }
        
        
        totalSeconds--
        let hour = Math.floor(totalSeconds / 3600)
        let minutes = Math.floor((totalSeconds % 3600) / 60)
        let seconds = totalSeconds % 60
        let h = hour.toString().padStart(2, '0')
        let m = minutes.toString().padStart(2, '0')
        let s = seconds.toString().padStart(2, '0')
        let timer = `${h}:${m}:${s}`
        
        viewerMain.innerText = timer // esse aqui
      }, 1000)
    },

    pauseTimer() {
      countResume++
      clearInterval(interval)
      clearInterval(intervalBreak)
      interval = null
    },

    resetTimer() {
      document.body.classList.remove('break-mode')
      document.body.classList.remove('long-mode')
      countReset++
      extraNumber = 0
      extraNumberR = 0
      viewerLeft.innerText = 0
      viewerRight.innerText = 0
      clearInterval(interval)
      clearInterval(intervalBreak)
      interval = null
      totalSeconds = 1500
      viewerMain.innerText = '00:25:00'
    },

    resumeTimer() {
      if (countResume === 1 || countReset === 1) {
        this.startTimer()
        this.playSound('start')
        countResume = 0
        countReset = 0
      }
    },
  
    playSound(type) {
      if(type === 'break') new Audio('assets/songs/finish.mp3').play()
      if(type === 'long') new Audio('assets/songs/longBreak.mp3').play()
      if(type === 'start') new Audio('assets/songs/start1.mp3').play()
    },

    break() {
      document.body.classList.add('break-mode')
      clearInterval(intervalBreak)
      totalSeconds = 300 + extraNumberR
      intervalBreak = setInterval(() => {
      
        if (totalSeconds <= 0) {
          clearInterval(intervalBreak)
          totalSeconds = 1500
          this.startTimer()
        }
        
        totalSeconds--
        let hour = Math.floor(totalSeconds / 3600)
        let minutes = Math.floor((totalSeconds % 3600) / 60)
        let seconds = totalSeconds % 60
        let h = hour.toString().padStart(2, '0')
        let m = minutes.toString().padStart(2, '0')
        let s = seconds.toString().padStart(2, '0')
        let time = `${h}:${m}:${s}`
        viewerMain.innerText = time
      }, 1000)
    },

    longBreak() {
      clearInterval(intervalBreak)
      totalSeconds = 600 + extraNumberR
      intervalBreak = setInterval(() => {
      
        if (totalSeconds <= 0) {
          clearInterval(intervalBreak)
          totalSeconds = 1500
          this.startTimer()
        }

        totalSeconds--
        let hour = Math.floor(totalSeconds / 3600)
        let minutes = Math.floor((totalSeconds % 3600) / 60)
        let seconds = totalSeconds % 60
        let h = hour.toString().padStart(2, '0')
        let m = minutes.toString().padStart(2, '0')
        let s = seconds.toString().padStart(2, '0')
        let time = `${h}:${m}:${s}`
        viewerMain.innerHTML = time
      }, 1000)

    },

    addNumberL() {
      let minutes = Number(viewerLeft.textContent)
      extraNumber = minutes * 60
    },

    addNumberR() {
      let minutes = Number(viewerRight.textContent)
      extraNumberR = minutes * 60
    }

  }
}
const pomodoro = pomodoroController()
pomodoro.startAll()

