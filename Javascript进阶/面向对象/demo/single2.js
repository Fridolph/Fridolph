var taskWorker = {
  tasks: [],
  draw() {},
  addTask(task) {
    Task.tasks.push(task)
  }
}

var mapTask = {
  add: function(task) {
    taskWorker.addTask(task)
  }
}