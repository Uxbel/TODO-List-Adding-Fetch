import React, { useEffect, useState } from "react";
import InputText from "./InputText.jsx";
import TaskLi from "./TaskLi.jsx";

const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState([]);
	const [taskExists, setTaskExists] = useState(false);

	useEffect(() => {
		getTodos();
	}, [newTask]);

	function createTodosForUser(user) {
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
				console.log(resp.status); // el código de estado = 200 o código = 400 etc.
				console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});
	}

	function newTaskChange(event) {
		setNewTask({ label: event.target.value, done: false });
	}

	useEffect(() => {
		findDuplicateTasks(tasks, newTask);
	}, [newTask]);

	function findDuplicateTasks(tasks, newTask) {
		let position = tasks.findIndex(task => task === newTask);
		if (position === -1) {
			setTaskExists(false);
		} else {
			setTaskExists(true);
		}
	}

	function addNewTask(event) {
		if (event.key.toLowerCase() === "enter" && !taskExists) {
			let newTasks = [...tasks, newTask];
			setTasks(newTasks);
			findDuplicateTasks(newTasks, newTask);
			updateTodos(newTasks);
		}
	}

	function deleteTask(indexToRemove) {
		let newTasks = [...tasks];
		newTasks.splice(indexToRemove, 1);
		setTasks(newTasks);
	}

	function modifyTask(newValue, position) {
		let newTasks = [...tasks];
		newTasks.splice(position, 1, newValue);
		setTasks(newTasks);
	}

	//Fetch API
	async function getTodos() {
		let response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/Uxbel",
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
		let responseJson = await response.json();
		console.log("RESPONSE1", responseJson);
		setTasks(responseJson);
	}

	async function updateTodos(newTasks) {
		let response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/Uxbel",
			{
				method: "PUT",
				body: JSON.stringify(newTasks),
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
		console.log(newTask);
		let responseJson = await response.json();
	}

	async function createNewList() {
		let response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/Uxbel",
			{
				headers: {
					"Content-Type": "application/json"
				},
				method: "POST",
				body: JSON.stringify([])
			}
		);
		let responseJson = await response.json();
		console.log(responseJson);
		getTodos();
	}

	async function deleteTodos() {
		let response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/Uxbel",
			{
				headers: {
					"Content-Type": "application/json"
				},
				method: "DELETE"
			}
		);
		let responseJson = await response.json();
		console.log(responseJson);
		createNewList();
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-3"></div>
				<div className="col-6 card text-center mt-5 bg-light text-dark">
					<h1 className="p-4">todos</h1>
					<div className="rounded-0 border-light my-4">
						<InputText
							className="form-control form-control-lg rounded-0 border border-light shadow-sm text-wrap"
							onKeyDown={addNewTask}
							error={taskExists}
							onChange={newTaskChange}
						/>
					</div>

					<ul className="tasks rounded-0 border-light shadow-sm list-group list-group-flush text-left fw-lighter text-wrap">
						{tasks.map((task, index) => (
							<TaskLi
								key={index}
								task={task}
								error={task === newTask}
								index={index}
								modifyTask={modifyTask}
								deleteTask={deleteTask}
							/>
						))}
					</ul>
					<span
						className="bg-white rounded-0 border-light shadow-sm text-left pt-1 pb-1 pl-3 text-muted"
						id="item-left">
						{`${tasks.length} Things Left To Do`}
					</span>
					<div className="display-flex m-4 pt-2">
						<button
							onClick={getTodos}
							type="button"
							className="btn btn-outline-dark m-1">
							Get List
						</button>
						<button
							onClick={deleteTodos}
							type="button"
							className="btn btn-outline-dark m-1">
							Delete List
						</button>
					</div>
					<p className="mt-2 mb-4 fs-6 text-muted">
						Made by <a href="https://www.github.com/uxbel">Uxbel</a>
						, with love!
					</p>
				</div>
				<div className="col-3"></div>
			</div>
		</div>
	);
};

export default Tasks;
