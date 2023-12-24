import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing the trainer's name.
 */
const nameTrainerSlice = createSlice({
    // The name of the slice.
    name: "nameTrainer",
    
    // The initial state, retrieved from localStorage or an empty string.
    initialState: localStorage.getItem("nameTrainer") ?? "",

    // Reducer functions that handle state updates.
    reducers: {
        /**
         * Reducer function to set the trainer's name in the state and localStorage.
         * @param {string} state - The current state (trainer's name).
         * @param {import("@reduxjs/toolkit").PayloadAction<string>} action - The Redux action containing the new name.
         * @returns {string} - The updated state (new trainer's name).
         */
        setNameTrainer: (state, action) => {
            // Set the new name in localStorage.
            localStorage.setItem("nameTrainer", action.payload);

            // Return the new name to update the state.
            return action.payload;
        }
    }
});

// Extract the action creator for setting the trainer's name.
export const { setNameTrainer } = nameTrainerSlice.actions;

// Export the reducer function for the nameTrainer slice.
export default nameTrainerSlice.reducer;
