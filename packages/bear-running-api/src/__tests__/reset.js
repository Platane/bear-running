import test from 'tape'
import { connect } from '~/service/mongo'

test('[bootstrap] drop db', async t => {
  const db = await connect()

  const collections = await db.collections()

  for (let i = collections.length; i--; )
    // catch and silent the error, because some collection are not dropable ( system protected )
    await collections[i].drop().catch(err => err)

  await db.close()

  t.end()
})
