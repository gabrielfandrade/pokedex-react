import React, { useState, useEffect } from 'react';
import PokemonMainCard from '../components/PokemonMainCard';
import PokemonMovesCard from '../components/PokemonMovesCard';
import '../components/Pokemon.css';

function Pokemon({ id }) {
  const [pokemon, setPokemon] = useState(undefined);
  const [moves, setMoves] = useState({
      learntByLevelUp: [],
      learntByTM: [],
      learntByEggGroup: [],
      learntByTutor: [],
      learntByTR: [],
  });
  const [hasMoves, setHasMoves] = useState(false)

  const fetchLevelUpMoves = async (move) => {
    const { url } = move;
    const response = await fetch(url)
    const result = await response.json();
    setMoves((prev) => ({
      ...prev,
      learntByLevelUp: [...prev.learntByLevelUp, result],
    }));
  }

  const checkLearnMethod = (methods, version, method) => {
    const game = methods.filter((detail) => detail.version_group.name === version);    
    return game.some((detail) => detail.move_learn_method.name === method);
  }

  const fetchToList = async (move) => {
    const game = move.machines.find((machine) => machine.version_group.name === 'sword-shield');
    const url = game.machine.url;
    const response = await fetch(url)
    const result = await response.json();
    if (result.item.name.includes('tm')) {
      setMoves((prev) => ({
        ...prev,
        learntByTM: [...prev.learntByTM, { tmMove: move, tmName: result.item.name }],
      }))
    } else {
      setMoves((prev) => ({
        ...prev,
        learntByTR: [...prev.learntByTR, { trMove: move, trName: result.item.name }],
      }))
    }
  }

  const fetchMachineMove = async (move) => {
    const { url } = move;
    const response = await fetch(url)
    const result = await response.json();
    await fetchToList(result);
  }

  const getMoves = (moves) => {
    setHasMoves(false);
    const movesLearnByLevelUp = moves.filter(move =>
      checkLearnMethod(move.version_group_details, 'sword-shield', 'level-up'));
    const movesLearnByMachine = moves.filter(move =>
      checkLearnMethod(move.version_group_details, 'sword-shield', 'machine'));      
    movesLearnByLevelUp.forEach(({ move }) =>
      fetchLevelUpMoves(move));
    movesLearnByMachine.forEach(({ move }) =>
      fetchMachineMove(move));
    setHasMoves(true);
  }

  const fetchPokemon = async (url) => {
    const response = await fetch(url)
    const result = await response.json();
    setPokemon(result);
    getMoves(result.moves);
  }

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    fetchPokemon(url);
  }, [id]);

  return (
    <div className="pokemon-infos">
      { hasMoves &&
          <PokemonMovesCard              
            moves={moves}
            levelUp={pokemon.moves}
          />
      }
      { pokemon &&
          <PokemonMainCard
            name={ pokemon.species.name }
            types={ pokemon.types }
            abilities={ pokemon.abilities }
            height={ pokemon.height }
            weight={ pokemon.weight }
            sprite={ pokemon.sprites.other }
            stats={ pokemon.stats }
          />
      }        
    </div>
  )
}

export default Pokemon;