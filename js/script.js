const dark_btn = document.getElementsByClassName("dark-theme")[0];
const light_btn = document.getElementsByClassName("light-theme")[0];
const cam_btn = document.getElementsByClassName("cam_btn")[0];
const start_btn = document.querySelector(".btn_div button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const webCam_selector = document.getElementById("webcam");

async function getWebCam()
{
    try{
        const videoSrc=await navigator.mediaDevices.getUserMedia({audio:true, video:true});
        var video=document.getElementById("video");
        video.srcObject=videoSrc;
    }
    catch(e){
        console.log(e);
    }
}
cam_btn.onclick=()=>{
    getWebCam();
}

dark_btn.onclick = () =>{
    document.getElementsByTagName("nav")[0].classList.add("nav_darks");
    document.getElementsByTagName("body")[0].classList.add("body_darks");
    document.getElementsByClassName("btn_div")[0].classList.add("btn_darks");
}
dark_btn.ondblclick = () =>{
    document.getElementsByTagName("nav")[0].classList.remove("nav_darks");
    document.getElementsByTagName("body")[0].classList.remove("body_darks");
    document.getElementsByClassName("btn_div")[0].classList.remove("btn_darks");
}
light_btn.onclick = () =>{
    document.getElementsByTagName("nav")[0].classList.remove("nav_darks");
    document.getElementsByTagName("body")[0].classList.remove("body_darks");
    document.getElementsByClassName("btn_div")[0].classList.remove("btn_darks");
}

start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const total_que = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }
    else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

function showQuetions(i)
{
    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>'+ questions[i].numb + ". " + questions[i].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[i].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[i].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[i].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[i].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer)
{
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; 
    const allOptions = option_list.children.length;
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }
    else if ( userAns!=correcAns )
    {
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); }

function showResult()
{
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");

    let scoreTag = '<p> You got '+ userScore +' out of '+ questions.length +'</p>';
    scoreText.innerHTML = scoreTag; 
   
}
function queCounter()
{
    let totalQueCounTag = '<h6> Total Questions : '+ questions.length +'</h6>';
    total_que.innerHTML = totalQueCounTag; 
}