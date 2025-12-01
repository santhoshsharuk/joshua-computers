import './style.css'
import { db } from './firebase';
import { collection, getDocs, query, orderBy, limit, where, Timestamp, doc, getDoc } from "firebase/firestore";
import { initAIRecommendation } from './ai-recommendation';

const bestSellersGrid = document.getElementById('best-sellers-grid');

async function loadBestSellers() {
  if (!bestSellersGrid) return;

  try {
    // Show only products from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysTimestamp = Timestamp.fromDate(thirtyDaysAgo);
    
    const q = query(
      collection(db, "products"), 
      where("createdAt", ">=", thirtyDaysTimestamp),
      orderBy("createdAt", "desc"), 
      limit(4)
    );
    const querySnapshot = await getDocs(q);

    bestSellersGrid.innerHTML = '';

    if (querySnapshot.empty) {
      bestSellersGrid.innerHTML = '<div class="col-span-full text-center text-gray-500">No recent products found.</div>';
      return;
    }

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const id = doc.id;
      
      const card = document.createElement('div');
      card.className = 'card-premium group cursor-pointer';
      card.innerHTML = `
        <div class="relative h-56 overflow-hidden bg-gray-800">
          <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
          <div class="absolute top-3 right-3">
            <span class="bg-lightning-yellow text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">${product.condition}</span>
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div class="p-5">
          <h3 class="font-bold text-lg mb-2 truncate group-hover:text-lightning-yellow transition-colors">${product.name}</h3>
          <p class="text-gray-400 text-sm mb-4">${product.brand} | ${product.ram} | ${product.ssd}</p>
          <div class="flex justify-between items-center">
            <div>
              <div class="text-lightning-yellow font-bold text-2xl">₹${product.price.toLocaleString()}</div>
              <div class="text-xs text-gray-500 mt-1">Inclusive of taxes</div>
            </div>
            <a href="./product.html?id=${id}" class="btn-outline text-xs py-2 px-4 scale-90 hover:scale-100">
              View
            </a>
          </div>
        </div>
      `;
      bestSellersGrid.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading best sellers:", error);
    bestSellersGrid.innerHTML = '<div class="col-span-full text-center text-red-500">Error loading products.</div>';
  }
}

// Load Hero Video
let heroPlayer = null;

async function loadHeroVideo() {
  const container = document.getElementById('hero-video-container');
  if (!container) return;

  // Simple hardcoded approach - you can change this video ID
  const DEFAULT_VIDEO_ID = ''; // Leave empty for no video, or add YouTube video ID
  
  try {
    // Try to load from Firestore (if permissions are fixed)
    const settingsRef = doc(db, 'settings', 'website');
    const settingsSnap = await getDoc(settingsRef);

    let videoId = DEFAULT_VIDEO_ID;
    
    if (settingsSnap.exists() && settingsSnap.data().heroVideoId) {
      videoId = settingsSnap.data().heroVideoId;
    }

    if (videoId) {
      // Create a unique container for YouTube Player API
      container.innerHTML = '<div id="hero-youtube-player" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>';
      
      // Load YouTube IFrame API
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      // Initialize player when API is ready
      window.onYouTubeIframeAPIReady = function() {
        heroPlayer = new YT.Player('hero-youtube-player', {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            loop: 1,
            playlist: videoId
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
          }
        });
      };

      // If API already loaded
      if (window.YT && window.YT.Player) {
        heroPlayer = new YT.Player('hero-youtube-player', {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            loop: 1,
            playlist: videoId
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
          }
        });
      }
    } else {
      container.innerHTML = '';
    }
  } catch (error) {
    console.error('Error loading hero video:', error);
    if (DEFAULT_VIDEO_ID) {
      container.innerHTML = `
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/${DEFAULT_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${DEFAULT_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"
        ></iframe>
      `;
    }
  }
}

// Player ready callback
function onPlayerReady(event) {
  event.target.playVideo();
  checkVideoTime();
}

// Check video time every second
function checkVideoTime() {
  if (!heroPlayer || !heroPlayer.getDuration) return;

  setInterval(() => {
    try {
      const currentTime = heroPlayer.getCurrentTime();
      const duration = heroPlayer.getDuration();
      const timeRemaining = duration - currentTime;

      // Reload when 10 seconds remain
      if (timeRemaining <= 10 && timeRemaining > 9) {
        console.log('Video ending soon, restarting...');
        heroPlayer.seekTo(0);
        heroPlayer.playVideo();
      }
    } catch (e) {
      // Player might not be ready yet
    }
  }, 1000);
}

// State change callback
function onPlayerStateChange(event) {
  // If video ends, restart it
  if (event.data === YT.PlayerState.ENDED) {
    event.target.seekTo(0);
    event.target.playVideo();
  }
}

loadBestSellers();
loadHeroVideo();
initAIRecommendation();
