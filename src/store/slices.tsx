import {
  fetchDataFromAPI,
  getModalImg,
  getSpecifyType,
  getTypesMenu,
} from './fetchApi';
import {
  modalPokeDispatch,
  pokemonTypesMenu,
  renderPokemonsDispatch,
  renderPokemonsWithTypes,
} from './dispatchs';
import { AppDispatch, Payload, PokeSpecify } from '../types/types';

export const loadModalPoke = (url: string) => (dispatch: AppDispatch) => {
  return getModalImg(url).then((img) => {
    dispatch(modalPokeDispatch(img));
  });
};

export const loadTypesMenu = (url: string) => (dispatch: AppDispatch) => {
  return getTypesMenu(url).then((data) => {
    dispatch(pokemonTypesMenu(data));
  });
};

export const loadData = (fetchCount: number, pokeAllCount: number) => (
  dispatch: AppDispatch
) =>
  fetchDataFromAPI(fetchCount, pokeAllCount).then((data) => {
    if (data) {
      dispatch(renderPokemonsDispatch(data));
    }
  });

export const loadSpecifyData = (url: string) => (dispatch: AppDispatch) => {
  getSpecifyType(url).then((data) => {
    if (data) {
      dispatch(renderPokemonsWithTypes(data.pokemon));
    }
  });
};

export const pokemonsDataReducer = (
  state: any = [],
  action: { type?: string; payload?: Payload | PokeSpecify[] } = {}
) => {
  if (action.type === 'DATA_FETCH') {
    return {
      ...state,
      data: (action.payload as Payload).results,
      allCount: (action.payload as Payload).count,
    };
  }
  if (action.type === 'MODAL_POKE_PIC_FETCH') {
    return {
      ...state,
      modalPoke: action.payload,
    };
  }
  if (action.type === 'POKEMON_TYPES_MENU_FETCH') {
    return {
      ...state,
      pokemonTypes: [
        { name: 'home', url: '' },
        ...(action.payload as Payload).results,
      ],
    };
  }
  if (action.type === 'DATA_FETCH_WITH_TYPES' && action.payload) {
    const newData = (action.payload as PokeSpecify[]).map(
      (item: PokeSpecify) => {
        return {
          ...item.pokemon,
        };
      }
    );
    return {
      ...state,
      data: newData,
    };
  }
  return state;
};
