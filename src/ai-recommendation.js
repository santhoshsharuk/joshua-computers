import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore";
import { getAIRecommendations } from './gemini';

let currentStep = 1;
const userAnswers = {};

// Initialize AI Recommendation Modal
export function initAIRecommendation() {
  const triggerBtn = document.getElementById('ai-recommend-btn');
  if (!triggerBtn) return;

  triggerBtn.addEventListener('click', openModal);
}

function openModal() {
  currentStep = 1;
  Object.keys(userAnswers).forEach(key => delete userAnswers[key]);
  
  const modal = createModal();
  document.body.appendChild(modal);
  renderStep(1);
}

function createModal() {
  const modal = document.createElement('div');
  modal.id = 'ai-modal';
  modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex justify-between items-center">
        <h2 class="text-2xl font-heading font-bold flex items-center gap-2">
          <svg class="w-7 h-7 text-lightning-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
          AI Laptop Finder
        </h2>
        <button onclick="document.getElementById('ai-modal').remove()" class="text-gray-400 hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <div id="modal-content" class="p-8">
        <!-- Content will be rendered here -->
      </div>
    </div>
  `;
  
  return modal;
}

function renderStep(step) {
  const content = document.getElementById('modal-content');
  if (!content) return;

  const steps = {
    1: {
      title: "What's your budget?",
      subtitle: "Tell us your maximum budget in rupees",
      options: [
        { label: "Under ₹30,000", value: "30000" },
        { label: "₹30,000 - ₹50,000", value: "50000" },
        { label: "₹50,000 - ₹70,000", value: "70000" },
        { label: "Above ₹70,000", value: "100000" }
      ],
      key: 'budget'
    },
    2: {
      title: "What will you use it for?",
      subtitle: "Select your primary use case",
      options: [
        { label: "📄 Office Work", value: "Office Work" },
        { label: "📚 Student", value: "Student" },
        { label: "💻 Programming", value: "Programming" },
        { label: "🎮 Gaming", value: "Gaming" },
        { label: "🎬 Video Editing", value: "Video Editing" },
        { label: "💼 Business", value: "Business" }
      ],
      key: 'usage'
    },
    3: {
      title: "Any brand preference?",
      subtitle: "Optional - we'll consider all brands if you skip",
      options: [
        { label: "HP", value: "HP" },
        { label: "Dell", value: "Dell" },
        { label: "Lenovo", value: "Lenovo" },
        { label: "Asus", value: "Asus" },
        { label: "No Preference", value: "" }
      ],
      key: 'brand'
    },
    4: {
      title: "Preferred screen size?",
      subtitle: "Optional - we'll consider all sizes if you skip",
      options: [
        { label: '13" - Compact', value: "13" },
        { label: '14" - Balanced', value: "14" },
        { label: '15.6" - Standard', value: "15.6" },
        { label: "Any Size", value: "" }
      ],
      key: 'screen'
    }
  };

  const stepData = steps[step];
  if (!stepData) return;

  const progress = (step / 4) * 100;

  content.innerHTML = `
    <div class="mb-8">
      <div class="flex justify-between text-sm text-gray-500 mb-2">
        <span>Step ${step} of 4</span>
        <span>${Math.round(progress)}%</span>
      </div>
      <div class="w-full bg-gray-800 rounded-full h-2">
        <div class="bg-lightning-yellow h-2 rounded-full transition-all duration-300" style="width: ${progress}%"></div>
      </div>
    </div>

    <h3 class="text-2xl font-bold mb-2">${stepData.title}</h3>
    <p class="text-gray-400 mb-8">${stepData.subtitle}</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${stepData.options.map(opt => `
        <button 
          class="option-btn p-5 rounded-xl border-2 border-gray-800 hover:border-lightning-yellow transition-all text-left font-medium hover:scale-105"
          data-value="${opt.value}"
        >
          ${opt.label}
        </button>
      `).join('')}
    </div>

    ${step > 1 ? `
      <button 
        id="back-btn" 
        class="mt-8 text-gray-400 hover:text-white flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back
      </button>
    ` : ''}
  `;

  // Attach event listeners
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-value');
      userAnswers[stepData.key] = value;
      
      if (step < 4) {
        currentStep++;
        renderStep(currentStep);
      } else {
        showLoading();
        getRecommendations();
      }
    });
  });

  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      currentStep--;
      renderStep(currentStep);
    });
  }
}

function showLoading() {
  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <div class="text-center py-16">
      <div class="inline-block w-16 h-16 border-4 border-lightning-yellow border-t-transparent rounded-full animate-spin mb-6"></div>
      <h3 class="text-2xl font-bold mb-2">AI is analyzing...</h3>
      <p class="text-gray-400">Finding the perfect laptops for you</p>
    </div>
  `;
}

