var todo_item = document.getElementById("todo-item");
var list = document.getElementById("list");

var database = firebase.database().ref("todos");
todo_item.value = "";

//Firebase Set Data
function addTodo() {
  var key = database.push().key;

  var todo = {
    value: todo_item.value,
    key: key,
  };
  if (todo_item.value != "") {
    database.child(key).set(todo);
    todo_item.value = "";
  } else {
    todo_item.setAttribute("placeholder", "type somthing");
  }
}

//Firebase Get Data

database.on("child_added", function (data) {
  //Create li tage using textNode
  var li = document.createElement("li");
  var text = document.createTextNode(data.val().value);
  list.appendChild(li);
  li.appendChild(text);

  // Create Delete button and firebase set Delete key function
  var delBtn = document.createElement("button");
  var delText = document.createTextNode("Del");
  li.appendChild(delBtn);
  delBtn.appendChild(delText);
  delBtn.setAttribute("id", data.val().key);
  delBtn.setAttribute("onclick", "deleteItem(this)");
  delBtn.setAttribute("class", "del_btn");

  //Creat Edit Button
  var editBtn = document.createElement("button");
  var editText = document.createTextNode("Edit");
  li.appendChild(editBtn);
  editBtn.appendChild(editText);
  editBtn.setAttribute("id", data.val().key);
  editBtn.setAttribute("onclick", "editItem(this)");
  editBtn.setAttribute("class", "edit_btn");
});

//delete functing using this method and firebase
function deleteItem(e) {
  database.child(e.id).remove();
  e.parentNode.remove();
}

//edit item using function and firebase
function editItem(e) {
  var edit = prompt("Enter updated value", e.parentNode.firstChild.nodeValue);
  var editTodo = {
    value: edit,
    key: e.id,
  };
  database.child(e.id).set(editTodo);
  e.parentNode.firstChild.nodeValue = edit;
}

//delete All todo list and firebase data
function deleteAll() {
  database.remove();
  list.innerHTML = "";
}
