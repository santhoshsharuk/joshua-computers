import{a as i,d,b as l}from"./firebase-By_hAIbR.js";const n=document.getElementById("product-container");async function o(){const t=new URLSearchParams(window.location.search).get("id");if(!t){n.innerHTML='<div class="text-center py-20 text-red-500">Product not found.</div>';return}try{const s=i(d,"products",t),a=await l(s);if(a.exists()){const r=a.data();c(r)}else n.innerHTML='<div class="text-center py-20 text-red-500">Product not found.</div>'}catch(s){console.error("Error loading product:",s),n.innerHTML='<div class="text-center py-20 text-red-500">Error loading product details.</div>'}}function c(e){const t=window.location.href,a=`https://wa.me/918110960489?text=${encodeURIComponent(`Hi Joshua Computers!

I want to purchase:
 ${e.name}
 Price: ₹${e.price.toLocaleString()}
 Specs:
  • Processor: ${e.processor}
  • RAM: ${e.ram}
  • Storage: ${e.ssd}
  • Brand: ${e.brand}
 Condition: ${e.condition}

Product Link: ${t}

Please confirm availability and next steps!

`)}`;n.innerHTML=`
    <div class="flex flex-col lg:flex-row gap-12 items-start fade-in-up">
      
      <div class="w-full lg:w-1/2">
        <div class="card-premium sticky top-24">
          <img src="${e.imageUrl}" alt="${e.name}" class="w-full h-auto object-contain max-h-[600px]">
        </div>
      </div>

      <div class="w-full lg:w-1/2">
        <span class="bg-lightning-yellow text-black text-sm font-bold px-4 py-2 rounded-full inline-block mb-4">${e.condition}</span>
        <h1 class="text-5xl font-heading font-bold mb-3">${e.name}</h1>
        <p class="text-gray-400 text-lg mb-8">${e.brand}</p>

        <div class="mb-8 p-6 bg-gradient-to-r from-lightning-yellow/20 to-lightning-yellow/5 rounded-2xl border border-lightning-yellow/30">
          <p class="text-5xl font-bold text-lightning-yellow mb-1">₹${e.price.toLocaleString()}</p>
          <p class="text-gray-400 text-sm">Inclusive of all taxes</p>
        </div>

        <a href="${a}" target="_blank" class="btn-primary text-center py-4 text-lg flex items-center justify-center gap-3 mb-8">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Enquire on WhatsApp
        </a>

        <div class="card-premium p-6 mb-6">
          <h3 class="text-xl font-bold mb-4">Specifications</h3>
          <div class="space-y-3">
            <div class="flex justify-between py-2 border-b border-gray-800">
              <span class="text-gray-400">Processor</span>
              <span class="font-medium">${e.processor}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-800">
              <span class="text-gray-400">RAM</span>
              <span class="font-medium">${e.ram}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-800">
              <span class="text-gray-400">Storage</span>
              <span class="font-medium">${e.ssd}</span>
            </div>
            <div class="flex justify-between py-2">
              <span class="text-gray-400">Brand</span>
              <span class="font-medium">${e.brand}</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
            <div class="text-2xl mb-2">🛡️</div>
            <div class="font-bold text-sm">Warranty</div>
            <div class="text-xs text-gray-500">1 Year</div>
          </div>
          <div class="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
            <div class="text-2xl mb-2">⚡</div>
            <div class="font-bold text-sm">Fast Delivery</div>
            <div class="text-xs text-gray-500">2-3 Days</div>
          </div>
          <div class="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
            <div class="text-2xl mb-2">↻</div>
            <div class="font-bold text-sm">7 Days Return</div>
            <div class="text-xs text-gray-500">Easy Returns</div>
          </div>
          <div class="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
            <div class="text-2xl mb-2">⚙️</div>
            <div class="font-bold text-sm">Free Setup</div>
            <div class="text-xs text-gray-500">Software Install</div>
          </div>
        </div>
      </div>
    </div>
  `}o();
