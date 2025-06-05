import "../styles/PokemonCard.css"

type Props = {
  pokemon: any;
};
const PokemonCard = ({ pokemon }: Props) => {
  return (
    <li className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt="" />
      <h3>{pokemon.name}</h3>
      <p>タイプ</p>
      {pokemon.types.map((type: any) => (
        <p key={type.type.name}>{type.type.name}</p>
      ))}
      <p>重さ:{pokemon.weight}</p>
      <p>高さ:{pokemon.height}</p>
      {pokemon.abilities.map((ability: any) => (
        <p key={ability.ability.name}>アビリティ:{ability.ability.name}</p>
      ))}
    </li>
  );
};
export default PokemonCard;
