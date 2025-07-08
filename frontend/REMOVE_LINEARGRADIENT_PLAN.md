# Remove LinearGradient from All Files - Batch Processing

## Files to Fix (20+ files):
- cart.tsx
- promo.tsx  
- bundling.tsx
- event.tsx
- terms.tsx
- shipping.tsx
- return.tsx
- contact.tsx
- custom-tumbler.tsx
- checkout.tsx
- payment-method.tsx
- payment-process.tsx
- payment-result.tsx
- about.tsx
- support.tsx
- blog.tsx
- blog-detail.tsx
- categories.tsx
- product-detail.tsx
- brand.tsx

## Pattern to Replace:

### FROM:
```tsx
import { LinearGradient } from 'expo-linear-gradient';
// ... other imports

return (
  <LinearGradient colors={['#DE8389', '#B488BF']} style={styles.container}>
    // content
  </LinearGradient>
);
```

### TO:
```tsx
// Remove import line
// ... other imports

return (
  <View style={[styles.container, styles.gradientBackground]}>
    // content  
  </View>
);

// Add to styles:
gradientBackground: {
  backgroundColor: '#DE8389',
}
```

## Automated Fix Strategy:
1. Remove LinearGradient import
2. Replace LinearGradient component with View
3. Add backgroundColor to style
4. Update closing tag

Let's start with the most critical files first.
