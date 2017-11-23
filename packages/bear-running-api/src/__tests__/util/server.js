import { create } from '~/index'

export const wrap = async cb => {
  const kill = await create()

  try {
    await cb()

    kill()
  } catch (err) {
    kill()

    throw err
  }
}
