import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createMatch } from '../features/match/matchSlice';

const MatchForm = () => {
	const [text, setText] = useState('');
	const dispatch = useDispatch();
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createMatch({ text }));
		setText('');
	};
	return (
		<section className='form'>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Matches</label>
					<input
						type='text'
						id='text'
						name='text'
						value={text}
						onChange={(e) => {
							setText(e.target.value);
						}}
					></input>
					<div className='form-group'>
						<button className='btn btn-block' type='submit'>
							Add Matches
						</button>
					</div>
				</div>
			</form>
		</section>
	);
};

export default MatchForm;
