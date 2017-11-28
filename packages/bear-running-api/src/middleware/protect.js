export const protect = allowedRoles => async (ctx, next) => {
  ctx.assert(allowedRoles.includes(ctx.user && ctx.user.role), 403, 'Forbidden')
  await next()
}
