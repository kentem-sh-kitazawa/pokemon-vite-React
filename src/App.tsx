import axios from "axios";
import { useState, useEffect, useRef } from "react";

import PokemonCard from "./components/PokemonCard";
import PageButton from "./components/PageButton";

import "./App.css";

export type PokemonDataType = {
  data: { count?: number; next?: string; previos?: string; results: Result[] };
};

export type Result = {
  name: string;
  url: string;
};

export type PokemonDetails = {
  name: string;
  types: { type: { type: { name: string } } }[];
  weight: number;
  height: number;
  abilities: { ability: { ability: { name: string } } }[];
  sprites: { front_default: string };
};

type Url = {
  current: string;
  next?: string;
  previous?: string;
};

function App() {
  //個別のURLをstateで管理
  const [pokemonUrls, setPokemonUrls] = useState<string[]>([]);
  //個別のデータをstateで管理
  const [pokemonDetailData, setPokemonDetailData] = useState<PokemonDetails[]>(
    []
  );
  const urlsRef = useRef<Url>({ current: "https://pokeapi.co/api/v2/pokemon" });

  //名前データを取得する処理
  const fetchPokemonUrls = async () => {
    const response: PokemonDataType = await axios.get(urlsRef.current.current);
    setPokemonUrls(response.data.results?.map((result: Result) => result.url));
    urlsRef.current.next = response.data.next;
    urlsRef.current.previous = response.data.previos;
  };

  //ボタンを押したときにurlを置き換える処理
  const handleChangeNextPage = () => {
    if (urlsRef.current.next) {
      urlsRef.current.current = urlsRef.current.next;
      fetchPokemonUrls();
    }
  };

  const handleChangePreviousPage = () => {
    if (urlsRef.current.previous) {
      urlsRef.current.current = urlsRef.current.previous;
      fetchPokemonUrls();
    }
  };

  useEffect(() => {
    fetchPokemonUrls();
  }, []);

  //個別のデータを取得する処理
  useEffect(() => {
    const uppdatePokemonData = async () => {
      const tmpPokemonArray: PokemonDetails[] = [];

      const fetchPokemonData = async () => {
        for (const url of pokemonUrls) {
          const pokemonData = await axios.get<PokemonDetails>(url);
          tmpPokemonArray.push(pokemonData.data);
        }
      };
      await fetchPokemonData();
      setPokemonDetailData(tmpPokemonArray);
    };

    uppdatePokemonData();
  }, [pokemonUrls]);

  return (
    <div className="App">
      <ul>
        {pokemonDetailData.map((data, index) => (
          <PokemonCard key={index} data={data} />
        ))}
      </ul>
      <PageButton
        onChangeNextPage={handleChangeNextPage}
        onChangePreviousPage={handleChangePreviousPage}
        nextUrl={urlsRef.current.next}
        previousUrl={urlsRef.current.previous}
      />
    </div>
  );
}
export default App;
