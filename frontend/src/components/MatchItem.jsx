import { useDispatch } from 'react-redux';
import { deleteMatch } from '../features/match/matchSlice';

const MatchItem = ({ match }) => {
	console.log(match);
	const dispatch = useDispatch();
	const onDelete = () => {
		dispatch(deleteMatch(match._id));
		//match.filter((match) => match._id === match._id);
	};

	return (
		<div className='goal'>
			<div>{new Date(match.createdAt).toLocaleString('en-US')}</div>
			<h3>{match.text}</h3>
			<button className='close' onClick={onDelete}>
				X
			</button>
		</div>
	);
};

export default MatchItem;
