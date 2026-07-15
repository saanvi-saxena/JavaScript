const goalInput = document.getElementById("goalInput");
const addGoalBtn = document.getElementById("addGoalBtn");
const goalList = document.getElementById("goalList");
const progressText = document.querySelector("#progressText");
const progressLevel = document.querySelector(".progressLevel");

const goals = [];

function saveGoals(){
    localStorage.setItem("goals", JSON.stringify(goals));
}

function updateProgress(){
    const checkboxes = document.querySelectorAll('#goalList input[type="checkbox"]');
    let completedGoals = 0;
    checkboxes.forEach(function(checkbox){
        if(checkbox.checked){
            completedGoals++;
        }
    });

    let percentage;
    if(checkboxes.length === 0){
        percentage = 0;
    }
    else{
        percentage = Math.round((completedGoals/checkboxes.length)*100);
    }

    progressText.textContent = completedGoals + "/" + checkboxes.length + " Completed (" + percentage + "%)";
    progressLevel.style.width = percentage + "%";
}

function createGoal(goal){
    const li = document.createElement("li");

        const input = document.createElement("input");
        input.type = "checkbox";
        
        const span = document.createElement("span");
        span.textContent = goal.text;

        input.checked = goal.completed;

        if(goal.completed){
            span.classList.add("completed");
        }

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        li.append(input);
        li.append(span);
        li.append(editBtn);
        li.append(deleteBtn);

        goalList.append(li);
        

        //goalInput.value = ""; delete

        editBtn.addEventListener("click", function(){
            const newGoal = prompt("Edit your goal." , goal.text);
            if (newGoal !== null && newGoal.trim() != ""){
                goal.text = newGoal.trim();
                span.textContent = newGoal.trim();
                saveGoals();
            }
        });

        deleteBtn.addEventListener("click", function(){
            const index = goals.indexOf(goal);
            if(index !== -1){
                goals.splice(index, 1);
            }
            saveGoals();
            li.remove();
            updateProgress();
        });

        input.addEventListener("change", function(){
            if(input.checked){
                span.classList.add("completed");
                goal.completed = true;
            }
            else{
                span.classList.remove("completed");
                goal.completed = false;
            }

            saveGoals();
            updateProgress();
        });
};

addGoalBtn.addEventListener("click", function(){
    if(goalInput.value === ""){
        alert("Please enter a goal.");
    }
    else{
        //console.log(goalInput.value);
        goals.push({
            text: goalInput.value,
            completed: false
        });

        saveGoals();
        //console.log(goals);

        createGoal(goals[goals.length-1]);
        goalInput.value = "";
        updateProgress();
    }
});

goalInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        addGoalBtn.click();
    }
});

const savedGoals = JSON.parse(localStorage.getItem("goals")) || [];

savedGoals.forEach(function(goal){
    goals.push(goal);
    createGoal(goal);
});

updateProgress();

