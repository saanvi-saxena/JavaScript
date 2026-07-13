const goalInput = document.getElementById("goalInput");
const addGoalBtn = document.getElementById("addGoalBtn");
const goalList = document.getElementById("goalList");

addGoalBtn.addEventListener("click", function(){
    if(goalInput.value === ""){
        alert("Please enter a goal.");
    }
    else{
        //console.log(goalInput.value);
        const li = document.createElement("li");

        const input = document.createElement("input");
        input.type = "checkbox";
        
        const span = document.createElement("span");
        span.textContent = goalInput.value;
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        li.append(input);
        li.append(span);
        li.append(deleteBtn);

        goalList.append(li);

        goalInput.value = "";

        deleteBtn.addEventListener("click", function(){
            li.remove();
        })

        input.addEventListener("change", function(){
            if(input.checked){
                span.classList.add("completed");
            }
            else{
                span.classList.remove("completed");
            }
        })
        
    }
});

goalInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        addGoalBtn.click();
    }
});
