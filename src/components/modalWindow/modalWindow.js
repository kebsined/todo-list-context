import styles from './modalWindow.module.css';

import { Input } from '../Input/Input';

export const ModalWindow = ({
	onUpdateTodo,
	closeEditWindow,
	updatedTaskName,
	onUpdatedTodoNameChange,
}) => {
	return (
		<div className={styles.modalBg}>
			<form className={styles.editForm} onSubmit={onUpdateTodo}>
				<button id='cancel' onClick={closeEditWindow} className={styles.cancel}>
					x
				</button>
				<Input
					placeholder='Enter the updated task...'
					onChange={onUpdatedTodoNameChange}
					value={updatedTaskName}
					type='text'
					name='updatedTaskName'
				/>
				<button
					type='submit'
					disabled={updatedTaskName === ''}
					id='save'
					className={styles.save}
				>
					Save changes
				</button>
			</form>
		</div>
	);
};
