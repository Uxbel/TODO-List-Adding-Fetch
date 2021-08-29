import React, { useState } from "react";
import PropTypes from "prop-types";

const InputText = ({ onKeyDown, error, onChange }) => {
	const [value, setValue] = useState("");
	const repeat = error ? "bg-warning text-dark" : "";
	const bgWarning = `form-control form-control-lg rounded-0 border border-light shadow-sm text-wrap ${repeat}`; // Apply bootstrap styles

	function valueChange(event) {
		setValue(event.target.value);
		onChange(event);
	}

	return (
		<input
			className={bgWarning}
			type="text"
			placeholder="New task"
			onChange={valueChange}
			onKeyDown={onKeyDown}
			value={value}
		/>
	);
};

InputText.propTypes = {
	onKeyDown: PropTypes.func,
	onChange: PropTypes.func,
	error: PropTypes.bool
};

export default InputText;
