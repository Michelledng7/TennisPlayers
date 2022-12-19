import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchForm from '../components/MatchForm';
import { getMatches, reset } from '../features/match/matchSlice';
import Spinner from '../components/Spinner';
import MatchItem from '../components/MatchItem';
function Dashboard() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { player } = useSelector((state) => state.auth);
	const { matches, isLoading, isError, message } = useSelector(
		(state) => state.match
	);

	useEffect(() => {
		if (isError) {
			alert(message);
		}
		if (!player) {
			navigate('/login');
		}
		dispatch(getMatches());

		return () => {
			dispatch(reset());
		};
	}, [player, navigate, dispatch, isError, message]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className='heading'>
				<h1>Welcome: {player?.name}</h1>
				<p>Matches Dashboard</p>
			</section>
			<MatchForm />
			<section className='content'>
				<p>matches list</p>

				{matches?.map((match) => (
					<MatchItem key={match._id} match={match} />
				))}
			</section>
		</>
	);
}

export default Dashboard;
