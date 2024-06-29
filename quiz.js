
//user answers are saved into object
var selectedOpt = {};

//questions object
var questions = {
    singleOpt1: 'What Does CSS Stand For?',
    singleOpt2: 'Which property is used to change the background color?',
    singleOpt3: 'How do you select an element with id "demo"?',
    singleOpt4: 'How do you display hyperlinks without an underline?',
    singleOpt5: 'Which CSS property controls the text size?'
}

//correct answer array
var answers = ['a','c','a','b','c']

//get buttons
var nextButton = document.getElementsByClassName('btn-next')[0];
var backButton = document.getElementsByClassName('btn-back')[0];
var submitButton = document.getElementsByClassName('btn-submit')[0];


//next button
    /*
    check which div is active
    
    get checked value from active

    move onto the next question
    */

function next(){

    //get active tab
    let activeQ = document.getElementsByClassName('active')[0];

    //get radio button value from active tab
    let inputName = activeQ.children[0].children[0].children[0].name;
    let checkedButton = document.querySelector('input[name='+inputName+']:checked')
    let checkedButtonValue = checkedButton.value;
    let qTag = document.getElementsByClassName('question')[0];
    let qNum = Number(inputName[inputName.length -1])+1
    let qInputName = "singleOpt"+ qNum
    

    
    
    //save checked value
    //move to next tab
    if(activeQ.nextElementSibling.className === 'options' && checkedButtonValue!== null && activeQ.previousElementSibling.className !== 'options'){
        selectedOpt[inputName] = checkedButtonValue;
        activeQ.classList.remove('active')
        activeQ.nextElementSibling.classList.add('active');
        console.log(activeQ.classList)
        console.log(activeQ.nextElementSibling.classList)
        document.getElementsByClassName('btn-back')[0].classList.add('btn-active')
        console.log(document.getElementsByClassName('btn-back')[0].classList)
        //let qInputName = activeQ.nextElementSibling.children[0].children[0].name;
        qTag.innerText = questions[qInputName]
    }else if(activeQ.nextElementSibling.className === 'options' && checkedButton !== null){
        //let qInputName = activeQ.nextElementSibling.children[0].children[0].name;
        qTag.innerText = questions[qInputName]
        console.log(qInputName)
        activeQ.classList.remove('active')
        activeQ.nextElementSibling.classList.add('active')
        selectedOpt[inputName] = checkedButtonValue;
        
    }

    //put submit button
    if(activeQ.nextElementSibling.nextElementSibling === null){
        document.getElementsByClassName('btn-submit')[0].classList.add('btn-active')
        nextButton.style.display = 'none'
    }
    
}

//back button
function back(){

    let activeQ = document.getElementsByClassName('active')[0];

    let inputName = activeQ.children[0].children[0].children[0].name;

    let qTag = document.getElementsByClassName('question')[0];
    let qNum = Number(inputName[inputName.length -1])-1
    let qInputName = "singleOpt"+ qNum

    if(activeQ.previousElementSibling.previousElementSibling.className !== 'options'){
        activeQ.classList.remove('active')
        activeQ.previousElementSibling.classList.add('active');
        document.getElementsByClassName('btn-back')[0].classList.remove('btn-active')
        document.getElementsByClassName('btn-submit')[0].classList.remove('btn-active')
        nextButton.style.display = 'block'
        qTag.innerText = questions['singleOpt1']
    }else if(activeQ.previousElementSibling.className === 'options'){
        activeQ.classList.remove('active')
        activeQ.previousElementSibling.classList.add('active');
        document.getElementsByClassName('btn-back')[0].classList.add('btn-active')
        document.getElementsByClassName('btn-submit')[0].classList.remove('btn-active')
        nextButton.style.display = 'block'
        qTag.innerHTML = questions[qInputName]
    }
}
//submit button
function submit(){

    let activeQ = document.getElementsByClassName('active')[0];

    //get radio button value from active tab
    let inputName = activeQ.children[0].children[0].children[0].name;
    let checkedButton = document.querySelector('input[name='+inputName+']:checked')
    let checkedButtonValue = checkedButton.value;

    if(checkedButtonValue !== null){
        selectedOpt[inputName] = checkedButtonValue;
        let qTag = document.getElementsByClassName('question')[0];
        submitButton.style.display = 'none'
        backButton.style.display = 'none'
        qTag.innerText = ""
        activeQ.classList.remove('active')

    
        let gradeImage = document.getElementsByClassName('grade-image')[0];
        let results = document.getElementsByClassName('grade')[0];
    
        let grade = calcGrade(selectedOpt);
    
        if(grade === 60){
            gradeImage.style.color = 'orangered';
            gradeImage.style.borderColor = 'orangered'
            results.style.color = 'orangered'
            gradeImage.innerText = 'Average'
        }else if(grade < 50){
            gradeImage.style.color = 'red'
            gradeImage.style.borderColor = 'red'
            results.style.color = 'red'
            gradeImage.innerText = 'Try Again'
        }
    
        results.innerText = grade+'%'
        document.getElementsByClassName('results')[0].style.display = 'flex';
        document.getElementsByClassName('eyes')[0].style.display = 'none'
    }

    
}

//calculate grade
function calcGrade(objScore){
    let tempArr = []
    let grade = 0
    for (let key in objScore) {
        tempArr.push(selectedOpt[key])
    }
    for(let i = 0; i < 5; i++){
        if(tempArr[i] === answers[i]){
            grade ++
        }
    }
    grade = (grade/5)*100
    return grade
}

//click events
nextButton.addEventListener('click', next)
backButton.addEventListener('click',back)
submitButton.addEventListener('click', submit)