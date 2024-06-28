import React, {useState} from 'react'
import {Avatar} from 'react-native-paper'

const AvatarImage = ({item}) => {
  const [uri, setUri] = useState(item?.photo)

  if (!uri || !uri.includes('.')) {
    return <Avatar.Text
      size={50}
      label={item?.firstName[0]}
    />
  }

  return (
    <Avatar.Image
      size={50} source={{
        uri,
      }}
      onError={() => setUri('')}
    />
  )
}

export default AvatarImage