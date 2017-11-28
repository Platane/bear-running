export const startRun = () => ({
  type: 'run:start',
})
export const endRun = () => ({
  type: 'run:end',
})
export const step = step => ({
  type: 'run:step',
  step,
})
