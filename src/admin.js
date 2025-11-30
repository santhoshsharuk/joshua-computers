import { auth, db } from './firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy, where, Timestamp, setDoc, getDoc } from "firebase/firestore";

// DOM Elements
const loginForm = document.getElementById('login-form');
const addProductForm = document.getElementById('add-product-form');
const productList = document.getElementById('product-list');
const logoutBtn = document.getElementById('logout-btn');
const errorMsg = document.getElementById('error-msg');

// Auth State Listener
onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;
  
  if (user) {
    console.log("User is signed in:", user.email);
    if (path.includes('login.html')) {
      window.location.href = 'dashboard.html';
    } else if (path.includes('dashboard.html')) {
      initDashboard();
    }
  } else {
    console.log("User is signed out");
    if (path.includes('dashboard.html')) {
      window.location.href = 'login.html';
    }
  }
});

// Login Logic
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      errorMsg.textContent = "Login failed: " + error.message;
      errorMsg.classList.remove('hidden');
    }
  });
}

// Logout Logic
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    signOut(auth);
  });
}

// Dashboard Navigation
function initDashboard() {
  const navItems = document.querySelectorAll('.nav-item, .switch-view');
  const viewSections = document.querySelectorAll('.view-section');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = item.getAttribute('data-view');
      
      // Update active nav
      document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active', 'bg-lightning-yellow', 'text-black'));
      if (item.classList.contains('nav-item')) {
        item.classList.add('active', 'bg-lightning-yellow', 'text-black');
      }
      
      // Show target view
      viewSections.forEach(view => view.classList.add('hidden'));
      document.getElementById(`${targetView}-view`).classList.remove('hidden');
      
      // Load data based on view
      if (targetView === 'dashboard') loadDashboard();
      if (targetView === 'products') loadProducts();
      if (targetView === 'settings') loadSettings();
    });
  });
  
  // Load initial dashboard
  loadDashboard();
}

// Load Dashboard Stats
async function loadDashboard() {
  try {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    let totalProducts = 0;
    let newProducts = 0;
    let refurbProducts = 0;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const recentActivity = [];
    
    querySnapshot.forEach((doc) => {
      totalProducts++;
      const product = doc.data();
      
      if (product.condition === 'Refurbished') refurbProducts++;
      
      const createdAt = product.createdAt?.toDate();
      if (createdAt && createdAt > oneWeekAgo) {
        newProducts++;
        recentActivity.push({
          name: product.name,
          date: createdAt
        });
      }
    });
    
    // Update stats
    document.getElementById('total-products').textContent = totalProducts;
    document.getElementById('new-products').textContent = newProducts;
    document.getElementById('refurb-products').textContent = refurbProducts;
    
    // Update recent activity
    const activityDiv = document.getElementById('recent-activity');
    if (recentActivity.length > 0) {
      activityDiv.innerHTML = recentActivity.slice(0, 5).map(activity => `
        <div class="flex items-center justify-between py-2 border-b border-gray-800">
          <span class="text-sm">${activity.name}</span>
          <span class="text-xs text-gray-500">${activity.date.toLocaleDateString()}</span>
        </div>
      `).join('');
    } else {
      activityDiv.innerHTML = '<p class="text-gray-500">No recent activity</p>';
    }
    
  } catch (error) {
    console.error("Error loading dashboard:", error);
  }
}

// Add Product Logic
if (addProductForm) {
  addProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="inline-block animate-pulse">Adding...</span>';
    
    const name = document.getElementById('p-name').value;
    const price = Number(document.getElementById('p-price').value);
    const brand = document.getElementById('p-brand').value;
    const processor = document.getElementById('p-processor').value;
    const ram = document.getElementById('p-ram').value;
    const ssd = document.getElementById('p-ssd').value;
    const condition = document.getElementById('p-condition').value;
    const imageUrl = document.getElementById('p-image').value;
    
    const whatsappMsg = `Hi, I want to know more about ${name}`;

    try {
      await addDoc(collection(db, "products"), {
        name,
        price,
        brand,
        processor,
        ram,
        ssd,
        condition,
        imageUrl,
        whatsappMsg,
        createdAt: serverTimestamp()
      });
      
      // Success notification
      submitBtn.innerHTML = '✓ Product Added!';
      submitBtn.classList.add('bg-green-600');
      
      setTimeout(() => {
        addProductForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg> Add Product';
        submitBtn.classList.remove('bg-green-600');
        
        // Switch to products view
        document.querySelector('[data-view="products"]').click();
      }, 2000);
      
    } catch (error) {
      console.error("Error adding product: ", error);
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Error! Try again';
      submitBtn.classList.add('bg-red-600');
      
      setTimeout(() => {
        submitBtn.classList.remove('bg-red-600');
        submitBtn.innerHTML = '<svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg> Add Product';
      }, 2000);
    }
  });
}

