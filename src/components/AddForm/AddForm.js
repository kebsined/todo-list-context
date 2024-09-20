import styles from './AddForm.module.css';
import { Input } from '../Input/Input';

export const AddForm = ({
	onAddTodo,
	onTodoNameChange,
	taskName,
	isAdding,
	isDeleting,
	isUpdating,
}) => {
	return (
		<form className={styles.AddForm} onSubmit={onAddTodo}>
			<Input
				placeholder='Enter the task to add..'
				onChange={onTodoNameChange}
				value={taskName}
				type='text'
				name='taskName'
				id='add'
			/>
			<button
				type='submit'
				className={styles.add}
				disabled={taskName === '' || isAdding || isDeleting || isUpdating}
			>
				Add task
			</button>
		</form>
	);
};
