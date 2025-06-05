import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";
import PageButton from "./components/PageButton";

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
  // useEffect(() => {
  //   console.log(pokemonData);
  // }, [pokemonData]);

  return (
    <div className="App">
      <ul>
        {pokemonData.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </ul>
      <PageButton />
    </div>
  );
}

export default App;
