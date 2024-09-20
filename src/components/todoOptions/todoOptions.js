import styles from './TodoOptions.module.css';

export const Options = ({ id, callEditWindow, onDeleteTask }) => {
	return (
		<div className={styles.options}>
			<button
				className={styles.edit}
				id='edit'
				type='button'
				onClick={() => callEditWindow(id)}
			></button>
			<button
				className={styles.delete}
				id='delete'
				type='button'
				onClick={() => onDeleteTask(id)}
			></button>
		</div>
	);
};
