import { Data, Payload, PokeSpecify } from '../types/types';

export const renderPokemonsDispatch = (action: Payload) => ({
  type: 'DATA_FETCH',
  payload: action,
});
export const modalPokeDispatch = (action: Data) => ({
  type: 'MODAL_POKE_PIC_FETCH',
  payload: action,
});
export const pokemonTypesMenu = (action: Payload) => ({
  type: 'POKEMON_TYPES_MENU_FETCH',
  payload: action,
});
export const renderPokemonsWithTypes = (action: PokeSpecify[]) => ({
  type: 'DATA_FETCH_WITH_TYPES',
  payload: action,
});
