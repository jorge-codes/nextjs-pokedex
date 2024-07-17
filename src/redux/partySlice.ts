import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const MAX_POKEMON_COUNT = 6;

interface PartyState {
  selected: string[];
}

const initialState: PartyState = {
  selected: [],
};

const partySlice = createSlice({
  name: 'party',
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<string>) => {
      const isPartyFull = state.selected.length === MAX_POKEMON_COUNT;
      const isAlreadySelected = state.selected.includes(action.payload);
      if (isPartyFull || isAlreadySelected) {
        return;
      }
      state.selected.push(action.payload);
    },
    removePokemon: (state, action: PayloadAction<string>) => {
      state.selected = state.selected.filter((pokemonId) => pokemonId !== action.payload);
    },
    clearParty: (state) => {
      state.selected = [];
    },
  },
});

export const { addPokemon, removePokemon, clearParty } = partySlice.actions;
export default partySlice.reducer;
