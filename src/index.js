const greetingDiv = document.querySelector(".js-greeting"),
  sayHello = greetingDiv.querySelector(".js-sayHello"),
  userNameForm = greetingDiv.querySelector(".js-nameForm"),
  userNameInp = userNameForm.querySelector("input"),
  toDosDiv = document.querySelector(".js-toDos"),
  toDoForm = document.createElement("form"),
  toDoInp = document.createElement("input");

const USER_NAME_LS = "USER_NAME",
  TODO_LS = "TODO";

let toDos = [];

function finishToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  li.remove();
  const cleaned = toDos.filter(function (element) {
    return element.id !== parseInt(li.id);
  });
  toDos = cleaned;
  saveToDos();
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  li.remove();
  const cleaned = toDos.filter(function (element) {
    return element.id !== parseInt(li.id);
  });
  toDos = cleaned;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function handleSubmitToDo(event) {
  event.preventDefault();
  const currentValue = toDoInp.value;
  paintToDo(currentValue);
  toDoInp.value = "";
}

function askToDo() {
  const ask = document.createElement("h2");

  ask.innerText = "What is your main focus for today?";
  toDosDiv.appendChild(ask);
  toDoForm.appendChild(toDoInp);
  toDosDiv.appendChild(toDoForm);
  toDoForm.addEventListener("submit", handleSubmitToDo);
}

function paintName() {
  const name = localStorage.getItem(USER_NAME_LS);
  sayHello.innerText = name;
}

function paintToDo(text) {
  const li = document.createElement("li");
  const content = document.createElement("span");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  delBtn.addEventListener("click", deleteToDo);
  checkBtn.addEventListener("click", finishToDo);

  const time = new Date();
  const id = time.getTime();

  content.innerText = text;
  delBtn.innerText = "✖️";
  checkBtn.innerText = "✔️";

  li.appendChild(content);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.id = id;

  toDosDiv.appendChild(li);

  const toDoObj = {
    text: text,
    id: id
  };
  toDos.push(toDoObj);
  saveToDos();
}

function saveName() {
  const name = userNameInp.value;
  localStorage.setItem(USER_NAME_LS, name);
}

function loadState() {
  const userName = localStorage.getItem(USER_NAME_LS);
  const userToDos = localStorage.getItem(TODO_LS);
  if (userName !== null) {
    const parsedUserName = userName;
    greetingDiv.removeChild(userNameForm);
    paintName(parsedUserName);
    askToDo();
  } else {
    userNameForm.addEventListener("submit", saveName);
  }

  if (userToDos !== null) {
    paintToDo(userToDos);
  }
}

function init() {
  loadState();
}

init();
