export function getStep(routeName: string, steps: string[]) {
  const index = steps.indexOf(routeName)
  return { index, total: steps.length, progress: index < 0 ? 0 : (index + 1) / steps.length }
}
