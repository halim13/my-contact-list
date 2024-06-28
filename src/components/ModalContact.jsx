import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button, Modal, Text, TextInput} from 'react-native-paper'
import {useDispatch, useSelector} from 'react-redux'
import {updateVisible} from '../slices/modal'
import {clearContactItem, updateContactItem} from '../slices/contactItem'
import {createContact, updateContact} from '../slices/contacts'

const ModalContact = () => {
  const dispatch = useDispatch()

  const {visible} = useSelector(({modal}) => modal)
  const {firstName, lastName, age, photo, id} = useSelector(({contactItem}) => contactItem.form)

  const hideModal = () => dispatch(updateVisible(false))
  const setContactItem = key => value => dispatch(updateContactItem({
    id,
    firstName,
    lastName,
    age,
    photo,
    [key]: value,
  }))
  const update = (id, data) => dispatch(updateContact({id, data}))
  const clearContact = () => dispatch(clearContactItem())
  const saveContact = (item) => dispatch(createContact(item))

  const saveModal = () => {
    if (!!firstName && !!lastName && !!age) {
      if (id) {
        update(id, {
          firstName,
          lastName,
          age: parseInt(age),
          photo: 'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
        })
      } else {
        saveContact({
          firstName,
          lastName,
          age: parseInt(age),
          photo: 'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
        })
      }
    }
    clearContact()
    hideModal()
  }

  const clearModal = () => clearContact()

  const containerStyle = {backgroundColor: 'white', padding: 20, margin: 16, borderRadius: 20}

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={containerStyle}
    >
      <Text style={{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 16,
      }}>{`${id ? 'Edit' : 'Add'}`} Contact</Text>
      <TextInput
        label='First Name'
        value={firstName}
        mode='outlined'
        onChangeText={setContactItem('firstName')}
        style={{marginBottom: 16}}
      />
      <TextInput
        label='Last Name'
        value={lastName}
        mode='outlined'
        onChangeText={setContactItem('lastName')}
        style={{marginBottom: 16}}
      />
      <TextInput
        label='Age'
        value={age?.toString()}
        mode='outlined'
        keyboardType='number-pad'
        onChangeText={setContactItem('age')}
        style={{marginBottom: 16}}
      />
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <Button mode='contained' onPress={() => saveModal()} disabled={!firstName || !lastName || !age}>Save</Button>
        <Button mode='contained' buttonColor='#f11000' onPress={() => clearModal()}>Clear</Button>
      </View>
    </Modal>
  )
}

export default ModalContact

const styles = StyleSheet.create({})