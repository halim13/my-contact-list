import React from 'react'
import {Snackbar} from 'react-native-paper'
import {useDispatch, useSelector} from 'react-redux'
import {setErrorMessage} from '../slices/contacts'

const SnackbarMessage = () => {
  const {errorMessage} = useSelector(({contacts}) => contacts)
  const dispatch = useDispatch()
  const setMessage = (val) => dispatch(setErrorMessage(val))

  return (
    <Snackbar
      visible={!!errorMessage}
      onDismiss={() => setMessage('')}
      action={{
        label: 'Close',
        onPress: () => {
          setMessage('')
        },
      }}>
      {errorMessage || '-'}
    </Snackbar>
  )
}

export default SnackbarMessage