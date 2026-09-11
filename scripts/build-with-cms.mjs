import { spawnSync } from 'node:child_process';
import path from 'node:path';

const hasCloudCredentials = Boolean(
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN,
);
const executable = process.execPath;
const tinaCli = path.join(process.cwd(), 'node_modules', '@tinacms', 'cli', 'bin', 'tinacms');
const args = [tinaCli, 'build'];

if (!hasCloudCredentials) {
  console.log('TinaCloud ainda não configurado; gerando o painel em modo local.');
  args.push('--local', '--skip-cloud-checks');
}

args.push('-c', 'vinext build');

const result = spawnSync(executable, args, {
  stdio: 'inherit',
  env: process.env,
});

if (result.error) throw result.error;
process.exit(result.status ?? 1);
