import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_API_KEY);

/**
 * Get AI-powered laptop recommendations based on user preferences
 * @param {Object} userAnswers - User's preferences
 * @param {Array} products - Available products from Firestore
 * @returns {Promise<Array>} - Recommended products with reasons
 */
export async function getAIRecommendations(userAnswers, products) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a laptop recommendation expert for Joshua Computers, a trusted laptop retailer.

USER REQUIREMENTS:
- Budget: ₹${userAnswers.budget}
- Primary Usage: ${userAnswers.usage}
- Preferred Brand: ${userAnswers.brand || 'No preference'}
- Screen Size: ${userAnswers.screen || 'Any'}

AVAILABLE PRODUCTS (JSON):
${JSON.stringify(products, null, 2)}

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
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean response - remove markdown code blocks if present
    const cleanedText = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    const recommendations = JSON.parse(cleanedText);
    
    // Validate and enrich recommendations with product details
    return recommendations.map(rec => {
      const product = products.find(p => p.id === rec.productId);
      return {
        ...rec,
        imageUrl: product?.imageUrl,
        brand: product?.brand,
        processor: product?.processor,
        ram: product?.ram,
        ssd: product?.ssd,
        condition: product?.condition,
        whatsappMsg: product?.whatsappMsg || `Hi, I want to know more about ${rec.name}`
      };
    });

  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw new Error("Failed to get AI recommendations. Please try again.");
  }
}

/**
 * Get usage-based suggestions
 */
export function getUsageSuggestions(usage) {
  const suggestions = {
    "Office Work": "Reliable performance for documents, emails, and web browsing",
    "Student": "Balanced specs for studying, assignments, and light entertainment",
    "Programming": "Good RAM and processor for coding and development tools",
    "Gaming": "High-end processor and graphics for smooth gaming experience",
    "Video Editing": "Powerful specs for rendering and editing work",
    "Business": "Professional-grade reliability and performance"
  };
  
  return suggestions[usage] || "General purpose computing";
}
