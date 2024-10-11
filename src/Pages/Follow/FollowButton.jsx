import PropTypes from 'prop-types';

const FollowButton = ({ loading, isFollowing, onClick }) => {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white ${isFollowing ? 'bg-red-600' : 'bg-blue-600'} transition duration-300`}
        >
            {loading ? 'Loading...' : (isFollowing ? 'Unfollow' : 'Follow')}
        </button>
    );
};

// Validasi Props
FollowButton.propTypes = {
    loading: PropTypes.bool.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default FollowButton;
