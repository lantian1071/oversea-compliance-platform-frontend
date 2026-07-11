const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = process.cwd();
const srcDir = path.join(root, 'client', 'src');
const distDir = path.join(root, 'dist');
const esbuildExe = path.join(root, 'node_modules', '.pnpm', '@esbuild+win32-x64@0.21.5', 'node_modules', '@esbuild', 'win32-x64', 'esbuild.exe');

console.log('Cleaning dist...');
if (fs.existsSync(distDir)) fs.rmSync(distDir, { recursive: true });
fs.mkdirSync(path.join(distDir, 'assets'), { recursive: true });

console.log('Building JS...');
const entry = path.join(srcDir, 'main.tsx');
const outfile = path.join(distDir, 'assets', 'index.js');

const args = [
  '"' + esbuildExe + '"',
  '"' + entry + '"',
  '--bundle',
  '--minify',
  '--format=iife',
  '--global-name=AppEntry',
  '--platform=browser',
  '--target=es2020',
  '--jsx=automatic',
  '--loader:.css=css',
  '--external:tailwindcss',
  '--external:tw-animate-css',
  '--external:*.png',
  '--external:*.svg',
  '--conditions=style',
  '--outfile="' + outfile + '"',
  '--alias:@=' + srcDir.replace(/\\/g, '/'),
  '--alias:@shared=' + path.join(root, 'shared').replace(/\\/g, '/'),
  '--alias:@assets=' + path.join(root, 'attached_assets').replace(/\\/g, '/'),
];

try {
  execSync(args.join(' '), { stdio: 'inherit', shell: 'cmd.exe' });
} catch(e) {
  console.error('Build JS failed');
  process.exit(1);
}

console.log('Building CSS...');
const cssIn = path.join(srcDir, 'index.css');
const cssOut = path.join(distDir, 'assets', 'index.css');

let cssContent = fs.readFileSync(cssIn, 'utf8');
const lines = cssContent.split(String.fromCharCode(10)).filter(l => !l.trim().startsWith('@import ') && l.trim().length > 0);
fs.writeFileSync(cssOut, lines.join(String.fromCharCode(10)));

console.log('Creating index.html...');

const html = [
  '<!doctype html>',
  '<html lang="zh-CN">',
  '  <head>',
  '    <meta charset="UTF-8" />',
  '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
  '    <title>出海合规服务平台</title>',
  '    <script async src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>',
  '    <link rel="preconnect" href="https://fonts.googleapis.com">',
  '    <link rel="preconnect" href="https://fonts.gstatic.com">',
  '    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">',
  '    <link rel="stylesheet" href="./assets/index.css">',
  '  </head>',
  '  <body>',
  '    <div id="root"></div>',
  '    <script src="./assets/index.js"></script>',
  '  </body>',
  '</html>',
].join(String.fromCharCode(10));

fs.writeFileSync(path.join(distDir, 'index.html'), html);

console.log('Build complete!');