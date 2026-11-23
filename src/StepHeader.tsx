import React, { useEffect, useRef } from 'react'
import { Animated, Easing, Platform, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import IconArrowLeft from './icons/IconArrowLeft'
import IconX from './icons/IconX'
import { getStep } from './getStep'

export interface StepHeaderProps {
  navigation: {
    getState: () => { index: number, routeNames: string[] }
    goBack: () => void
    getParent: () => { goBack: () => void } | undefined
  }
  route: { name: string }
  options: { title?: string }
  steps?: string[]
  onClose?: () => void
  progressBar?: boolean
  progressBarStyle?: { height?: number, color?: string, backgroundColor?: string }
  style?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  iconBackColor?: string
  iconCloseColor?: string
}

export function StepHeader({
  navigation,
  route,
  options,
  steps,
  onClose,
  progressBar = true,
  progressBarStyle,
  style,
  titleStyle,
  iconBackColor,
  iconCloseColor
}: StepHeaderProps) {
  const insets = useSafeAreaInsets()
  const state = navigation.getState()
  const { index, total, progress } = getStep(route.name, steps ?? state.routeNames)

  const anim = useRef(new Animated.Value(Math.max(index, 0) / total)).current
  useEffect(() => {
    Animated.timing(anim, { toValue: progress, duration: 300, easing: Easing.linear, useNativeDriver: false }).start()
  }, [anim, progress])

  const close = onClose ?? (() => navigation.getParent()?.goBack())
  const back = () => { state.index > 0 ? navigation.goBack() : close() }

  const title = options.title ?? (index >= 0 ? `Step ${index + 1} of ${total}` : '')
  const backgroundColor = StyleSheet.flatten(style)?.backgroundColor ?? '#FFF'

  return (
    <View style={{ paddingTop: insets.top, backgroundColor }}>
      <View style={[styles.container, style]}>
        <TouchableOpacity onPress={back} style={styles.back} hitSlop={12} accessibilityRole="button" accessibilityLabel="Back">
          <IconArrowLeft color={iconBackColor} />
        </TouchableOpacity>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <TouchableOpacity onPress={close} style={styles.close} hitSlop={12} accessibilityRole="button" accessibilityLabel="Close">
          <IconX color={iconCloseColor} />
        </TouchableOpacity>
      </View>
      {progressBar && index >= 0 && (
        <View style={{ backgroundColor: progressBarStyle?.backgroundColor }}>
          <Animated.View
            style={{
              width: anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
              height: progressBarStyle?.height ?? 2,
              backgroundColor: progressBarStyle?.color ?? '#000'
            }}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 44 : 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1
  },
  title: { color: '#000', fontSize: 14, alignSelf: 'center' },
  back: { position: 'absolute', left: 16 },
  close: { position: 'absolute', right: 16 }
})
