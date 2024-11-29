import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { pokemonsDataReducer } from './slices';
import { StateType } from '../types/types';

const initialPokeData: StateType = {
  data: null,
  modalPoke: null,
  pokemonTypes: [],
  allCount: 0,
};

const store = createStore(
  combineReducers({
    pokemonsData: pokemonsDataReducer,
  }),
  {
    pokemonsData: initialPokeData,
  },
  applyMiddleware(thunk)
);

export default store;
