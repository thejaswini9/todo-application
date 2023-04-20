let container = document.getElementById("todoItemsContainer")
let userInput = document.getElementById("todoUserInput")
let addBtn = document.getElementById("addTodoButton")
let saveBtn = document.getElementById("saveButton")


// let todoList = [{
//         text: "Learn HTML",
//         uniqueNo: 1
//     }, {
//         text: "Learn CSS",
//         uniqueNo: 2
//     },
//     {
//         text: "Learn Javascript",
//         uniqueNo: 3
//     }
// ] 
function getTodoFromLocalStorage() {
    let stringified = localStorage.getItem("todoList")
    let parsed = JSON.parse(stringified)
    if (parsed === null) {
        return []
    } else {
        return parsed
    }
}

let todoList = getTodoFromLocalStorage()
saveButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList))
    console.log(JSON.stringify(todoList))
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let todoEl = document.getElementById(checkboxId)
    let labelEl = document.getElementById(labelId)
    labelEl.classList.toggle("checked")
    let todoIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo
        if (eachTodoId === todoId) {
            return true
        } else {
            return false
        }
    })
    let todoObj = todoList[todoIndex]
    // console.log(todoObj) 
    if (todoObj.isChecked === true) {
        todoObj.isChecked = false
    } else {
        todoObj.isChecked = true
    }




}

function onDeleteTodo(todoId) {
    let listEl = document.getElementById(todoId)
    // console.log(listEl)
    container.removeChild(listEl)
    let indexing = todoList.findIndex(function(item) {
        let itemId = "todo" + item.uniqueNo
        // console.log(todoId) 
        // console.log(itemId)
        if (itemId === todoId) {
            return true
        } else {
            return false
        }

    })
    // console.log(indexing) 
    todoList.splice(indexing, 1)
    console.log(todoList)
}


function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo
    let todoId = "todo" + todo.uniqueNo
    let labelId = "label" + todo.uniqueNo

    let listElement = document.createElement("li")
    listElement.id = todoId
    listElement.classList.add("todo-item-container", "d-flex", "flex-row")
    container.appendChild(listElement)


    let inputElement = document.createElement("input")
    inputElement.type = "checkbox"
    inputElement.checked = todo.isChecked
    inputElement.id = checkboxId
    inputElement.classList.add("checkbox-input")
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId)
    }
    listElement.appendChild(inputElement)

    let labelCont = document.createElement("div")
    labelCont.classList.add("label-container", "d-flex", "flex-row")
    listElement.appendChild(labelCont)

    let labelElement = document.createElement("label")
    labelElement.classList.add("checkbox-label")

    labelElement.id = labelId
    labelElement.setAttribute("for", checkboxId)
    labelElement.textContent = todo.text
    if (todo.isChecked === true) {
        labelElement.classList.add("checked")
    } else {
        labelElement.classList.remove("checked")
    }
    labelCont.appendChild(labelElement)

    let deleteCont = document.createElement("div")
    deleteCont.classList.add("delete-icon-container")

    labelCont.appendChild(deleteCont)

    let deleteIcon = document.createElement("i")
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon")
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId)
    }
    deleteCont.appendChild(deleteIcon)


}

function onAddTodo() {
    let newText = userInput.value
    let newNo = todoList.length
    if (newText === "") {
        alert("Enter a valid Text")
        return
    }
    let newTodo = {
        text: newText,
        uniqueNo: newNo + 1,
        isChecked: false
    }
    // console.log(newTodo)
    todoList.push(newTodo)
    createAndAppendTodo(newTodo)
    userInput.value = ""

}

addBtn.onclick = function() {
    onAddTodo()

}


for (let todo of todoList) {
    createAndAppendTodo(todo)
}