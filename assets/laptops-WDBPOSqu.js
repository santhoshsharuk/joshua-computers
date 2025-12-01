import{q as h,c as g,d as f,o as p,g as v}from"./firebase-CM4c9l3M.js";const l=document.getElementById("products-grid"),x=document.getElementById("product-count"),c=document.getElementById("clear-filters");let a=[];async function y(){try{const n=h(g(f,"products"),p("createdAt","desc")),e=await v(n);a=[],e.forEach(t=>{a.push({id:t.id,...t.data()})}),i(a);const r=new URLSearchParams(window.location.search).get("condition");r&&(document.querySelectorAll(".filter-condition").forEach(t=>{t.value===r&&(t.checked=!0)}),d())}catch(n){console.error("Error loading products:",n),l.innerHTML='<div class="col-span-full text-center text-red-500">Error loading products.</div>'}}function i(n){if(l.innerHTML="",x.textContent=`${n.length} Products`,n.length===0){l.innerHTML='<div class="col-span-full text-center text-gray-500 py-20">No products match your filters.</div>';return}n.forEach(e=>{const o=document.createElement("div");o.className="card-premium group flex flex-col";const r=`${window.location.origin}${window.location.pathname.substring(0,window.location.pathname.lastIndexOf("/")+1)}product.html?id=${e.id}`,s=`https://wa.me/916382283294?text=${encodeURIComponent(`Hi Joshua Computers!

I'm interested in:
📱 ${e.name}
💰 Price: ₹${e.price.toLocaleString()}
📦 Condition: ${e.condition}

Product Link: ${r}

Please share more details!

Contact: 6382283294`)}`;o.innerHTML=`
      <div class="relative h-64 overflow-hidden bg-gray-800">
        <img src="${e.imageUrl}" alt="${e.name}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
        <div class="absolute top-3 right-3">
          <span class="bg-lightning-yellow text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">${e.condition}</span>
        </div>
        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a href="./product.html?id=${e.id}" class="bg-white text-black font-bold px-6 py-3 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Quick View
          </a>
        </div>
      </div>
      <div class="p-6 flex-grow flex flex-col bg-gradient-to-b from-gray-900 to-black">
        <h3 class="font-bold text-xl mb-3 text-white group-hover:text-lightning-yellow transition-colors">${e.name}</h3>
        <div class="text-gray-400 text-sm space-y-2 mb-4 flex-grow">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-lightning-yellow flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
            </svg>
            <span class="text-gray-300">${e.processor}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-lightning-yellow flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>
            </svg>
            <span class="text-gray-300">${e.ram} | ${e.ssd}</span>
          </div>
        </div>
        <div class="mt-auto pt-4 border-t border-gray-800">
          <div class="flex items-baseline gap-2 mb-4">
            <p class="text-lightning-yellow font-bold text-3xl">₹${e.price.toLocaleString()}</p>
            <span class="text-xs text-gray-500">incl. taxes</span>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <a href="./product.html?id=${e.id}" class="btn-outline text-center text-sm py-2.5">Details</a>
            <a href="${s}" target="_blank" class="btn-primary text-center text-sm py-2.5 flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Enquire
            </a>
          </div>
        </div>
      </div>
    `,l.appendChild(o)})}function d(){const n=Array.from(document.querySelectorAll(".filter-brand:checked")).map(t=>t.value),e=Array.from(document.querySelectorAll(".filter-ram:checked")).map(t=>t.value),o=Array.from(document.querySelectorAll(".filter-condition:checked")).map(t=>t.value),r=a.filter(t=>{const s=n.length===0||n.includes(t.brand),m=e.length===0||e.includes(t.ram),u=o.length===0||o.includes(t.condition);return s&&m&&u});i(r)}document.querySelectorAll('input[type="checkbox"]').forEach(n=>{n.addEventListener("change",d)});c&&c.addEventListener("click",()=>{document.querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),i(a)});y();
