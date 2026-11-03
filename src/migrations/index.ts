import * as migration_20261103_054042_init from './20261103_054042_init';

export const migrations = [
  {
    up: migration_20261103_054042_init.up,
    down: migration_20261103_054042_init.down,
    name: '20261103_054042_init'
  },
];