async function getRecommendations() {
  try {
    // Fetch all products
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    // Get AI recommendations
    const recommendations = await getAIRecommendations(userAnswers, products);
    
    displayRecommendations(recommendations);

  } catch (error) {
    console.error("Error getting recommendations:", error);
    showError(error.message);
  }
}

function displayRecommendations(recommendations) {
  const content = document.getElementById('modal-content');
  
  content.innerHTML = `
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-lightning-yellow/10 backdrop-blur-xl rounded-2xl mb-4 border border-lightning-yellow/20">
        <svg class="w-8 h-8 text-lightning-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h3 class="text-3xl font-bold mb-2">AI Recommendations</h3>
      <p class="text-gray-400">We found ${recommendations.length} perfect match${recommendations.length > 1 ? 'es' : ''} for you</p>
    </div>

    <div class="space-y-6">
      ${recommendations.map((rec, index) => `
        <div class="relative group">
          <!-- Subtle glow effect -->
          <div class="absolute -inset-0.5 bg-gradient-to-r from-lightning-yellow/20 to-lightning-yellow/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          
          <!-- Main card -->
          <div class="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300">
            <div class="flex flex-col md:flex-row gap-6">
              
              <!-- Image -->
              <div class="w-full md:w-56 flex-shrink-0">
                <div class="relative aspect-square rounded-xl overflow-hidden bg-gray-800/50 border border-gray-700/50">
                  <img src="${rec.imageUrl}" alt="${rec.name}" class="w-full h-full object-cover">
                  <!-- Match badge -->
                  <div class="absolute top-3 right-3">
                    <div class="bg-black/80 backdrop-blur-md border border-lightning-yellow/30 text-lightning-yellow text-xs font-bold px-3 py-1.5 rounded-full">
                      #${index + 1} Match
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Content -->
              <div class="flex-1 flex flex-col">
                <div class="mb-4">
                  <h4 class="text-2xl font-bold mb-2 text-white">${rec.name}</h4>
                  <div class="flex flex-wrap gap-2 text-sm text-gray-400">
                    <span class="inline-flex items-center gap-1.5 bg-gray-800/50 px-3 py-1 rounded-lg">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                      ${rec.brand}
                    </span>
                    <span class="inline-flex items-center gap-1.5 bg-gray-800/50 px-3 py-1 rounded-lg">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>
                      </svg>
                      ${rec.ram}
                    </span>
                    <span class="inline-flex items-center gap-1.5 bg-gray-800/50 px-3 py-1 rounded-lg">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
                      </svg>
                      ${rec.ssd}
                    </span>
                  </div>
                </div>
                
                <!-- AI Insight -->
                <div class="mb-6 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 mt-0.5">
                      <div class="w-6 h-6 rounded-lg bg-lightning-yellow/20 flex items-center justify-center">
                        <svg class="w-4 h-4 text-lightning-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                        </svg>
                      </div>
                    </div>
                    <div class="flex-1">
                      <p class="text-xs font-semibold text-lightning-yellow mb-1">AI Analysis</p>
                      <p class="text-sm text-gray-300 leading-relaxed">${rec.reason}</p>
                    </div>
                  </div>
                </div>

                <!-- Price & Action -->
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-800/50">
                  <div>
                    <p class="text-xs text-gray-500 mb-1">Best Price</p>
                    <p class="text-3xl font-bold text-lightning-yellow">₹${rec.price.toLocaleString()}</p>
                  </div>
                  <a href="https://wa.me/918110960489?text=${encodeURIComponent(rec.whatsappMsg)}" target="_blank" class="btn-primary inline-flex items-center gap-2 px-6 py-3">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Enquire Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <button onclick="document.getElementById('ai-modal').remove()" class="btn-outline w-full mt-8 py-4">
      Close & Browse More
    </button>
  `;
}

function showError(message) {
  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <div class="text-center py-16">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </div>
      <h3 class="text-2xl font-bold mb-2 text-red-500">Oops! Something went wrong</h3>
      <p class="text-gray-400 mb-6">${message}</p>
      <button onclick="document.getElementById('ai-modal').remove()" class="btn-outline">
        Close
      </button>
    </div>
  `;
}
