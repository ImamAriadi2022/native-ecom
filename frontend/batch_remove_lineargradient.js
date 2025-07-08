const fs = require('fs');
const path = require('path');

const filesToProcess = [
  'app/brand.tsx',
  'app/payment-process.tsx', 
  'app/payment-result.tsx',
  'app/about.tsx',
  'app/support.tsx',
  'app/blog.tsx',
  'app/blog-detail.tsx',
  'app/categories.tsx',
  'app/product-detail.tsx'
];

function removeLinearGradient(filePath) {
  try {
    console.log(`Processing ${filePath}...`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove LinearGradient import
    content = content.replace(
      /import { LinearGradient } from 'expo-linear-gradient';\n/g,
      ''
    );
    
    // Replace LinearGradient opening tag with View
    content = content.replace(
      /<LinearGradient\s+colors={\[['"][^'"]*['"],\s*['"][^'"]*['"]\]}\s+style={styles\.container}\s*>/g,
      '<View style={[styles.container, styles.gradientBackground]}>'
    );
    
    // Replace closing tag
    content = content.replace(
      /<\/LinearGradient>/g,
      '</View>'
    );
    
    // Add gradientBackground style after container style
    const containerStyleRegex = /(container:\s*{\s*flex:\s*1,[\s\S]*?},)/;
    if (containerStyleRegex.test(content)) {
      content = content.replace(
        containerStyleRegex,
        '$1\n  gradientBackground: {\n    backgroundColor: \'#DE8389\',\n  },'
      );
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Successfully processed ${filePath}`);
    
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

console.log('Starting batch LinearGradient removal...');

filesToProcess.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    removeLinearGradient(fullPath);
  } else {
    console.log(`⚠ File not found: ${fullPath}`);
  }
});

console.log('Batch processing complete!');
