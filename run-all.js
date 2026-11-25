import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('----------------------------------------------------');
console.log('  🎨 Starting G.K Traders Paints Full-Stack System   ');
console.log('----------------------------------------------------');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// Start Backend
const backend = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'GK-Traders-Paints', 'backend'),
  stdio: 'inherit',
  shell: true
});

// Start Frontend
const frontend = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'GK-Traders-Paints', 'frontend'),
  stdio: 'inherit',
  shell: true
});

const cleanup = () => {
  console.log('\nShutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
