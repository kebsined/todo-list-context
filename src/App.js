import styles from './App.module.css';

import { useState, useEffect } from 'react';
import { AddForm } from './components/AddForm/AddForm';
import { Input } from './components/Input/Input';
import { useUpdateTodo } from './hooks/useUpdate/useUpdateTodo';
import { useDeleteTodo } from './hooks/useDelete/useDeleteTodo';
import { useAddTodo } from './hooks/useAddTodo/useAddTodo';
import { ModalWindow } from './components/modalWindow/modalWindow';
import { Task } from './components/task/Task';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [updateTodos, setUpdateTodos] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [taskName, setTaskName] = useState('');
	const [updatedTaskName, setUpdatedTaskName] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [currentTaskId, setCurrentTaskId] = useState(null);
	const [isSorted, setIsSorted] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const updateTaskFlag = () => setUpdateTodos(!updateTodos);

	const sortParams = { byName: '?_sort=name', default: '' };

	const searchTodo = todos.filter(todo =>
		todo.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			fetch('http://localhost:3005/todos')
				.then(loadedData => loadedData.json())
				.then(loadedTodos => {
					setTodos(loadedTodos);
				})
				.finally(() => setIsLoading(false));
		}, 2000);
	}, [updateTodos]);

	const onTodoNameChange = event => {
		setTaskName(event.target.value);
	};

	const { isAdding, requestAdd } = useAddTodo();

	const onAddTodo = event => {
		event.preventDefault();
		requestAdd(taskName);
		setTaskName('');
		updateTaskFlag();
	};

	const onUpdatedTodoNameChange = event => {
		setUpdatedTaskName(event.target.value);
	};

	const { isUpdating, requestUpdate } = useUpdateTodo();

	const onUpdateTodo = event => {
		event.preventDefault();
		requestUpdate(currentTaskId, updatedTaskName).then(() => {
			closeEditWindow();
			updateTaskFlag();
		});
	};

	const callEditWindow = id => {
		setCurrentTaskId(id);
		setIsEditing(true);
	};

	const closeEditWindow = () => {
		setIsEditing(false);
		setUpdatedTaskName('');
	};

	const { isDeleting, requestDelete } = useDeleteTodo();

	const onDeleteTask = currentTaskId => {
		console.log('deleting..');
		requestDelete(currentTaskId);
		updateTaskFlag();
	};

	const toSortTodos = () => {
		setIsSorted(!isSorted);
		setIsLoading(true);
		setTimeout(() => {
			fetch(
				'http://localhost:3005/todos' +
					`${!isSorted ? sortParams.byName : sortParams.default}`
			)
				.then(loadedData => loadedData.json())
				.then(loadedTodos => {
					setTodos(loadedTodos);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}, 1500);
	};

	return (
		<div className={styles.App}>
			{isEditing ? (
				<ModalWindow
					onUpdateTodo={onUpdateTodo}
					closeEditWindow={closeEditWindow}
					updatedTaskName={updatedTaskName}
					onUpdatedTodoNameChange={onUpdatedTodoNameChange}
				/>
			) : (
				<div></div>
			)}
			<div className={styles.TodoList}>
				<h1 className={styles.title}>Track your tasks</h1>
				<AddForm
					onAddTodo={onAddTodo}
					onTodoNameChange={onTodoNameChange}
					taskName={taskName}
					isAdding={isAdding}
					isDeleting={isDeleting}
					isUpdating={isUpdating}
				/>
				<Input
					id='search'
					className={styles.searchInput}
					placeholder={'Search...'}
					value={searchQuery}
					onChange={event => setSearchQuery(event.target.value)}
					type='text'
				/>
				<button
					className={styles.sort}
					type='submit'
					onClick={toSortTodos}
					disabled={isLoading}
					id='sort'
				>
					{isSorted === false ? 'Sort todos' : 'Show default'}
				</button>
				<div className={styles.tasks}>
					{isLoading ? (
						<div className={styles.loader}></div>
					) : (
						searchTodo.map(({ name, id }) => (
							<Task
								key={id}
								name={name}
								callEditWindow={() => callEditWindow(id)}
								onDeleteTask={() => onDeleteTask(id)}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
};
