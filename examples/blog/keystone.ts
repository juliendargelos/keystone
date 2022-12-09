import { config } from '@keystone-6/core';
import { lists } from './schema';
import { insertSeedData } from './seed-data';
import { Context } from '.keystone/types';

export default config({
  db: {
    useMigrations: true,
    provider: 'postgresql',
    url: process.env.DATABASE_URL,
    async onConnect(context: Context) {
      if (process.argv.includes('--seed-data')) {
        await insertSeedData(context);
      }
    },
  },
  lists,
});
