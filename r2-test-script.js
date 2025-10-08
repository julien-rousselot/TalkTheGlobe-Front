/**
 * 🧪 R2 URL Diagnostic Test
 * 
 * Run this in your browser console to test the R2 URL:
 * https://pub-a69e81e1c8964a66b52f33ccfcf0da8d.r2.dev/pictures/1759659500550-Picture-1.png
 */

async function testR2Diagnostics() {
  const testUrl = 'https://pub-a69e81e1c8964a66b52f33ccfcf0da8d.r2.dev/pictures/1759659500550-Picture-1.png';
  
  console.log('🔍 Starting R2 URL diagnostics...');
  console.log('🎯 Test URL:', testUrl);
  
  // Test 1: Direct fetch (CORS test)
  try {
    console.log('\n📡 Test 1: CORS Fetch Test');
    const response = await fetch(testUrl, { method: 'HEAD', mode: 'cors' });
    if (response.ok) {
      console.log('✅ CORS fetch SUCCESS - R2 allows cross-origin requests');
    } else {
      console.error('❌ CORS fetch FAILED - Status:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('❌ CORS fetch ERROR:', error.message);
    if (error.message.includes('CORS')) {
      console.error('💡 CORS policy missing on R2 bucket');
    }
  }
  
  // Test 2: Image load test
  try {
    console.log('\n🖼️ Test 2: Image Load Test');
    const img = new Image();
    
    const loadPromise = new Promise((resolve, reject) => {
      img.onload = () => resolve('loaded');
      img.onerror = (e) => reject(e);
      img.src = testUrl;
    });
    
    await loadPromise;
    console.log('✅ Image load SUCCESS - Image loads correctly');
    console.log('📏 Image dimensions:', img.naturalWidth, 'x', img.naturalHeight);
  } catch (error) {
    console.error('❌ Image load FAILED:', error);
  }
  
  // Test 3: Check if URL is reachable without CORS
  try {
    console.log('\n🔗 Test 3: No-CORS Fetch Test');
    const response = await fetch(testUrl, { method: 'GET', mode: 'no-cors' });
    console.log('✅ No-CORS fetch completed - URL is reachable');
    console.log('📊 Response type:', response.type);
  } catch (error) {
    console.error('❌ No-CORS fetch FAILED:', error);
  }
  
  console.log('\n🎯 DIAGNOSIS SUMMARY:');
  console.log('1. If CORS fetch fails → Add CORS policy to R2 bucket');
  console.log('2. If image load fails → Check bucket public read permissions'); 
  console.log('3. If no-cors fails → Check R2 bucket exists and URL is correct');
  console.log('\n🔧 CORS Policy needed:');
  console.log(`[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]`);
}

// Auto-run the test
testR2Diagnostics();
