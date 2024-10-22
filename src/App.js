import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [gameTitle, setGameTitle] = useState("");
  const [searchedGames, setSearchedGames] = useState([]);
  const [gamesDeal, setGamesDeal] = useState([]);

  const searchGame = () => {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=5`)
      .then((response) => response.json())
      .then((data) => {
        setSearchedGames(data);
      });
  };

  useEffect(() => {
    fetch(
      `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3`
    )
      .then((response) => response.json())
      .then((data) => {
        setGamesDeal(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="App">
      <div className="searchSection">
        <h1> Search For A Game </h1>
        <input
          type="text"
          placeholder="100zz"
          onChange={(event) => {
            setGameTitle(event.target.value);
          }}
        />
        <button onClick={searchGame}>Search Game Titile</button>

        <div className="games">
          {searchedGames.map((game, key) => {
            return (
              <div className="game" key={key}>
                {game.external}
                <img src={game.thumb} />
                {game.cheapest}
              </div>
            );
          })}
        </div>
      </div>
      <div className="dealsSection">
        <h1> Latest Deals </h1>
        <div className="games">
          {gamesDeal.map((game, key) => {
            return (
              <div className="game" id="deals" key={key}>
                <h3>{game.title}</h3>
                <p>Normal Price: {game.normalPrice}</p>
                <p>SalePrice: {game.salePrice}</p>
                <h3>You Save {game.savings.substr(0, 2)}%</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
