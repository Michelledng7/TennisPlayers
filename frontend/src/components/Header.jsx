import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const player = useSelector((state) => state.auth.player);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	return (
		<header className='header'>
			<div className='logo'>
				<Link to='/'>Matches</Link>
			</div>
			<ul>
				<li>
					{player ? (
						<button onClick={onLogout}>
							<FaSignOutAlt />
							Logout
						</button>
					) : (
						<Link to='/login'>
							<FaSignInAlt />
							Login
						</Link>
					)}
				</li>
				<li>
					<Link to='/register'>
						<FaUser />
						Register
					</Link>
				</li>
			</ul>
		</header>
	);
}

export default Header;
