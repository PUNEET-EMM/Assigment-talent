import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api.js";

export const fetchTalents = createAsyncThunk(
  "talents/fetchTalents",
  async (skill, thunkAPI) => {
    try {
      const params = skill ? { skill } : {};
      const res = await api.get("/talents", { params });
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch talents"
      );
    }
  }
);

export const createTalent = createAsyncThunk(
  "talents/createTalent",
  async (talentData, thunkAPI) => {
    try {
      const res = await api.post("/talents", talentData);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create talent"
      );
    }
  }
);

const talentsSlice = createSlice({
  name: "talents",
  initialState: {
    items: [],
    loadingList: false,    
    loadingCreate: false, 
    error: null,
    currentSkill: ""
  },
  reducers: {
    setSkillFilter(state, action) {
      state.currentSkill = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      // 🔹 FETCH TALENTS
      .addCase(fetchTalents.pending, state => {
        state.loadingList = true;
        state.error = null;
      })
      .addCase(fetchTalents.fulfilled, (state, action) => {
        state.loadingList = false;
        state.items = action.payload;
      })
      .addCase(fetchTalents.rejected, (state, action) => {
        state.loadingList = false;
        state.error = action.payload || "Error fetching talents";
      })

      // 🔹 CREATE TALENT
      .addCase(createTalent.pending, state => {
        state.loadingCreate = true;
        state.error = null;
      })
      .addCase(createTalent.fulfilled, (state, action) => {
        state.loadingCreate = false;
        state.items.unshift(action.payload);
      })
      .addCase(createTalent.rejected, (state, action) => {
        state.loadingCreate = false;
        state.error = action.payload || "Error creating talent";
      });
  }
});


export const { setSkillFilter } = talentsSlice.actions;
export default talentsSlice.reducer;
