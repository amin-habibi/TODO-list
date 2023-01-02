window.addEventListener("load", () => {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    const nameInput =  document.querySelector("#name");
    const newTodoForm = document.querySelector("#new-todo-form");

    const userName = localStorage.getItem("username") || "";

    nameInput.value = userName;

    nameInput.addEventListener("change", e => {
        localStorage.setItem(userName, e.target.value);
    })

    newTodoForm.addEventListener("submit", e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done:false,
            createdAt: new Date().getTime()           
        }

        todos.push(todo);

        localStorage.setItem("todos", JSON.stringify(todos));

        e.target.reset;

        DisplayTodos()
    })
})

function DisplayTodos(){
    const todolist = document.querySelector("#todo-list");

    todolist.innerHTML = "";

    todos.forEach(todo => {
        const todoitem = document.createElement("div");    
        todoitem.classList.add("todo-item")

        const label = document.createElement("label");
        const input = document.createElement("input");
        const span = document.createElement("span");
        const content = document.createElement("div");
        const action = document.createElement("div");
        const edit = document.createElement("button");
        const deletebutton = document.createElement("button");

        input.type = "checkbox";
        input.checked = todo.done;
        span.classList.add("bubble");

        if (todo.category == "personal"){
            span.classList.add("personal");
        }
        else{
            span.classList.add("business");
        }

        content.classList.add("todo-content");
        action.classList.add("actions");
        edit.classList.add("edit");
        deletebutton.classList.add("delete");

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = "Edit";
        deletebutton.innerHTML = "Delete";

        label.appendChild(input);
        label.appendChild(span);
        action.appendChild(edit);
        action.appendChild(deletebutton);
        todoitem.append(label);
        todoitem.append(content);
        todoitem.append(action);

        todolist.appendChild(todoitem);

        if(todo.done){
            todoitem.classList.add("done");
        }

        input.addEventListener("click", e =>{
            todo.done = e.target.checked;
            localStorage.setItem("todos", JSON.stringify(todos));

            if(todo.done){
                todoitem.classList.add("done")
            }else{
                todoitem.classList.remove("done")
            }

            DisplayTodos()
        })

        edit.addEventListener("click", e=>{
            const input = content.querySelector("input");
            // input.readOnly = false;
            input.removeAttribute("readonly");
            input.focus();
            input.addEventListener("blur", e=>{
                input.setAttribute("readonly", true);
                todo.content = e.target.value;
                localStorage.setItem("todos", JSON.stringify(todos));
                DisplayTodos()
            })
        })

        deletebutton.addEventListener("click", e =>{
            todos = todos.filter(t => t != todo);
            localStorage.setItem("todos", JSON.stringify(todos));
            DisplayTodos()
        })
        



    });
}