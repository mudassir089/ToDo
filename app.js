var todo_item = document.getElementById("todo-item");
var list = document.getElementById("list");

function addTodo() {
  //Create li tage using textNode
  var li = document.createElement("li");
  var text = document.createTextNode(todo_item.value);
  if (todo_item.value != "") {
    list.appendChild(li);
    li.appendChild(text);
    todo_item.value = "";
  } else {
    todo_item.setAttribute("placeholder", "type somthing");
  }

  // Create Delete button
  var delBtn = document.createElement("button");
  var delText = document.createTextNode("Del");
  li.appendChild(delBtn);
  delBtn.appendChild(delText);
  delBtn.setAttribute("onclick", "deleteItem(this)");
  delBtn.setAttribute("class", "del_btn");

  //Creat Edit Button
  var editBtn = document.createElement("button");
  var editText = document.createTextNode("Edit");
  li.appendChild(editBtn);
  editBtn.appendChild(editText);
  editBtn.setAttribute("onclick", "editItem(this)");
  editBtn.setAttribute("class", "edit_btn");
}

//delete functing using this method
function deleteItem(e) {
  e.parentNode.remove();
}

//edit item using function
function editItem(e) {
  var edit = e.parentNode.firstChild.nodeValue;
  e.parentNode.firstChild.nodeValue = prompt("Edit Your Item", edit);
}

//delete All function
function deleteAll() {
  list.innerHTML = "";
}
