import { useState } from 'react';

export const useDeleteTodo = () => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDelete = async id => {
		try {
			setIsDeleting(true);
			await fetch(`http://localhost:3005/todos/${id}`, {
				method: 'DELETE',
			})
				.then(rawResponse => rawResponse.json())
				.then(response => {
					console.log(response, 'was successfully deleted!');
					setIsDeleting(false);
				})
				.finally(() => {
					setIsDeleting(false);
				});
		} catch (e) {
			console.error(e);
		}
	};
	return {
		isDeleting,
		requestDelete,
	};
};
