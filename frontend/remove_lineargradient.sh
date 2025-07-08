#!/bin/bash

# Script to remove LinearGradient from all files
# Run this from the frontend directory

echo "Removing LinearGradient from all project files..."

# List of files to process
files=(
    "app/promo.tsx"
    "app/bundling.tsx" 
    "app/event.tsx"
    "app/terms.tsx"
    "app/shipping.tsx"
    "app/return.tsx"
    "app/contact.tsx"
    "app/custom-tumbler.tsx"
    "app/checkout.tsx"
    "app/payment-method.tsx"
    "app/payment-process.tsx"
    "app/payment-result.tsx"
    "app/about.tsx"
    "app/support.tsx"
    "app/blog.tsx"
    "app/blog-detail.tsx"
    "app/categories.tsx"
    "app/product-detail.tsx"
    "app/brand.tsx"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        
        # Remove LinearGradient import
        sed -i "s/import { LinearGradient } from 'expo-linear-gradient';//g" "$file"
        sed -i "s/, LinearGradient//g" "$file"
        sed -i "s/LinearGradient, //g" "$file"
        
        # Replace LinearGradient component with View
        sed -i "s/<LinearGradient/<View/g" "$file"
        sed -i "s/<\/LinearGradient>/<\/View>/g" "$file"
        
        # Remove colors prop
        sed -i "/colors={\[.*\]}/d" "$file"
        
        echo "Completed $file"
    else
        echo "File $file not found"
    fi
done

echo "LinearGradient removal completed!"
echo "Note: You'll need to manually add gradientBackground styles and fix styling"
