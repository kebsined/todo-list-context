import styles from './TodoOptions.module.css';
import { useContext } from 'react';
import { TaskContext } from '../../context';

export const Options = () => {
	const { callEditWindow, onDeleteTask, id } = useContext(TaskContext);
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
