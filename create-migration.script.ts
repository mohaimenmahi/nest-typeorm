const { execSync } = require('child_process');

const filename = process.argv[2];

if (!filename) {
  console.error('Error: Please provide a migration filename.');
  process.exit(1);
}

try {
  console.log('Creating Migration File.....');
  const output = execSync(`yarn typeorm migration:create ./migrations/${filename}`, { encoding: 'utf-8' });
  console.log(output);
} catch (error) {
  console.error(error.message);
}