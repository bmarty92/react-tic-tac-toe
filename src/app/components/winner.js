import React from 'react';
import PropTypes from 'prop-types';

function Winner(props) {
  const { winner, onClick, wins } = props;
  const message = winner ? `Winner is: ${winner.icon}` : 'Nobody won :(';
  return (
    <div>
      <p>Winner is: {message}</p>
      <p>X win count: {wins.one}</p>
      <p>O win count: {wins.two}</p>
      <button onClick={onClick} type="button">
        Restart
      </button>
    </div>
  );
}
Winner.propTypes = {
  winner: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
  wins: PropTypes.shape({}).isRequired,
};
export default Winner;
