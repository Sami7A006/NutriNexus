import { Ingredient } from '../types/ingredient';

// Sample ingredient database
const ingredientDatabase: { [key: string]: Partial<Ingredient> } = {
  'water': {
    function: 'Solvent',
    ewgScore: 1,
    safetyLevel: 'Low Concern',
    reasonForConcern: '',
    commonUse: 'Base ingredient in most products'
  },
  'sodium lauryl sulfate': {
    function: 'Surfactant, Cleansing Agent',
    ewgScore: 3,
    safetyLevel: 'Moderate Concern',
    reasonForConcern: 'Potential skin irritation, environmental concerns',
    commonUse: 'Foaming agent in cleansers, shampoos'
  },
  'parabens': {
    function: 'Preservative',
    ewgScore: 8,
    safetyLevel: 'High Concern',
    reasonForConcern: 'Hormone disruption, potential link to breast cancer',
    commonUse: 'Preservative in cosmetics and personal care products'
  },
  'fragrance': {
    function: 'Fragrance',
    ewgScore: 8,
    safetyLevel: 'High Concern',
    reasonForConcern: 'Allergies, hormone disruption, undisclosed ingredients',
    commonUse: 'Scent in personal care products'
  },
  'glycerin': {
    function: 'Humectant',
    ewgScore: 2,
    safetyLevel: 'Low Concern',
    reasonForConcern: '',
    commonUse: 'Moisturizing agent in skin care'
  },
  'tocopherol': {
    function: 'Antioxidant',
    ewgScore: 1,
    safetyLevel: 'Low Concern',
    reasonForConcern: '',
    commonUse: 'Vitamin E, preserves product freshness'
  },
  'sodium benzoate': {
    function: 'Preservative',
    ewgScore: 3,
    safetyLevel: 'Moderate Concern',
    reasonForConcern: 'Potential skin irritant, forms benzene with vitamin C',
    commonUse: 'Preservative in food and cosmetics'
  },
  'phenoxyethanol': {
    function: 'Preservative',
    ewgScore: 4,
    safetyLevel: 'Moderate Concern',
    reasonForConcern: 'Potential skin and lung irritant',
    commonUse: 'Common preservative in cosmetics'
  },
  'retinyl palmitate': {
    function: 'Anti-aging',
    ewgScore: 9,
    safetyLevel: 'High Concern',
    reasonForConcern: 'Photosensitivity, potential reproductive toxicity',
    commonUse: 'Form of Vitamin A used in anti-aging products'
  },
  'titanium dioxide': {
    function: 'UV filter, Colorant',
    ewgScore: 6,
    safetyLevel: 'Moderate Concern',
    reasonForConcern: 'Potential respiratory concern when in powder form',
    commonUse: 'Sunscreen ingredient, colorant in makeup'
  }
};

// Default unknown ingredient
const unknownIngredient: Partial<Ingredient> = {
  function: 'Unknown',
  ewgScore: 5,
  safetyLevel: 'Moderate Concern',
  reasonForConcern: 'Limited safety data available',
  commonUse: 'Various applications'
};

export const analyzeIngredients = (ingredientList: string): Ingredient[] => {
  // Split the ingredient list by commas, semi-colons, or new lines
  const ingredientsArray = ingredientList.split(/[,;\n]+/).map(item => item.trim().toLowerCase());
  
  // Filter out empty strings
  const filteredIngredients = ingredientsArray.filter(item => item !== '');
  
  // Map each ingredient to its details
  return filteredIngredients.map(name => {
    // Try to find the ingredient in our database (case insensitive)
    const matchedIngredient = Object.keys(ingredientDatabase).find(
      key => name.includes(key) || key.includes(name)
    );
    
    const details = matchedIngredient 
      ? ingredientDatabase[matchedIngredient] 
      : unknownIngredient;
    
    return {
      name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
      ...details
    } as Ingredient;
  });
};