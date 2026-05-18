const { execSync } = require('child_process');
const { cwd } = require('process');

const generateMigration = () => {
  const migrationName = process.argv[2];

  if (!migrationName)
    throw new Error(
      'Write migration name. Example - pnpm run migration:generate myMigration',
    );
  const pathDestiny = `${cwd()}/migrations/sql/${migrationName}`;
  const command = `pnpm run typeorm migration:generate ${pathDestiny} -d ./migrations/data-source.ts`;
  execSync(command, { stdio: 'inherit' });
};

generateMigration();
