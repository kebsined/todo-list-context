import styles from './Task.module.css';
import { Options } from '../todoOptions/todoOptions';
export const Task = ({ name, id, callEditWindow, onDeleteTask }) => {
	return (
		<div className={styles.task}>
			{name}
			<Options
				id={id}
				callEditWindow={callEditWindow}
				onDeleteTask={onDeleteTask}
			/>
		</div>
	);
};
