/* eslint-disable react-hooks/exhaustive-deps */
import Square from '@/components/Square';
import { useEffect, useState } from 'react';
  type Player = 'X' | 'O' | 'BOTH' | null;
  
  /* https://www.benmvp.com/blog/extracting-typescript-types-functions-objects-arrays/
  https://www.typescriptlang.org/docs/handbook/utility-types.html
  https://typescript-site-76.ortam.vercel.app/docs/handbook/utility-types.html
  https://dev.to/arafat4693/best-ways-to-use-extract-in-typescript-jc2
  */

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(
    Math.round(Math.random() * 1) === 1 ? 'X' : 'O'
  );
  const [winner, setWinner] = useState<Player>(null);

  function calculateWinner(squares: Player[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
  }

  function setSquareValue(index: number) {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setSquares(newData);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  useEffect(() => {
    const w = calculateWinner(squares);
    if (w) setWinner(w);
    if (!w && !squares.filter((square) => !square).length) {
      setWinner('BOTH');
    }
  });

  

  return (
    <div>
      {!winner && (
        <div className='lets-play'>
          <h2>{currentPlayer}</h2>
          <span className='your-turn'>It is your turn!</span>
        </div>
      )}
      {winner && winner !== 'BOTH' && <h2>Congratulations, {winner}!</h2>}
      {winner && winner === 'BOTH' && <h2>Congratulations, you&apos;re both winners!</h2>}

      <div className='grid'>
        {Array(9).fill(null).map((_, i) => {
          return <Square
            winner={winner}
            key={i}
            onClick={() => setSquareValue(i)}
            value={squares[i]}
          />
        })}
      </div>
      <div className='reset'>
        <button onClick={reset}>RESET</button>
      </div>
    </div>
  );
}