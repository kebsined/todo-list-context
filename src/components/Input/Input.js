import styles from './Input.module.css';

export const Input = ({ placeholder, type, name, onChange, value, id }) => {
	return (
		<input
			id={id}
			className={styles.Input}
			placeholder={placeholder}
			type={type}
			name={name}
			onChange={onChange}
			value={value}
		/>
	);
};
