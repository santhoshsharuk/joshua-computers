import{g as Z,c as ee,d as N,T as re,q as ae,w as le,o as ce,l as de,a as ue,b as fe}from"./firebase-B1fAYHT2.js";var k;(function(e){e.STRING="string",e.NUMBER="number",e.INTEGER="integer",e.BOOLEAN="boolean",e.ARRAY="array",e.OBJECT="object"})(k||(k={}));var L;(function(e){e.LANGUAGE_UNSPECIFIED="language_unspecified",e.PYTHON="python"})(L||(L={}));var D;(function(e){e.OUTCOME_UNSPECIFIED="outcome_unspecified",e.OUTCOME_OK="outcome_ok",e.OUTCOME_FAILED="outcome_failed",e.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(D||(D={}));const $=["user","model","function","system"];var B;(function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",e.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(B||(B={}));var G;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"})(G||(G={}));var H;(function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"})(H||(H={}));var U;(function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"})(U||(U={}));var I;(function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.LANGUAGE="LANGUAGE",e.BLOCKLIST="BLOCKLIST",e.PROHIBITED_CONTENT="PROHIBITED_CONTENT",e.SPII="SPII",e.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",e.OTHER="OTHER"})(I||(I={}));var j;(function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"})(j||(j={}));var F;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.AUTO="AUTO",e.ANY="ANY",e.NONE="NONE"})(F||(F={}));var P;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.MODE_DYNAMIC="MODE_DYNAMIC"})(P||(P={}));class f extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class w extends f{constructor(t,n){super(t),this.response=n}}class te extends f{constructor(t,n,o,s){super(t),this.status=n,this.statusText=o,this.errorDetails=s}}class m extends f{}class ne extends f{}const ge="https://generativelanguage.googleapis.com",he="v1beta",pe="0.24.1",ve="genai-js";var y;(function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"})(y||(y={}));class me{constructor(t,n,o,s,i){this.model=t,this.task=n,this.apiKey=o,this.stream=s,this.requestOptions=i}toString(){var t,n;const o=((t=this.requestOptions)===null||t===void 0?void 0:t.apiVersion)||he;let i=`${((n=this.requestOptions)===null||n===void 0?void 0:n.baseUrl)||ge}/${o}/${this.model}:${this.task}`;return this.stream&&(i+="?alt=sse"),i}}function ye(e){const t=[];return e?.apiClient&&t.push(e.apiClient),t.push(`${ve}/${pe}`),t.join(" ")}async function be(e){var t;const n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",ye(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let o=(t=e.requestOptions)===null||t===void 0?void 0:t.customHeaders;if(o){if(!(o instanceof Headers))try{o=new Headers(o)}catch(s){throw new m(`unable to convert customHeaders value ${JSON.stringify(o)} to Headers: ${s.message}`)}for(const[s,i]of o.entries()){if(s==="x-goog-api-key")throw new m(`Cannot set reserved header name ${s}`);if(s==="x-goog-api-client")throw new m(`Header name ${s} can only be set using the apiClient field`);n.append(s,i)}}return n}async function Ee(e,t,n,o,s,i){const r=new me(e,t,n,o,i);return{url:r.toString(),fetchOptions:Object.assign(Object.assign({},Ie(i)),{method:"POST",headers:await be(r),body:s})}}async function R(e,t,n,o,s,i={},r=fetch){const{url:a,fetchOptions:l}=await Ee(e,t,n,o,s,i);return we(a,l,r)}async function we(e,t,n=fetch){let o;try{o=await n(e,t)}catch(s){Ce(s,e)}return o.ok||await _e(o,e),o}function Ce(e,t){let n=e;throw n.name==="AbortError"?(n=new ne(`Request aborted when fetching ${t.toString()}: ${e.message}`),n.stack=e.stack):e instanceof te||e instanceof m||(n=new f(`Error fetching from ${t.toString()}: ${e.message}`),n.stack=e.stack),n}async function _e(e,t){let n="",o;try{const s=await e.json();n=s.error.message,s.error.details&&(n+=` ${JSON.stringify(s.error.details)}`,o=s.error.details)}catch{}throw new te(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${n}`,e.status,e.statusText,o)}function Ie(e){const t={};if(e?.signal!==void 0||e?.timeout>=0){const n=new AbortController;e?.timeout>=0&&setTimeout(()=>n.abort(),e.timeout),e?.signal&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}function M(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),A(e.candidates[0]))throw new w(`${p(e)}`,e);return xe(e)}else if(e.promptFeedback)throw new w(`Text not available. ${p(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),A(e.candidates[0]))throw new w(`${p(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),Y(e)[0]}else if(e.promptFeedback)throw new w(`Function call not available. ${p(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),A(e.candidates[0]))throw new w(`${p(e)}`,e);return Y(e)}else if(e.promptFeedback)throw new w(`Function call not available. ${p(e)}`,e)},e}function xe(e){var t,n,o,s;const i=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const r of(s=(o=e.candidates)===null||o===void 0?void 0:o[0].content)===null||s===void 0?void 0:s.parts)r.text&&i.push(r.text),r.executableCode&&i.push("\n```"+r.executableCode.language+`
`+r.executableCode.code+"\n```\n"),r.codeExecutionResult&&i.push("\n```\n"+r.codeExecutionResult.output+"\n```\n");return i.length>0?i.join(""):""}function Y(e){var t,n,o,s;const i=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const r of(s=(o=e.candidates)===null||o===void 0?void 0:o[0].content)===null||s===void 0?void 0:s.parts)r.functionCall&&i.push(r.functionCall);if(i.length>0)return i}const Oe=[I.RECITATION,I.SAFETY,I.LANGUAGE];function A(e){return!!e.finishReason&&Oe.includes(e.finishReason)}function p(e){var t,n,o;let s="";if((!e.candidates||e.candidates.length===0)&&e.promptFeedback)s+="Response was blocked",!((t=e.promptFeedback)===null||t===void 0)&&t.blockReason&&(s+=` due to ${e.promptFeedback.blockReason}`),!((n=e.promptFeedback)===null||n===void 0)&&n.blockReasonMessage&&(s+=`: ${e.promptFeedback.blockReasonMessage}`);else if(!((o=e.candidates)===null||o===void 0)&&o[0]){const i=e.candidates[0];A(i)&&(s+=`Candidate was blocked due to ${i.finishReason}`,i.finishMessage&&(s+=`: ${i.finishMessage}`))}return s}function x(e){return this instanceof x?(this.v=e,this):new x(e)}function Re(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var o=n.apply(e,t||[]),s,i=[];return s={},r("next"),r("throw"),r("return"),s[Symbol.asyncIterator]=function(){return this},s;function r(d){o[d]&&(s[d]=function(c){return new Promise(function(g,E){i.push([d,c,g,E])>1||a(d,c)})})}function a(d,c){try{l(o[d](c))}catch(g){b(i[0][3],g)}}function l(d){d.value instanceof x?Promise.resolve(d.value.v).then(u,h):b(i[0][2],d)}function u(d){a("next",d)}function h(d){a("throw",d)}function b(d,c){d(c),i.shift(),i.length&&a(i[0][0],i[0][1])}}const V=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function Ae(e){const t=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),n=Ne(t),[o,s]=n.tee();return{stream:Te(o),response:Se(s)}}async function Se(e){const t=[],n=e.getReader();for(;;){const{done:o,value:s}=await n.read();if(o)return M(Me(t));t.push(s)}}function Te(e){return Re(this,arguments,function*(){const n=e.getReader();for(;;){const{value:o,done:s}=yield x(n.read());if(s)break;yield yield x(M(o))}})}function Ne(e){const t=e.getReader();return new ReadableStream({start(o){let s="";return i();function i(){return t.read().then(({value:r,done:a})=>{if(a){if(s.trim()){o.error(new f("Failed to parse stream"));return}o.close();return}s+=r;let l=s.match(V),u;for(;l;){try{u=JSON.parse(l[1])}catch{o.error(new f(`Error parsing JSON response: "${l[1]}"`));return}o.enqueue(u),s=s.substring(l[0].length),l=s.match(V)}return i()}).catch(r=>{let a=r;throw a.stack=r.stack,a.name==="AbortError"?a=new ne("Request aborted when reading from the stream"):a=new f("Error reading from the stream"),a})}}})}function Me(e){const t=e[e.length-1],n={promptFeedback:t?.promptFeedback};for(const o of e){if(o.candidates){let s=0;for(const i of o.candidates)if(n.candidates||(n.candidates=[]),n.candidates[s]||(n.candidates[s]={index:s}),n.candidates[s].citationMetadata=i.citationMetadata,n.candidates[s].groundingMetadata=i.groundingMetadata,n.candidates[s].finishReason=i.finishReason,n.candidates[s].finishMessage=i.finishMessage,n.candidates[s].safetyRatings=i.safetyRatings,i.content&&i.content.parts){n.candidates[s].content||(n.candidates[s].content={role:i.content.role||"user",parts:[]});const r={};for(const a of i.content.parts)a.text&&(r.text=a.text),a.functionCall&&(r.functionCall=a.functionCall),a.executableCode&&(r.executableCode=a.executableCode),a.codeExecutionResult&&(r.codeExecutionResult=a.codeExecutionResult),Object.keys(r).length===0&&(r.text=""),n.candidates[s].content.parts.push(r)}s++}o.usageMetadata&&(n.usageMetadata=o.usageMetadata)}return n}async function oe(e,t,n,o){const s=await R(t,y.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),o);return Ae(s)}async function se(e,t,n,o){const i=await(await R(t,y.GENERATE_CONTENT,e,!1,JSON.stringify(n),o)).json();return{response:M(i)}}function ie(e){if(e!=null){if(typeof e=="string")return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function O(e){let t=[];if(typeof e=="string")t=[{text:e}];else for(const n of e)typeof n=="string"?t.push({text:n}):t.push(n);return ke(t)}function ke(e){const t={role:"user",parts:[]},n={role:"function",parts:[]};let o=!1,s=!1;for(const i of e)"functionResponse"in i?(n.parts.push(i),s=!0):(t.parts.push(i),o=!0);if(o&&s)throw new f("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!o&&!s)throw new f("No content is provided for sending chat message.");return o?t:n}function Le(e,t){var n;let o={model:t?.model,generationConfig:t?.generationConfig,safetySettings:t?.safetySettings,tools:t?.tools,toolConfig:t?.toolConfig,systemInstruction:t?.systemInstruction,cachedContent:(n=t?.cachedContent)===null||n===void 0?void 0:n.name,contents:[]};const s=e.generateContentRequest!=null;if(e.contents){if(s)throw new m("CountTokensRequest must have one of contents or generateContentRequest, not both.");o.contents=e.contents}else if(s)o=Object.assign(Object.assign({},o),e.generateContentRequest);else{const i=O(e);o.contents=[i]}return{generateContentRequest:o}}function K(e){let t;return e.contents?t=e:t={contents:[O(e)]},e.systemInstruction&&(t.systemInstruction=ie(e.systemInstruction)),t}function De(e){return typeof e=="string"||Array.isArray(e)?{content:O(e)}:e}const q=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],$e={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function Be(e){let t=!1;for(const n of e){const{role:o,parts:s}=n;if(!t&&o!=="user")throw new f(`First content should be with role 'user', got ${o}`);if(!$.includes(o))throw new f(`Each item should include role field. Got ${o} but valid roles are: ${JSON.stringify($)}`);if(!Array.isArray(s))throw new f("Content should have 'parts' property with an array of Parts");if(s.length===0)throw new f("Each Content should have at least one part");const i={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const a of s)for(const l of q)l in a&&(i[l]+=1);const r=$e[o];for(const a of q)if(!r.includes(a)&&i[a]>0)throw new f(`Content with role '${o}' can't contain '${a}' part`);t=!0}}function J(e){var t;if(e.candidates===void 0||e.candidates.length===0)return!1;const n=(t=e.candidates[0])===null||t===void 0?void 0:t.content;if(n===void 0||n.parts===void 0||n.parts.length===0)return!1;for(const o of n.parts)if(o===void 0||Object.keys(o).length===0||o.text!==void 0&&o.text==="")return!1;return!0}const W="SILENT_ERROR";class Ge{constructor(t,n,o,s={}){this.model=n,this.params=o,this._requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,o?.history&&(Be(o.history),this._history=o.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t,n={}){var o,s,i,r,a,l;await this._sendPromise;const u=O(t),h={safetySettings:(o=this.params)===null||o===void 0?void 0:o.safetySettings,generationConfig:(s=this.params)===null||s===void 0?void 0:s.generationConfig,tools:(i=this.params)===null||i===void 0?void 0:i.tools,toolConfig:(r=this.params)===null||r===void 0?void 0:r.toolConfig,systemInstruction:(a=this.params)===null||a===void 0?void 0:a.systemInstruction,cachedContent:(l=this.params)===null||l===void 0?void 0:l.cachedContent,contents:[...this._history,u]},b=Object.assign(Object.assign({},this._requestOptions),n);let d;return this._sendPromise=this._sendPromise.then(()=>se(this._apiKey,this.model,h,b)).then(c=>{var g;if(J(c.response)){this._history.push(u);const E=Object.assign({parts:[],role:"model"},(g=c.response.candidates)===null||g===void 0?void 0:g[0].content);this._history.push(E)}else{const E=p(c.response);E&&console.warn(`sendMessage() was unsuccessful. ${E}. Inspect response object for details.`)}d=c}).catch(c=>{throw this._sendPromise=Promise.resolve(),c}),await this._sendPromise,d}async sendMessageStream(t,n={}){var o,s,i,r,a,l;await this._sendPromise;const u=O(t),h={safetySettings:(o=this.params)===null||o===void 0?void 0:o.safetySettings,generationConfig:(s=this.params)===null||s===void 0?void 0:s.generationConfig,tools:(i=this.params)===null||i===void 0?void 0:i.tools,toolConfig:(r=this.params)===null||r===void 0?void 0:r.toolConfig,systemInstruction:(a=this.params)===null||a===void 0?void 0:a.systemInstruction,cachedContent:(l=this.params)===null||l===void 0?void 0:l.cachedContent,contents:[...this._history,u]},b=Object.assign(Object.assign({},this._requestOptions),n),d=oe(this._apiKey,this.model,h,b);return this._sendPromise=this._sendPromise.then(()=>d).catch(c=>{throw new Error(W)}).then(c=>c.response).then(c=>{if(J(c)){this._history.push(u);const g=Object.assign({},c.candidates[0].content);g.role||(g.role="model"),this._history.push(g)}else{const g=p(c);g&&console.warn(`sendMessageStream() was unsuccessful. ${g}. Inspect response object for details.`)}}).catch(c=>{c.message!==W&&console.error(c)}),d}}async function He(e,t,n,o){return(await R(t,y.COUNT_TOKENS,e,!1,JSON.stringify(n),o)).json()}async function Ue(e,t,n,o){return(await R(t,y.EMBED_CONTENT,e,!1,JSON.stringify(n),o)).json()}async function je(e,t,n,o){const s=n.requests.map(r=>Object.assign(Object.assign({},r),{model:t}));return(await R(t,y.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:s}),o)).json()}class z{constructor(t,n,o={}){this.apiKey=t,this._requestOptions=o,n.model.includes("/")?this.model=n.model:this.model=`models/${n.model}`,this.generationConfig=n.generationConfig||{},this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=ie(n.systemInstruction),this.cachedContent=n.cachedContent}async generateContent(t,n={}){var o;const s=K(t),i=Object.assign(Object.assign({},this._requestOptions),n);return se(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(o=this.cachedContent)===null||o===void 0?void 0:o.name},s),i)}async generateContentStream(t,n={}){var o;const s=K(t),i=Object.assign(Object.assign({},this._requestOptions),n);return oe(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(o=this.cachedContent)===null||o===void 0?void 0:o.name},s),i)}startChat(t){var n;return new Ge(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(n=this.cachedContent)===null||n===void 0?void 0:n.name},t),this._requestOptions)}async countTokens(t,n={}){const o=Le(t,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),s=Object.assign(Object.assign({},this._requestOptions),n);return He(this.apiKey,this.model,o,s)}async embedContent(t,n={}){const o=De(t),s=Object.assign(Object.assign({},this._requestOptions),n);return Ue(this.apiKey,this.model,o,s)}async batchEmbedContents(t,n={}){const o=Object.assign(Object.assign({},this._requestOptions),n);return je(this.apiKey,this.model,t,o)}}class Fe{constructor(t){this.apiKey=t}getGenerativeModel(t,n){if(!t.model)throw new f("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new z(this.apiKey,t,n)}getGenerativeModelFromCachedContent(t,n,o){if(!t.name)throw new m("Cached content must contain a `name` field.");if(!t.model)throw new m("Cached content must contain a `model` field.");const s=["model","systemInstruction"];for(const r of s)if(n?.[r]&&t[r]&&n?.[r]!==t[r]){if(r==="model"){const a=n.model.startsWith("models/")?n.model.replace("models/",""):n.model,l=t.model.startsWith("models/")?t.model.replace("models/",""):t.model;if(a===l)continue}throw new m(`Different value for "${r}" specified in modelParams (${n[r]}) and cachedContent (${t[r]})`)}const i=Object.assign(Object.assign({},n),{model:t.model,tools:t.tools,toolConfig:t.toolConfig,systemInstruction:t.systemInstruction,cachedContent:t});return new z(this.apiKey,i,o)}}const Pe=new Fe("AIzaSyBVX_PzajFT3Xh7WsrPmn6H4XRvSTHA4-o");async function Ye(e,t){try{const n=Pe.getGenerativeModel({model:"gemini-2.5-flash"}),o=`
You are a laptop recommendation expert for Joshua Computers, a trusted laptop retailer.

USER REQUIREMENTS:
- Budget: ₹${e.budget}
- Primary Usage: ${e.usage}
- Preferred Brand: ${e.brand||"No preference"}
- Screen Size: ${e.screen||"Any"}

AVAILABLE PRODUCTS (JSON):
${JSON.stringify(t,null,2)}

TASK:
Analyze the products and recommend the TOP 2-3 best matches for this user.
Consider:
1. Budget fit (price should be within or slightly below budget)
2. Usage compatibility (processor, RAM, storage needs)
3. Value for money
4. Brand preference (if specified)

Return ONLY valid JSON array (no markdown, no explanation outside JSON):
[
  {
    "productId": "id from products array",
    "name": "product name",
    "price": product price,
    "reason": "Brief 1-2 sentence explanation why this laptop is perfect for their needs",
    "match_score": 95
  }
]

IMPORTANT: 
- Return ONLY the JSON array, nothing else
- Maximum 3 recommendations
- Order by best match first
- If budget is very low and no good match exists, still recommend the closest 2 options
`,r=(await n.generateContent(o)).response.text().replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();return JSON.parse(r).map(l=>{const u=t.find(h=>h.id===l.productId);return{...l,imageUrl:u?.imageUrl,brand:u?.brand,processor:u?.processor,ram:u?.ram,ssd:u?.ssd,condition:u?.condition,whatsappMsg:u?.whatsappMsg||`Hi, I want to know more about ${l.name}`}})}catch(n){throw console.error("Gemini AI Error:",n),new Error("Failed to get AI recommendations. Please try again.")}}let _=1;const S={};function Ve(){const e=document.getElementById("ai-recommend-btn");e&&e.addEventListener("click",Ke)}function Ke(){_=1,Object.keys(S).forEach(t=>delete S[t]);const e=qe();document.body.appendChild(e),T(1)}function qe(){const e=document.createElement("div");return e.id="ai-modal",e.className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4",e.innerHTML=`
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
  `,e}function T(e){const t=document.getElementById("modal-content");if(!t)return;const o={1:{title:"What's your budget?",subtitle:"Tell us your maximum budget in rupees",options:[{label:"Under ₹30,000",value:"30000"},{label:"₹30,000 - ₹50,000",value:"50000"},{label:"₹50,000 - ₹70,000",value:"70000"},{label:"Above ₹70,000",value:"100000"}],key:"budget"},2:{title:"What will you use it for?",subtitle:"Select your primary use case",options:[{label:"📄 Office Work",value:"Office Work"},{label:"📚 Student",value:"Student"},{label:"💻 Programming",value:"Programming"},{label:"🎮 Gaming",value:"Gaming"},{label:"🎬 Video Editing",value:"Video Editing"},{label:"💼 Business",value:"Business"}],key:"usage"},3:{title:"Any brand preference?",subtitle:"Optional - we'll consider all brands if you skip",options:[{label:"HP",value:"HP"},{label:"Dell",value:"Dell"},{label:"Lenovo",value:"Lenovo"},{label:"Asus",value:"Asus"},{label:"No Preference",value:""}],key:"brand"},4:{title:"Preferred screen size?",subtitle:"Optional - we'll consider all sizes if you skip",options:[{label:'13" - Compact',value:"13"},{label:'14" - Balanced',value:"14"},{label:'15.6" - Standard',value:"15.6"},{label:"Any Size",value:""}],key:"screen"}}[e];if(!o)return;const s=e/4*100;t.innerHTML=`
    <div class="mb-8">
      <div class="flex justify-between text-sm text-gray-500 mb-2">
        <span>Step ${e} of 4</span>
        <span>${Math.round(s)}%</span>
      </div>
      <div class="w-full bg-gray-800 rounded-full h-2">
        <div class="bg-lightning-yellow h-2 rounded-full transition-all duration-300" style="width: ${s}%"></div>
      </div>
    </div>

    <h3 class="text-2xl font-bold mb-2">${o.title}</h3>
    <p class="text-gray-400 mb-8">${o.subtitle}</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${o.options.map(r=>`
        <button 
          class="option-btn p-5 rounded-xl border-2 border-gray-800 hover:border-lightning-yellow transition-all text-left font-medium hover:scale-105"
          data-value="${r.value}"
        >
          ${r.label}
        </button>
      `).join("")}
    </div>

    ${e>1?`
      <button 
        id="back-btn" 
        class="mt-8 text-gray-400 hover:text-white flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back
      </button>
    `:""}
  `,document.querySelectorAll(".option-btn").forEach(r=>{r.addEventListener("click",()=>{const a=r.getAttribute("data-value");S[o.key]=a,e<4?(_++,T(_)):(Je(),We())})});const i=document.getElementById("back-btn");i&&i.addEventListener("click",()=>{_--,T(_)})}function Je(){const e=document.getElementById("modal-content");e.innerHTML=`
    <div class="text-center py-16">
      <div class="inline-block w-16 h-16 border-4 border-lightning-yellow border-t-transparent rounded-full animate-spin mb-6"></div>
      <h3 class="text-2xl font-bold mb-2">AI is analyzing...</h3>
      <p class="text-gray-400">Finding the perfect laptops for you</p>
    </div>
  `}async function We(){try{const e=await Z(ee(N,"products")),t=[];e.forEach(o=>{t.push({id:o.id,...o.data()})});const n=await Ye(S,t);ze(n)}catch(e){console.error("Error getting recommendations:",e),Xe(e.message)}}function ze(e){const t=document.getElementById("modal-content");t.innerHTML=`
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-lightning-yellow/10 backdrop-blur-xl rounded-2xl mb-4 border border-lightning-yellow/20">
        <svg class="w-8 h-8 text-lightning-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h3 class="text-3xl font-bold mb-2">AI Recommendations</h3>
      <p class="text-gray-400">We found ${e.length} perfect match${e.length>1?"es":""} for you</p>
    </div>

    <div class="space-y-6">
      ${e.map((n,o)=>`
        <div class="relative group">
          <!-- Subtle glow effect -->
          <div class="absolute -inset-0.5 bg-gradient-to-r from-lightning-yellow/20 to-lightning-yellow/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          
          <!-- Main card -->
          <div class="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300">
            <div class="flex flex-col md:flex-row gap-6">
              
              <!-- Image -->
              <div class="w-full md:w-56 flex-shrink-0">
                <div class="relative aspect-square rounded-xl overflow-hidden bg-gray-800/50 border border-gray-700/50">
                  <img src="${n.imageUrl}" alt="${n.name}" class="w-full h-full object-cover">
                  <!-- Match badge -->
                  <div class="absolute top-3 right-3">
                    <div class="bg-black/80 backdrop-blur-md border border-lightning-yellow/30 text-lightning-yellow text-xs font-bold px-3 py-1.5 rounded-full">
                      #${o+1} Match
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Content -->
              <div class="flex-1 flex flex-col">
                <div class="mb-4">
                  <h4 class="text-2xl font-bold mb-2 text-white">${n.name}</h4>
                  <div class="flex flex-wrap gap-2 text-sm text-gray-400">
                    <span class="inline-flex items-center gap-1.5 bg-gray-800/50 px-3 py-1 rounded-lg">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                      ${n.brand}
                    </span>
                    <span class="inline-flex items-center gap-1.5 bg-gray-800/50 px-3 py-1 rounded-lg">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>
                      </svg>
                      ${n.ram}
                    </span>
                    <span class="inline-flex items-center gap-1.5 bg-gray-800/50 px-3 py-1 rounded-lg">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
                      </svg>
                      ${n.ssd}
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
                      <p class="text-sm text-gray-300 leading-relaxed">${n.reason}</p>
                    </div>
                  </div>
                </div>

                <!-- Price & Action -->
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-800/50">
                  <div>
                    <p class="text-xs text-gray-500 mb-1">Best Price</p>
                    <p class="text-3xl font-bold text-lightning-yellow">₹${n.price.toLocaleString()}</p>
                  </div>
                  <a href="https://wa.me/918110960489?text=${encodeURIComponent(n.whatsappMsg)}" target="_blank" class="btn-primary inline-flex items-center gap-2 px-6 py-3">
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
      `).join("")}
    </div>

    <button onclick="document.getElementById('ai-modal').remove()" class="btn-outline w-full mt-8 py-4">
      Close & Browse More
    </button>
  `}function Xe(e){const t=document.getElementById("modal-content");t.innerHTML=`
    <div class="text-center py-16">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </div>
      <h3 class="text-2xl font-bold mb-2 text-red-500">Oops! Something went wrong</h3>
      <p class="text-gray-400 mb-6">${e}</p>
      <button onclick="document.getElementById('ai-modal').remove()" class="btn-outline">
        Close
      </button>
    </div>
  `}const C=document.getElementById("best-sellers-grid");async function Qe(){if(C)try{const e=new Date;e.setDate(e.getDate()-30);const t=re.fromDate(e),n=ae(ee(N,"products"),le("createdAt",">=",t),ce("createdAt","desc"),de(4)),o=await Z(n);if(C.innerHTML="",o.empty){C.innerHTML='<div class="col-span-full text-center text-gray-500">No recent products found.</div>';return}o.forEach(s=>{const i=s.data(),r=s.id,a=document.createElement("div");a.className="card-premium group cursor-pointer",a.innerHTML=`
        <div class="relative h-56 overflow-hidden bg-gray-800">
          <img src="${i.imageUrl}" alt="${i.name}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
          <div class="absolute top-3 right-3">
            <span class="bg-lightning-yellow text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">${i.condition}</span>
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div class="p-5">
          <h3 class="font-bold text-lg mb-2 truncate group-hover:text-lightning-yellow transition-colors">${i.name}</h3>
          <p class="text-gray-400 text-sm mb-4">${i.brand} | ${i.ram} | ${i.ssd}</p>
          <div class="flex justify-between items-center">
            <div>
              <div class="text-lightning-yellow font-bold text-2xl">₹${i.price.toLocaleString()}</div>
              <div class="text-xs text-gray-500 mt-1">Inclusive of taxes</div>
            </div>
            <a href="./product.html?id=${r}" class="btn-outline text-xs py-2 px-4 scale-90 hover:scale-100">
              View
            </a>
          </div>
        </div>
      `,C.appendChild(a)})}catch(e){console.error("Error loading best sellers:",e),C.innerHTML='<div class="col-span-full text-center text-red-500">Error loading products.</div>'}}let v=null;async function Ze(){const e=document.getElementById("hero-video-container");if(!e)return;const t="";try{const n=ue(N,"settings","website"),o=await fe(n);let s=t;if(o.exists()&&o.data().heroVideoId&&(s=o.data().heroVideoId),s){if(e.innerHTML='<div id="hero-youtube-player" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>',!window.YT){const i=document.createElement("script");i.src="https://www.youtube.com/iframe_api";const r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(i,r)}window.onYouTubeIframeAPIReady=function(){v=new YT.Player("hero-youtube-player",{videoId:s,playerVars:{autoplay:1,mute:1,controls:0,showinfo:0,rel:0,modestbranding:1,playsinline:1,loop:1,playlist:s},events:{onReady:X,onStateChange:Q}})},window.YT&&window.YT.Player&&(v=new YT.Player("hero-youtube-player",{videoId:s,playerVars:{autoplay:1,mute:1,controls:0,showinfo:0,rel:0,modestbranding:1,playsinline:1,loop:1,playlist:s},events:{onReady:X,onStateChange:Q}}))}else e.innerHTML=""}catch(n){console.error("Error loading hero video:",n)}}function X(e){e.target.playVideo(),et()}function et(){!v||!v.getDuration||setInterval(()=>{try{const e=v.getCurrentTime(),n=v.getDuration()-e;n<=10&&n>9&&(console.log("Video ending soon, restarting..."),v.seekTo(0),v.playVideo())}catch{}},1e3)}function Q(e){e.data===YT.PlayerState.ENDED&&(e.target.seekTo(0),e.target.playVideo())}Qe();Ze();Ve();
