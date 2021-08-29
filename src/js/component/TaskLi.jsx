import React from "react";
import PropTypes from "prop-types";

const TaskLi = ({ task, error, index, modifyTask, deleteTask }) => {
	const taskRepeat = "task " + (error ? "bg-warning" : "");
	const taskWarning = `list-group-item ${taskRepeat}`; // Apply bootstrap styles

	function onTaskChange(event) {
		modifyTask(event.target.value, index);
	}

	function onDeleteTaskClick() {
		deleteTask(index);
	}

	return (
		<li className={taskWarning}>
			<div className="row">
				<div className="col-10">
					<input
						className="border-0 bg-transparent text-dark form-control"
						type="text"
						value={task.label}
						onChange={onTaskChange}
					/>
				</div>
				<div className="col-2">
					<button
						className="delete close"
						type="button"
						aria-label="Close"
						onClick={onDeleteTaskClick}>
						<i className="far fa-trash-alt fa-sm m-2 pl-2"></i>
					</button>
				</div>
			</div>
		</li>
	);
};

TaskLi.propTypes = {
	task: PropTypes.string,
	error: PropTypes.bool,
	index: PropTypes.number,
	modifyTask: PropTypes.func,
	deleteTask: PropTypes.func
};

export default TaskLi;
