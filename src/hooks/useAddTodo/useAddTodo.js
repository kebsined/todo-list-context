import { useState } from 'react';

export const useAddTodo = () => {
	const [isAdding, setIsAdding] = useState(false);
	const requestAdd = async payload => {
		try {
			setIsAdding(true);
			await fetch('http://localhost:3005/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'aplication/json;charset=utf-8' },
				body: JSON.stringify({
					name: payload,
				}),
			})
				.then(rawResponse => rawResponse.json())
				.then(response => {
					console.log(response, 'was successfully added!');
					setIsAdding(false);
				})
				.finally(() => setIsAdding(false));
		} catch (e) {
			console.error(e);
		}
	};
	return {
		isAdding,
		requestAdd,
	};
};
