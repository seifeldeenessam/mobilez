import { ChangeEvent, useEffect, useState } from 'react';
import './style.css';

interface Props {
	name: string;
	label: string;
	setter: any;
}

function FileInput(props: Props) {
	const { label, name, setter } = props;
	const [value, setValue] = useState<File>();

	useEffect(() => setter((prev: any) => ({ ...prev, [name]: value })), [value]);

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		setValue(e.target.files![0]);
	}

	return (
		<div className="input-container">
			<label className="input-container-label">{label}</label>
			<div className="input-container-field file-input">
				<input type="file" name={name} accept="image/png, image/jpg, image/jpeg" onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)} />
				<span>{value?.name ?? "No file chosen"}</span>
			</div>
		</div>
	);
}

export default FileInput;