#!/usr/bin/env node
const { readFileSync, readdirSync, writeFileSync } = require('fs');
const Handlebars = require('handlebars');
const { join } = require('path');

const recipePath = join(__dirname, 'recipes');
const files = readdirSync(recipePath)
  .filter((fn) => fn.endsWith('.json'));

const template = Handlebars.compile(readFileSync(join(__dirname, 'template.hbs'), 'utf-8'));

for (const file of files) {
  const filePath = join(recipePath, file);
  const contents = readFileSync(filePath, 'utf-8');
  const recipe = JSON.parse(contents);

  const html = template(recipe);
  const destPath = join(__dirname, 'dist', file.replace('.json', '.html'));

  writeFileSync(destPath, html);
}
