import React, { useEffect, useState } from "react";
import Door from "../Door/Door";

const GameShow = () => {
  const [doors, setDoors] = useState([0, 0, 0]);
  const [prize, setPrize] = useState({ prize: Math.floor(Math.random() * 3) });
  const [pickedOne, setPickedOne] = useState({
    opened: false,
    doorIndex: null,
  });
  const [gameShowHostOpens, setGameShowHostOpens] = useState(null);
  const [scoreCard, setScoreCard] = useState({ wins: 0, losses: 0 });
  const [curtain, setCurtain] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const insertPrize = () => {
    const _doors = doors.map((door, ind) => (ind === prize?.prize ? 1 : 0));

    setDoors([..._doors]);
    setGamesPlayed(gamesPlayed + 1);
  };

  const nextGame = () => {
    setPrize({ prize: Math.floor(Math.random() * 3) });
    setPickedOne(false);
    setGameShowHostOpens(null);
    setCurtain(false);
    setGameWon(false);
  };

  const calculatePercentage = () => {
    return (
      (scoreCard?.wins / (scoreCard?.wins + scoreCard?.losses)) * 100 || 0
    ).toFixed(2);
  };

  useEffect(() => {
    if (pickedOne?.opened) {
      doors.forEach((door, ind) => {
        if (door === 0 && ind !== pickedOne?.doorIndex)
          setGameShowHostOpens(ind);
      });
    }
  }, [pickedOne]);

  useEffect(() => {
    insertPrize();
  }, [prize]);

  return (
    <div className="flex flex-col">
      {curtain && (
        <div
          className={`${
            gameWon ? "text-green-500" : "text-red-600"
          } fixed h-[100vh] flex justify-center items-center text-5xl font-extrabold w-[100vw] bg-opacity-55 bg-gray-50 z-1000`}
          onClick={nextGame}
        >
          {gameWon ? "You Won!" : "You Lost!"}
        </div>
      )}
      <header className="h-[20vh] shadow-2xl flex items-center justify-center bg-red-600">
        <h1 className="text-4xl text-white font-bold">
          Welcome to the Game Show!
        </h1>
      </header>
      <div key={gamesPlayed} className="flex pt-20 px-40 justify-between">
        {doors.map((door, ind) => (
          <Door
            key={ind}
            index={ind}
            isPrizeThere={door}
            firstChoice={pickedOne}
            setFirstChoice={setPickedOne}
            openedByHost={gameShowHostOpens}
            setScoreCard={setScoreCard}
            setCurtain={setCurtain}
            setGameWon={setGameWon}
          />
        ))}
      </div>
      <div className="flex justify-between py-10 px-40">
        <div className="flex flex-col gap-4 text-left">
          <h3 className="text-2xl font-bold ">
            Total games: {scoreCard?.wins + scoreCard?.losses}
          </h3>
          <h3 className="text-xl font-semibold">Wins: {scoreCard?.wins}</h3>
          <h3 className="text-xl font-semibold">Losses: {scoreCard?.losses}</h3>
          <h3 className="text-xl font-semibold">
            Percentage: {calculatePercentage()}%
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            className="bg-blue-400 h-fit text-white rounded-lg p-4 text-xl font-semibold"
            onClick={() => {
              nextGame();
              setScoreCard({ wins: 0, losses: 0 });
              setGamesPlayed(0);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameShow;
