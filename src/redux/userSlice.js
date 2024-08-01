import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playerNames: { playerOne: "", playerTwo: "" },
  soundSelection: "",
  syllableSelection: 1,
  gameSelection: "",
};

export const userSlice = createSlice({
  name: "choices",
  initialState,
  reducers: {
    setPlayerNames: (state, { payload }) => {
      state.playerNames.playerOne = payload.playerOne;
      state.playerNames.playerTwo = payload.playerTwo;
    },
    setSoundSelection: (state, { payload }) => {
      state.soundSelection = payload;
    },
    setSyllableSelection: (state, { payload }) => {
      state.syllableSelection = payload;
    },
    setGameSelection: (state, { payload }) => {
      state.gameSelection = payload;
    },
    setCardAmount: (statem, { payload }) => {
      state.cardAmount = payload;
    },
  },
});

export const {
  setPlayerNames,
  setSoundSelection,
  setSyllableSelection,
  setGameSelection,
  setCardAmount,
} = userSlice.actions;

export const selectPlayerNames = (state) => state.choices.playerNames;
export const selectSoundSelection = (state) => state.choices.soundSelection;
export const selectSyllableSelection = (state) =>
  state.choices.syllableSelection;
export const selectGameSelection = (state) => state.choices.gameSelection;
export const selectCardAmount = (state) => state.choices.cardAmount;

export default userSlice.reducer;
