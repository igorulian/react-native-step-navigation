import assert from 'node:assert'
import { getStep } from './getStep.ts'

const steps = ['a', 'b', 'c', 'd']
assert.deepStrictEqual(getStep('a', steps), { index: 0, total: 4, progress: 0.25 })
assert.deepStrictEqual(getStep('d', steps), { index: 3, total: 4, progress: 1 })
assert.deepStrictEqual(getStep('summary', steps), { index: -1, total: 4, progress: 0 })
console.log('ok')
