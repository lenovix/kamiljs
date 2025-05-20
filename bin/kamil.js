#!/usr/bin/env node

import { spawn } from 'child_process';

const command = process.argv[2];

if (command === 'dev') {
  const devProcess = spawn('node', ['dev.js'], {
    stdio: 'inherit',
    shell: true
  });

  devProcess.on('exit', code => {
    process.exit(code);
  });
} else {
  console.log(`❌ Unknown command: ${command}`);
  console.log('Usage: kamil dev');
}