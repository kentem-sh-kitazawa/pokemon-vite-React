import "./App.css";
import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
// import PokemonList from './components/pokemonList';

function App() {
  const initialUrl = "https://pokeapi.co/api/v2/pokemon";
  //最後の数字を変えてあげると個体の情報が取得できる https://pokeapi.co/api/v2/pokemon/1

  //名前とURLをstateで管理
  const [pokemonUrls, setPokemonUrls] = useState<string[]>([]);
  //名前データを取得する処理
  useEffect(() => {
    const fetchPokemonUrls = async () => {
      const response = await axios.get(initialUrl);
      setPokemonUrls(response.data.results.map((result: any) => result.url));
    };
    fetchPokemonUrls();
  }, []);

  //個別のデータをstateで管理
  const [pokemonData, setPokemonData] = useState<any[]>([]);

  //ページ数をstateで管理
  const [page, setPage] = useState<number>(0);

  //個別のデータを取得する処理
  useEffect(() => {
    const uppdatePokemonData = async () => {
      const tmpPokemonArray: any[] = [];

      const fetchPokemonData = async () => {
        for (const url of pokemonUrls) {
          const pokemonData = await axios.get(url);
          tmpPokemonArray.push(pokemonData.data);
        }
      };
      await fetchPokemonData();
      setPokemonData(tmpPokemonArray);
    };

    uppdatePokemonData();
  }, [pokemonUrls]);

  //確認用
  useEffect(() => {
    console.log(pokemonData);
  }, [pokemonData]);

  return (
    <div className="App">
      {pokemonData.map((pokemon) => (
        <ul key={pokemon.name}>
          {/* PokemonListに移動 */}
          <img src={pokemon.sprites.front_default} alt="" />
          <h3 key={pokemon.name}>{pokemon.name}</h3>
          <p>タイプ</p>
          {pokemon.types.map((type:any)=>(
            <p>{type.type.name}</p>
          ))}
          <p>重さ:{pokemon.weight}</p>
          <p>高さ:{pokemon.height}</p>
          {pokemon.abilities.map((ability:any)=>(
          <p>アビリティ:{ability.ability.name}</p>
          ))}
        </ul>
      ))}
      {/* 20項目を表示する */}
      {/* 前へボタン */}
      <button>前へ</button>
      {/* 次へボタン */}
      <button>次へ</button>
    </div>
  );
}

export default App;
