import styles from './Task.module.css';
import { Options } from '../todoOptions/todoOptions';
export const Task = ({ name }) => {
	return (
		<div className={styles.task}>
			{name}
			<Options />
		</div>
	);
};
