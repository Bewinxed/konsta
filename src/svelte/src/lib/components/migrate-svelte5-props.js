const fs = require('fs');
const path = require('path');

function migrateProps(content) {
  // Match both direct exports and exports with aliases
  const exportRegex =
    /export\s+(let|const)\s+(\w+)(\s*=\s*([^;]+))?;|let\s+(\w+)\s*=\s*([^;]+);\s*export\s*{\s*\5\s+as\s+(\w+)\s*};/g;

  let props = [];
  let match;

  while ((match = exportRegex.exec(content)) !== null) {
    const [
      ,
      ,
      directName,
      ,
      directDefaultValue,
      aliasVarName,
      aliasDefaultValue,
      aliasExportName,
    ] = match;
    if (directName) {
      props.push({
        name: directName,
        defaultValue:
          directDefaultValue && directDefaultValue.trim() !== 'undefined'
            ? directDefaultValue.trim()
            : undefined,
      });
    } else {
      props.push({
        name: aliasExportName,
        varName: aliasVarName,
        defaultValue:
          aliasDefaultValue && aliasDefaultValue.trim() !== 'undefined'
            ? aliasDefaultValue.trim()
            : undefined,
      });
    }
  }

  let newPropsCode = 'let {\n';
  props.forEach(({ name, varName, defaultValue }) => {
    if (name === 'class') {
      newPropsCode += `  class: className${
        defaultValue ? ` = ${defaultValue}` : ''
      },\n`;
    } else if (varName) {
      newPropsCode += `  ${name}: ${varName}${
        defaultValue ? ` = ${defaultValue}` : ''
      },\n`;
    } else {
      newPropsCode += `  ${name}${defaultValue ? ` = ${defaultValue}` : ''},\n`;
    }
  });
  newPropsCode += '  children,\n';
  newPropsCode += '  ...restProps\n';
  newPropsCode += '}: {\n';
  props.forEach(({ name }) => {
    if (name === 'class') {
      newPropsCode += '  class?: string;\n';
    } else {
      newPropsCode += `  ${name}?: any;\n`; // You might want to specify more precise types here
    }
  });
  newPropsCode += '  children?: Snippet;\n';
  newPropsCode += '} = $props();\n';

  // Remove old prop declarations and exports
  let updatedContent = content.replace(
    /export\s+(let|const)\s+.*?;\n|let\s+\w+\s*=\s*[^;]+;\s*export\s*{\s*\w+\s+as\s+\w+\s*};\n/g,
    ''
  );

  // Replace $$restProps with restProps
  updatedContent = updatedContent.replace(/\$\$restProps/g, 'restProps');

  // Replace <slot /> with {@render children()}
  updatedContent = updatedContent.replace(
    /<slot\s*\/>/g,
    '{@render children()}'
  );

  // Replace on:xxx with onxxx for handlers
  updatedContent = updatedContent.replace(/on:(\w+)/g, 'on$1');

  // Find the position after the last import statement
  const lastImportIndex = updatedContent.lastIndexOf('import');
  const insertPosition =
    lastImportIndex !== -1
      ? updatedContent.indexOf(';', lastImportIndex) + 1
      : updatedContent.indexOf('<script>') + 8;

  // Insert the new props code after the last import or right after <script>
  updatedContent =
    updatedContent.slice(0, insertPosition) +
    '\n\n' +
    newPropsCode +
    updatedContent.slice(insertPosition);

  // Add Snippet import if it doesn't exist
  if (!updatedContent.includes('import { Snippet }')) {
    updatedContent = updatedContent.replace(
      '<script>',
      '<script>\nimport { Snippet } from "svelte";\n'
    );
  }

  // Ensure the script tag has the lang="ts" attribute
  if (!updatedContent.includes('<script lang="ts">')) {
    updatedContent = updatedContent.replace('<script>', '<script lang="ts">');
  }

  return updatedContent;
}

function processFile(filePath, isDryRun) {
  if (!filePath.endsWith('.svelte')) {
    console.log(`Skipping non-Svelte file: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = migrateProps(content);

  if (isDryRun) {
    console.log(`Would update: ${filePath}`);
    console.log('Diff:');
    console.log(diffStrings(content, updatedContent));
  } else {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated: ${filePath}`);
  }
}

function processPath(inputPath, isDryRun) {
  const stat = fs.statSync(inputPath);

  if (stat.isDirectory()) {
    processDirectory(inputPath, isDryRun);
  } else if (stat.isFile()) {
    processFile(inputPath, isDryRun);
  } else {
    console.error(`Invalid path: ${inputPath}`);
  }
}

function processDirectory(dirPath, isDryRun) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    processPath(filePath, isDryRun);
  });
}

function diffStrings(oldStr, newStr) {
  const oldLines = oldStr.split('\n');
  const newLines = newStr.split('\n');
  let diff = '';

  for (let i = 0; i < Math.max(oldLines.length, newLines.length); i++) {
    if (oldLines[i] !== newLines[i]) {
      if (oldLines[i]) {
        diff += `- ${oldLines[i]}\n`;
      }
      if (newLines[i]) {
        diff += `+ ${newLines[i]}\n`;
      }
    }
  }

  return diff;
}

// Usage
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const inputPath = args.find((arg) => !arg.startsWith('--'));

if (!inputPath) {
  console.error('Please provide a file or directory path');
  process.exit(1);
}

console.log(isDryRun ? 'Performing dry run...' : 'Migrating props...');
processPath(inputPath, isDryRun);
console.log(isDryRun ? 'Dry run complete!' : 'Migration complete!');
