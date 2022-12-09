import dotenv from 'dotenv'
import { config } from '@keystone-6/core'
import { statelessSessions } from '@keystone-6/core/session'
import { createAuth } from '@keystone-6/auth'

import { lists } from './schema'
import { insertSeedData } from './seed-data'
import { Context } from '.keystone/types'

dotenv.config()

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: 'name isAdmin',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    itemData: {
      isAdmin: true
    }
  }
})

export default withAuth(
  config({
    lists,
    db: {
      useMigrations: true,
      provider: process.env.DATABASE_URL!.startsWith('file:')
        ? 'sqlite'
        : 'postgresql',
      url: process.env.DATABASE_URL!,
      async onConnect(context: Context) {
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(context)
        }
      }
    },

    session: statelessSessions({
      secret: process.env.SESSION_SECRET!,
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })
  })
)
