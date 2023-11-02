let input = document.querySelector("#display") // display area

// to append arithmetic operators and no to display

function appendToDisplay(value) {
    if (input.textContent == 0) input.textContent = ""
    input.textContent += value
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

// double click to copy 

input.addEventListener('dblclick', () => {
    navigator.clipboard.writeText(input.textContent)
        document.querySelector('.alert').style.display = "block"
        document.querySelector('.msg').textContent = "Copied To Clipboard"
        setTimeout(() => {
            document.querySelector('.alert').style.display = "none"
        }, 3000);
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
