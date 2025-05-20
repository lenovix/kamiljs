#!/usr/bin/env node

import { Command } from 'commander';
import { startDevServer } from '../lib/devServer.js';

const program = new Command();

program
  .command('dev')
  .description('Start dev server')
  .action(startDevServer);

program.parse(process.argv);