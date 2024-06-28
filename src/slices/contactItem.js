import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  form: {
    id: null,
    firstName: '',
    lastName: '',
    age: '',
    photo: '',
  }
}

const contactItemSlice = createSlice({
  name: 'contactItem',
  initialState,
  reducers: {
    updateContactItem: (state, action) => {
      state.form = action.payload
    },
    clearContactItem: (state, action) => {
      state.form = initialState.form
    },
    setContactItem: (state, action) => {
      state.form = action.payload
    }
  }
})

export const {updateContactItem, clearContactItem, setContactItem} = contactItemSlice.actions

export default contactItemSlice.reducer