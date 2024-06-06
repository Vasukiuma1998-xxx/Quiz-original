let allquestions=[]
const ttlquestioncount=10;
let selectedquestion=[]
let currentindex=0;
let mark=0;
let userselectedanswer=[]

const selectRandomquestion=()=>{
    let shuffledquestion=allquestions.sort(()=>
        {
            return Math.floor(Math.random()*10)
        })
        selectedquestion=shuffledquestion.slice(0,ttlquestioncount)
        
}


const showquestion=()=>{
    const currentquestion=selectedquestion[currentindex]
    const questioncontainer=document.getElementById("question-container")


    questioncontainer.innerHTML=`
    <h1  style="font-size: 20px;">Question ${currentindex+1}:${currentquestion.question}</h1>
    ${currentquestion.answers.map((ans,ind)=>{
        return`<div  style="margin: 10px">
        <label style="margin: 10px;"><input style="margin-right: 10px;" type="radio" name="answer"value="${ind}" ${userselectedanswer[currentindex] == ind ? 'checked' : ''}>${ans}</label></div>`
    })
    .join("")
    }

    `
    //previous button
    if(currentindex==0){
        document.getElementById("prev").style.display="none"
    }
    else{
        document.getElementById("prev").style.display="inline"
    }
    //for next and submit button
    if(currentindex==ttlquestioncount-1)
        {
            document.getElementById("next").style.display="none"
            document.getElementById("submit").style.display="inline"
        }
        else{
            document.getElementById("next").style.display="inline"
            document.getElementById("submit").style.display="none"
        }
    



}
// show answer
 const showanswer=()=>{
    document.getElementById("answercontainer").innerHTML=selectedquestion.map((question,qno)=>
   `
    <div >
    <p style="margin-top: 10px;">Question  ${qno+1}:${question.question}</p>

    ${question.answers.map((ans,ind)=>
    {
        let color="black"
        if(question.correct==ind){
            color="green"
        }
        else if(userselectedanswer[qno]==ind )
            {
                color="red"
            }


        return `<p style="color:${color}">${ans}</p>`
    }).join("")}
    </div>
    `
   
   
    ).join("")
 }


const initialize = (path) => {
    if (path == "Landing.html") 
        {
        document.getElementById('userform').addEventListener('submit', (e) => {
            e.preventDefault();

            const userName = document.getElementById("name").value
            const userEmail = document.getElementById("mail").value
            Loadpage("Instruction.html")

        })
    }

   else if(path=="Instruction.html"){
    document.getElementById("start-btn").addEventListener("click",()=>{
        Loadpage("Quiz.html")
    })
   }
   else if(path=="Quiz.html"){
    showquestion()

    document.getElementById("next").addEventListener('click',()=>{
       let selectedAnswer=document.querySelector('input[name="answer"]:checked')

        if(selectedAnswer.value==selectedquestion[currentindex].correct)
            {
                mark++;
            }
        
            userselectedanswer[currentindex]=selectedAnswer.value;
            currentindex++;
            if(currentindex<ttlquestioncount)
                {
                    showquestion()
                }
           
            
    })
    document.getElementById("prev").addEventListener("click",()=>{
        let selectedAnswer=document.querySelector('input[name="answer"]:checked')
        if(selectedAnswer)
            {
                userselectedanswer[currentindex]=selectedAnswer.value;
            }
     currentindex--;
     showquestion()
    })
    document.getElementById("submit").addEventListener("click",()=>{
        let selectedAnswer=document.querySelector('input[name="answer"]:checked')
        if(selectedAnswer.value==selectedquestion[currentindex].correct)
            {
                mark++;
            }
        
            userselectedanswer[currentindex]=selectedAnswer.value;
            Loadpage("Result.html")
    })



    
   }
   else if(path=="Result.html"){
    document.getElementById("mark").textContent=`Your score is ${mark}/${ttlquestioncount}`

    document.getElementById("viewanswer").addEventListener("click",()=>{

        Loadpage("Answer.html")
    }
    )
   
}
else if(path=="Answer.html"){
    showanswer()
}

}



const Loadpage = (path) => {
    fetch(`./pages/${path}`)
        .then((data) => data.text())
        .then((html) => {
            document.getElementById("app").innerHTML = html;
            initialize(path)

        })
        .catch((err) => {
            console.log(err);
        })

}

document.addEventListener("DOMContentLoaded", () => {
    Loadpage("Landing.html")
    fetch("questions.json")
    .then((data)=>data.json())
    .then((questions)=>{
        allquestions=questions;
        selectRandomquestion();
    })

})

