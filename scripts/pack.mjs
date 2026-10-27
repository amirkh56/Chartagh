// Zips /out into chartagh-site.zip for upload to cPanel (dotfiles like .htaccess included).
import { execFileSync } from 'node:child_process';
import { existsSync, rmSync, statSync } from 'node:fs';

const ZIP = 'chartagh-site.zip';
if (!existsSync('out')) {
  console.error('Run `npm run build` first.');
  process.exit(1);
}
rmSync(ZIP, { force: true });

if (process.platform === 'win32') {
  // Windows 10+ ships bsdtar, which can write zip files
  execFileSync('C:\\Windows\\System32\\tar.exe', ['-a', '-cf', ZIP, '-C', 'out', '.'], { stdio: 'inherit' });
} else {
  execFileSync('zip', ['-qr', `../${ZIP}`, '.'], { cwd: 'out', stdio: 'inherit' });
}
console.log(`${ZIP} — ${(statSync(ZIP).size / 1048576).toFixed(1)} MB`);
