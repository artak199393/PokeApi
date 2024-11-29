import store from '../store/store';

export type AppDispatch = typeof store.dispatch;

export type PokemonType = {
  name: string;
  url: string;
};
export type TypeMenuType = {
  name: string;
  url: string;
};

export type Payload = {
  count: number;
  next: string;
  previous: string;
  results: PokemonType[];
};

export type PokeSpecify = {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
};

export type Type = {
  type: {
    name: string;
  };
};

export type Data = {
  types: Type[];
  weight: number;
  height: number;
  sprites: {
    front_default: string;
    back_default: string;
  };
  name: string;
};

export type ModalViewProps = {
  data: Data | null;
  handleClose: (b: boolean) => void;
  open: boolean;
};

export type StateType = {
  data: null | PokemonType[];
  modalPoke: null | Data;
  pokemonTypes: PokemonType[];
  allCount: number;
};

export type CardsProps = {
  name: string;
  src: string;
  onClick: () => void;
};