// Load Products Logic
async function loadProducts() {
  if (!productList) return;
  
  productList.innerHTML = '<p class="text-gray-500 col-span-full text-center py-10">Loading...</p>';
  
  try {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    productList.innerHTML = '';
    
    if (querySnapshot.empty) {
      productList.innerHTML = '<p class="text-gray-500 col-span-full text-center py-10">No products found.</p>';
      return;
    }

    querySnapshot.forEach((docSnap) => {
      const product = docSnap.data();
      const id = docSnap.id;
      
      const card = document.createElement('div');
      card.className = 'card-premium p-5 flex flex-col';
      card.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-48 object-cover rounded mb-4 bg-gray-800">
        <h3 class="text-lg font-bold text-white mb-1">${product.name}</h3>
        <p class="text-lightning-yellow font-bold text-2xl mb-2">₹${product.price.toLocaleString()}</p>
        <div class="text-sm text-gray-400 mb-4 space-y-1">
          <p>${product.brand} | ${product.condition}</p>
          <p>${product.processor}</p>
          <p>${product.ram} | ${product.ssd}</p>
        </div>
        <button class="delete-btn mt-auto bg-red-900/20 text-red-400 hover:bg-red-900/40 px-4 py-2 rounded transition text-sm" data-id="${id}">
          <svg class="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          Delete
        </button>
      `;
      
      productList.appendChild(card);
    });

    // Attach delete event listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', handleDelete);
    });

  } catch (error) {
    console.error("Error loading products:", error);
    productList.innerHTML = '<p class="text-red-500 col-span-full text-center py-10">Error loading products.</p>';
  }
}

// Delete Product Logic
async function handleDelete(e) {
  if (!confirm("Are you sure you want to delete this product?")) return;
  
  const btn = e.currentTarget;
  btn.disabled = true;
  btn.innerHTML = '<span class="inline-block animate-pulse">Deleting...</span>';
  
  const id = btn.getAttribute('data-id');
  try {
    await deleteDoc(doc(db, "products", id));
    loadProducts();
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Error deleting product.");
    btn.disabled = false;
    btn.innerHTML = 'Delete';
  }
}

// Settings Management
const settingsForm = document.getElementById('settings-form');
const youtubeUrlInput = document.getElementById('youtube-url');
const videoPreview = document.getElementById('video-preview');
const clearVideoBtn = document.getElementById('clear-video');

// Extract YouTube video ID from URL
function getYouTubeVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Preview video
if (youtubeUrlInput) {
  youtubeUrlInput.addEventListener('input', (e) => {
    const url = e.target.value.trim();
    if (!url) {
      videoPreview.innerHTML = '<p class="text-gray-500">Video preview will appear here</p>';
      return;
    }

    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      videoPreview.innerHTML = `
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/${videoId}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          class="rounded-lg"
        ></iframe>
      `;
    } else {
      videoPreview.innerHTML = '<p class="text-red-500">Invalid YouTube URL</p>';
    }
  });
}

// Save settings
if (settingsForm) {
  settingsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const url = youtubeUrlInput.value.trim();
    const videoId = url ? getYouTubeVideoId(url) : null;
    
    if (url && !videoId) {
      showSettingsStatus('Invalid YouTube URL', 'error');
      return;
    }

    try {
      const settingsRef = doc(db, 'settings', 'website');
      await setDoc(settingsRef, {
        heroVideoUrl: url,
        heroVideoId: videoId,
        updatedAt: serverTimestamp()
      });

      showSettingsStatus('Settings saved successfully!', 'success');
    } catch (error) {
      console.error('Error saving settings:', error);
      showSettingsStatus('Error saving settings', 'error');
    }
  });
}

// Clear video
if (clearVideoBtn) {
  clearVideoBtn.addEventListener('click', async () => {
    if (!confirm('Clear the hero video?')) return;

    try {
      const settingsRef = doc(db, 'settings', 'website');
      await setDoc(settingsRef, {
        heroVideoUrl: '',
        heroVideoId: '',
        updatedAt: serverTimestamp()
      });

      youtubeUrlInput.value = '';
      videoPreview.innerHTML = '<p class="text-gray-500">Video preview will appear here</p>';
      showSettingsStatus('Video cleared successfully!', 'success');
    } catch (error) {
      console.error('Error clearing video:', error);
      showSettingsStatus('Error clearing video', 'error');
    }
  });
}

// Load current settings
async function loadSettings() {
  try {
    const settingsRef = doc(db, 'settings', 'website');
    const settingsSnap = await getDoc(settingsRef);

    if (settingsSnap.exists()) {
      const data = settingsSnap.data();
      if (data.heroVideoUrl) {
        youtubeUrlInput.value = data.heroVideoUrl;
        youtubeUrlInput.dispatchEvent(new Event('input'));
      }
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

// Show status message
function showSettingsStatus(message, type) {
  const statusDiv = document.getElementById('settings-status');
  statusDiv.className = `mt-4 p-4 rounded-lg ${type === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`;
  statusDiv.textContent = message;
  statusDiv.classList.remove('hidden');

  setTimeout(() => {
    statusDiv.classList.add('hidden');
  }, 3000);
}
