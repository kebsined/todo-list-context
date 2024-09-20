import { useState } from 'react';

export const useUpdateTodo = () => {
	const [isUpdating, setIsUpdating] = useState(false);
	const requestUpdate = async (id, payload) => {
		try {
			setIsUpdating(true);
			await fetch(`http://localhost:3005/todos/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'aplication/json;charset=utf-8' },
				body: JSON.stringify({
					name: payload,
				}),
			})
				.then(rawResponse => rawResponse.json())
				.then(response => {
					console.log(response, 'was successfully updated!');
					setIsUpdating(false);
				})
				.finally(() => {
					setIsUpdating(false);
				});
		} catch (e) {
			console.error(e);
		}
	};
	return {
		requestUpdate,
		isUpdating,
	};
};
