const { execSync } = require('child_process');
const { cwd } = require('process');

const createManualMigration = () => {
  const migrationName = process.argv[2];

  if (!migrationName)
    throw new Error(
      'Write migration name. Example - pnpm run migration:create myCustomMigration',
    );
  const pathDestiny = `${cwd()}/migrations/sql/${migrationName}`;
  const command = `pnpm run typeorm migration:create ${pathDestiny}`;
  execSync(command, { stdio: 'inherit' });
};

createManualMigration();
