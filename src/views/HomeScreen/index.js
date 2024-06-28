import React, {useCallback, useEffect} from 'react'
import {View} from 'react-native'
import {Portal} from 'react-native-paper'
import {useDispatch} from 'react-redux'
import {retrieveContacts} from '../../slices/contacts'
import ContactsList from '../../components/ContactsList'
import Fab from '../../components/Fab'
import ModalContact from '../../components/ModalContact'
import SnackbarMessage from '../../components/SnackbarMessage'
import Header from '../../components/Header'

const index = () => {
  const dispatch = useDispatch()

  const initFetch = useCallback(() => {
    dispatch(retrieveContacts())
  },
    [])

  useEffect(() => {
    initFetch()

    return () => null
  }, [initFetch])

  return (
    <View style={{flex: 1}}>
      <Header />
      <ContactsList />
      <Fab />
      <SnackbarMessage />
      <Portal>
        <ModalContact />
      </Portal>
    </View>
  )
}

export default index