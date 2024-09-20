import styles from './CustomLink.module.css';
import { Link, useMatch } from 'react-router-dom';
export const CustomLink = ({ children, to, ...props }) => {
	const isMatched = useMatch(to);

	return (
		<Link
			to={to}
			{...props}
			className={isMatched ? `${styles.CustomLinkActive}` : ''}
		>
			{children}
		</Link>
	);
};
