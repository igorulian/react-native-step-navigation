import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import IconArrowLeft from '../icons/IconArrowLeft'
import IconX from '../icons/IconX'

interface Props {
  title: string
  onPressBack?: () => void
  onPressClose?: () => void
}

const StepNavigationHeader = ({ onPressBack, onPressClose, title }: Props) => {
  return (
    <View style={[styles.container]}>

      <TouchableOpacity onPress={onPressBack} style={styles.backbutton}>
        <IconArrowLeft style={{ marginLeft: -3 }} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={onPressClose} style={styles.Xbutton}>
        <IconX style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}/>
      </TouchableOpacity>
    </View>
  )
}

export default StepNavigationHeader

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: '#ffffff',
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1
  },
  title: {
    color: '#7B7B7B',
    fontSize: 14,
    position: 'absolute',
    alignSelf: 'center'
  },
  backbutton: {
    position: 'absolute',
    left: 0,
    alignSelf: 'center',
    marginLeft: 16
  },
  Xbutton: {
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
    marginRight: 16
  }
})
