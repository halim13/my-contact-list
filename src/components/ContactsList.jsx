import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {View, FlatList, RefreshControl, StyleSheet, Alert} from 'react-native'
import {Avatar, Divider, Text, TouchableRipple} from 'react-native-paper'
import {deleteContact, retrieveContacts} from '../slices/contacts'
import SkeletonItem from './SkeletonItem'
import AvatarImage from './AvatarImage'
import {updateVisible} from '../slices/modal'
import {setContactItem} from '../slices/contactItem'

const ContactsList = () => {
  const dispatch = useDispatch()
  const {data, status} = useSelector(({contacts}) => contacts)

  const refreshData = () => dispatch(retrieveContacts())
  const deletehData = (id) => dispatch(deleteContact(id))
  const hideModal = (visible) => dispatch(updateVisible(!!visible))
  const setItem = val => dispatch(setContactItem(val))
  const updateContact = (data) => {
    setItem({
      ...data,
      age: data.age?.toString()
    })
    hideModal(true)
  }

  const renderSeparator = () => <Divider style={{marginVertical: 8}} />

  const action = (data) => {
    Alert.alert(
      `Update/Delete Contact`,
      `${data.firstName} ${data.lastName} (${data.age} Years)`,
      [
        {
          text: 'Update',
          onPress: () => updateContact(data),
        },
        {
          text: 'Delete',
          onPress: () => deletehData(data.id),
          style: 'destructive',
        }
      ],
      {
        cancelable: true,
      }
    )
  }

  const renderItem = ({item}) => <TouchableRipple onPress={() => action(item)}>
    <View style={styles.item}>
      {
        item?.photo === 'N/A' ? <Avatar.Text
          size={50}
          label={item.firstName[0]}
        /> :
          <AvatarImage item={item} />
      }
      <View style={styles.itemRight}>
        <Text style={styles.name}>{item.firstName} {item.lastName || ''}</Text>
        <Text>{item.age || 0} Years</Text>
      </View>
    </View>
  </TouchableRipple>

  if (status === 'idle' || status === 'progress') {
    return (
      <View>
        <SkeletonItem style={styles.skeleton} />
        <SkeletonItem style={styles.skeleton} />
        <SkeletonItem style={styles.skeleton} />
        <SkeletonItem style={styles.skeleton} />
        <SkeletonItem style={styles.skeleton} />
      </View>
    )
  }
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        refreshControl={<RefreshControl refreshing={status === 'progress'} onRefresh={refreshData} />}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRight: {
    marginLeft: 16,
  },
  name: {fontWeight: 'bold'},
  skeleton: {
    marginHorizontal: 16,
    marginVertical: 8,
  }
})

export default ContactsList