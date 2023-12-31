let input = document.querySelector("#display") // display area

// to append arithmetic operators and no to display

function appendToDisplay(value) {
    if (input.textContent == 0) input.textContent = ""
    input.textContent += value
    input.scrollLeft = input.scrollWidth;
}

// clear Display

function clearDisplay() {
    input.textContent = "0"
}

// result and store history to local storage

let historyArray = []

function result() {
    try {
        let original = input.textContent
        input.textContent = input.textContent.replace(/x/g, "*").replace(/%/g, "/100*");
        input.textContent = eval(input.textContent)
        let history = {
            equation: `${original}`,
            result: `${input.textContent}`
        }
        let historyArray = JSON.parse(localStorage.getItem('history') || '[]')
        historyArray.push(history);
        localStorage.setItem("history", JSON.stringify(historyArray));
        showHistory()
    } catch (error) {
        if (error.name == 'QuotaExceededError') {
            historyArray.pop()
        }
        document.querySelector('.alert').style.display = "block"
        document.querySelector('.msg').textContent = "Wrong Expression"
        setTimeout(() => {
            document.querySelector('.alert').style.display = "none"
        }, 3000);
        input.textContent = "0"
    }
}

// hold to copy

let pressTimer;

input.addEventListener('mousedown', () => {
    pressTimer = setTimeout(() => {
        navigator.clipboard.writeText(input.textContent)
        document.querySelector('.alert').style.display = "block"
        document.querySelector('.msg').textContent = "Copied To Clipboard"
        setTimeout(() => {
            document.querySelector('.alert').style.display = "none"
        }, 3000);
    }, 1700);
})

input.addEventListener('mouseup', () => {
    clearTimeout(pressTimer);
  })


// history

const history = document.querySelector(".history")
history.addEventListener('dblclick',()=>{
    history.style.display="none"   
})


document.getElementById("History").addEventListener('click',()=>{
  history.style.display="flex"
})

function showHistory() {
    let historyArray = JSON.parse(localStorage.getItem('history'));
     const show = document.querySelector('.show')
    if (historyArray && historyArray.length > 0) {
        for (let i = 0; i < historyArray.length; i++) {
            show.style.display = "block"
            let entry = historyArray[i];
            let p = document.createElement('p');
            p.classList.add('p-2')
            p.textContent = `${entry.equation} = ${entry.result}`;
            show.appendChild(p);
        }
    }
}

showHistory();

// Click to delete

input.addEventListener('click',()=>{
    input.textContent =  input.textContent.slice(0,-1)
    if(input.textContent.length==0){
        input.textContent="0"
    }
})

// swipe to delete

let touchStartX = 0;
let touchEndX = 0;

input.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

input.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;

    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > 30) { 
        input.textContent =  input.textContent.slice(0,-1)
    if(input.textContent.length==0){
        input.textContent="0"
    }
    }
});


