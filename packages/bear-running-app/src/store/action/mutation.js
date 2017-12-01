export const updateRun = run => ({
  type: 'mutation:updateRun',
  run,
})

export const updateUser = user => ({
  type: 'mutation:updateUser',
  user,
})

export const removeUser = userId => ({
  type: 'mutation:removeUser',
  userId,
})

export const removeRun = runId => ({
  type: 'mutation:removeRun',
  runId,
})

export const updateUserRole = (userId, role) => ({
  type: 'mutation:updateUserRole',
  userId,
  role,
})
export const saveRun = () => ({
  type: 'mutation:saveRun',
})
