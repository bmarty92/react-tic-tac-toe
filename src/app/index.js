import React from 'react';
import Winner from './components/winner';
import { WINNING_COMBOS } from '../constants';

const dimension = 3;
const endGame = dimension ** 2 - 1;
const initial = () => [...Array(dimension)].map(() => [...Array(dimension)]);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameData: initial(),
      turn: 0,
      players: {
        one: {
          winner: false,
          icon: '👺',
        },
        two: {
          winner: false,
          icon: '🐀',
        },
      },
      wins: {
        one: 0,
        two: 0,
      },
    };
  }

  isWinner = (newGameData, player) =>
    WINNING_COMBOS.some(combo =>
      combo.every(([row, box]) => newGameData[row][box] === player.icon)
    );

  onClick = ({ row, box }) => {
    const { gameData, turn, players, wins } = this.state;
    const playerId = turn % 2 === 0 ? 'one' : 'two';
    const currentPlayer = players[playerId];

    if (!gameData[row][box]) {
      gameData[row][box] = currentPlayer.icon;
      this.setState({ gameData, turn: turn + 1 });
    }
    if (this.isWinner(gameData, currentPlayer)) {
      players[playerId].winner = true;
      wins[playerId]++;
      this.setState({ players, wins });
    }
  };

  findWinner = () => {
    const { players } = this.state;
    return Object.values(players).find(player => player.winner);
  };

  restartGame = () =>
    this.setState({
      gameData: initial(),
      turn: 0,
      players: {
        one: {
          winner: false,
          icon: '👺',
          winCount: 0,
        },
        two: {
          winner: false,
          icon: '🐀',
          winCount: 0,
        },
      },
    });

  renderGame = () => {
    const { gameData } = this.state;
    return gameData.map((rowData, rowIndex) => (
      <div className="row" key={rowIndex}>
        {rowData.map((boxData, boxIndex) => (
          <button
            onClick={() => this.onClick({ row: rowIndex, box: boxIndex })}
            className="box"
            key={boxIndex}
            type="button"
          >
            {boxData}
          </button>
        ))}
      </div>
    ));
  };

  render() {
    const winner = this.findWinner();
    const { turn, wins } = this.state;
    return winner || endGame < turn ? (
      <Winner winner={winner} onClick={this.restartGame} wins={wins} />
    ) : (
      this.renderGame()
    );
  }
}

export default App;
