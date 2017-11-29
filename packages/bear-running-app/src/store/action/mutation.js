export const removeUser = userId => ({
  type: 'mutation:removeUser',
  userId,
})
export const updateUserRole = (userId, role) => ({
  type: 'mutation:updateUserRole',
  userId,
  role,
})
export const saveRun = () => ({
  type: 'mutation:saveRun',
})
