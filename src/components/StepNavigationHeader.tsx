import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native'
import IconArrowLeft from '../icons/IconArrowLeft'
import IconX from '../icons/IconX'

interface Props {
  title: string
  onPressBack?: () => void
  onPressClose?: () => void
  style?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
}

const StepNavigationHeader = ({ onPressBack, onPressClose, title, style, titleStyle }: Props) => {
  return (
    <View style={[styles.container, style]}>

      <TouchableOpacity onPress={onPressBack} style={styles.backbutton}>
        <IconArrowLeft />
      </TouchableOpacity>

      <Text style={[styles.title, titleStyle]}>{title}</Text>

      <TouchableOpacity onPress={onPressClose} style={styles.Xbutton}>
        <IconX />
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
    color: '#000',
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
