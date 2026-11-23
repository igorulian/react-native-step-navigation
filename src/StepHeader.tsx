import React, { ReactNode, useEffect, useRef } from 'react'
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
  formatTitle?: (step: number, total: number) => string
  onBack?: () => void
  onClose?: () => void
  showBack?: boolean
  showClose?: boolean
  right?: ReactNode
  backIcon?: ReactNode
  closeIcon?: ReactNode
  progressBar?: boolean
  progressBarStyle?: { height?: number, color?: string, backgroundColor?: string }
  style?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  iconBackColor?: string
  iconCloseColor?: string
}

const defaultTitle = (step: number, total: number) => `Step ${step} of ${total}`

export function StepHeader({
  navigation,
  route,
  options,
  steps,
  formatTitle = defaultTitle,
  onBack,
  onClose,
  showBack = true,
  showClose = true,
  right,
  backIcon,
  closeIcon,
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

  const anim = useRef(new Animated.Value(index < 0 ? 0 : index / total)).current
  useEffect(() => {
    Animated.timing(anim, { toValue: progress, duration: 300, easing: Easing.linear, useNativeDriver: false }).start()
  }, [anim, progress])

  const close = onClose ?? (() => navigation.getParent()?.goBack())
  const back = onBack ?? (() => (state.index > 0 ? navigation.goBack() : close()))

  const title = options.title ?? (index >= 0 ? formatTitle(index + 1, total) : '')
  const backgroundColor = StyleSheet.flatten(style)?.backgroundColor ?? '#FFF'

  return (
    <View style={{ paddingTop: insets.top, backgroundColor }}>
      <View style={[styles.container, style]}>
        {showBack && (
          <TouchableOpacity onPress={back} style={styles.left} hitSlop={12} accessibilityRole="button" accessibilityLabel="Back">
            {backIcon ?? <IconArrowLeft color={iconBackColor} />}
          </TouchableOpacity>
        )}
        <Text style={[styles.title, titleStyle]} numberOfLines={1}>{title}</Text>
        <View style={styles.right}>
          {right}
          {showClose && (
            <TouchableOpacity onPress={close} hitSlop={12} accessibilityRole="button" accessibilityLabel="Close">
              {closeIcon ?? <IconX color={iconCloseColor} />}
            </TouchableOpacity>
          )}
        </View>
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
  title: { color: '#000', fontSize: 14, alignSelf: 'center', maxWidth: '60%' },
  left: { position: 'absolute', left: 16 },
  right: { position: 'absolute', right: 16, flexDirection: 'row', alignItems: 'center', gap: 16 }
})
