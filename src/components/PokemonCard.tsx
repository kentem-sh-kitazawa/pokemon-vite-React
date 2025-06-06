import type { PokemonDetails } from "../App";
import "../styles/PokemonCard.css";

type Props = {
  data: PokemonDetails;
};
const PokemonCard = ({ data }: Props) => {
  return (
    <li className="pokemon-card">
      <img src={data.sprites.front_default} />
      <h3>{data.name}</h3>
      <p>タイプ</p>
      {data.types.map((type: any) => (
        <p key={type.type.name}>{type.type.name}</p>
      ))}
      <p>重さ:{data.weight}</p>
      <p>高さ:{data.height}</p>
      {data.abilities.map((ability: any) => (
        <p key={ability.ability.name}>アビリティ:{ability.ability.name}</p>
      ))}
    </li>
  );
};
export default PokemonCard;
