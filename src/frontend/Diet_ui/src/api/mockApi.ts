import { UserData } from '../contexts/UserContext';

export interface DietPlan {
  meals: Array<{
    name: string;
    time: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    water: number;
    ingredients: string[];
  }>;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    water: number;
  };
  shoppingList: string[];
  recommendation?: string;
  explanation?: string;
}

// Fact-checked food database with USDA nutritional data (per 100g serving)
interface FoodItem {
  name: string;
  calories: number; // per 100g
  protein: number; // grams per 100g
  carbs: number; // grams per 100g
  fat: number; // grams per 100g
  servingSize: string;
  category: string; // protein, carb, vegetable, fruit, dairy, grain, fat
  foodType: string; // general, indian, american, mediterranean, asian, etc.
  restrictions: string[]; // vegan, vegetarian, gluten-free, dairy-free, nut-free, etc.
}

const FOOD_DATABASE: FoodItem[] = [
  // Protein sources - General
  { name: 'Grilled Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: '100g', category: 'protein', foodType: 'general', restrictions: ['gluten-free', 'dairy-free', 'non-vegetarian'] },
  { name: 'Salmon', calories: 208, protein: 20, carbs: 0, fat: 13, servingSize: '100g', category: 'protein', foodType: 'general', restrictions: ['gluten-free', 'dairy-free', 'non-vegetarian'] },
  { name: 'Turkey Breast', calories: 135, protein: 29, carbs: 0, fat: 1.3, servingSize: '100g', category: 'protein', foodType: 'general', restrictions: ['gluten-free', 'dairy-free', 'non-vegetarian'] },
  
  // Protein sources - Vegetarian
  { name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 3.3, fat: 0.4, servingSize: '100g', category: 'dairy', foodType: 'general', restrictions: ['gluten-free', 'vegetarian'] },
  { name: 'Eggs', calories: 155, protein: 13, carbs: 1.1, fat: 11, servingSize: '100g', category: 'protein', foodType: 'general', restrictions: ['gluten-free', 'dairy-free', 'vegetarian'] },
  { name: 'Tofu', calories: 76, protein: 8, carbs: 1.9, fat: 4.8, servingSize: '100g', category: 'protein', foodType: 'asian', restrictions: ['vegan', 'gluten-free', 'dairy-free'] },
  { name: 'Lentils', calories: 116, protein: 9, carbs: 20, fat: 0.4, servingSize: '100g', category: 'protein', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  
  // Indian Proteins
  { name: 'Chickpeas Curry', calories: 134, protein: 8.9, carbs: 22.5, fat: 2.1, servingSize: '100g', category: 'protein', foodType: 'indian', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  { name: 'Paneer', calories: 265, protein: 25, carbs: 3.3, fat: 17, servingSize: '100g', category: 'protein', foodType: 'indian', restrictions: ['vegetarian', 'gluten-free'] },
  
  // Carb sources
  { name: 'Brown Rice', calories: 112, protein: 2.6, carbs: 23, fat: 1, servingSize: '100g', category: 'grain', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  { name: 'Quinoa', calories: 120, protein: 4.4, carbs: 21, fat: 1.9, servingSize: '100g', category: 'grain', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  { name: 'Sweet Potato', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, servingSize: '100g', category: 'carb', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  { name: 'Whole Wheat Bread', calories: 247, protein: 9, carbs: 43, fat: 2.3, servingSize: '100g', category: 'grain', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'dairy-free'] },
  { name: 'Oatmeal', calories: 389, protein: 17, carbs: 66, fat: 7, servingSize: '100g', category: 'grain', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free'] },
  { name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, servingSize: '100g', category: 'fruit', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  { name: 'Roti', calories: 165, protein: 5, carbs: 33, fat: 1, servingSize: '100g', category: 'grain', foodType: 'indian', restrictions: ['vegan', 'vegetarian', 'dairy-free'] },
  { name: 'Basmati Rice', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, servingSize: '100g', category: 'grain', foodType: 'indian', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  { name: 'White Rice', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, servingSize: '100g', category: 'grain', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  { name: 'Pasta', calories: 131, protein: 5, carbs: 25, fat: 1.1, servingSize: '100g', category: 'grain', foodType: 'american', restrictions: ['vegan', 'vegetarian', 'dairy-free'] },
  
  // Vegetables
  { name: 'Broccoli', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, servingSize: '100g', category: 'vegetable', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  { name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, servingSize: '100g', category: 'vegetable', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  { name: 'Bell Peppers', calories: 31, protein: 1, carbs: 6, fat: 0.3, servingSize: '100g', category: 'vegetable', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  { name: 'Asparagus', calories: 20, protein: 2.2, carbs: 3.7, fat: 0.1, servingSize: '100g', category: 'vegetable', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  { name: 'Carrots', calories: 41, protein: 0.9, carbs: 10, fat: 0.2, servingSize: '100g', category: 'vegetable', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  { name: 'Cauliflower', calories: 25, protein: 1.9, carbs: 5, fat: 0.3, servingSize: '100g', category: 'vegetable', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  
  // Fruits
  { name: 'Blueberries', calories: 57, protein: 0.7, carbs: 14, fat: 0.3, servingSize: '100g', category: 'fruit', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  { name: 'Apple', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, servingSize: '100g', category: 'fruit', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  { name: 'Orange', calories: 47, protein: 0.9, carbs: 12, fat: 0.1, servingSize: '100g', category: 'fruit', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  
  // Fats
  { name: 'Almonds', calories: 579, protein: 21, carbs: 22, fat: 50, servingSize: '100g', category: 'fat', foodType: 'general', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  { name: 'Olive Oil', calories: 884, protein: 0, carbs: 0, fat: 100, servingSize: '100g', category: 'fat', foodType: 'mediterranean', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
  { name: 'Coconut Oil', calories: 892, protein: 0, carbs: 0, fat: 100, servingSize: '100g', category: 'fat', foodType: 'asian', restrictions: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'] },
];

export const generateDietPlan = (userData: UserData): DietPlan => {
  // Calculate BMR using Harris-Benedict equation (weight already in kg, height already in cm)
  const weightKg = userData.weight;
  const heightCm = userData.height;
  const bmr = calculateBMR(userData, weightKg, heightCm);
  
  // Adjust calories based on activity level
  const activityMultipliers = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'very_active': 1.9
  };
  
  const dailyCalories = Math.round(bmr * (activityMultipliers[userData.activity_level as keyof typeof activityMultipliers] || 1.2));
  
  // Calculate macronutrient distribution
  const protein = Math.round((dailyCalories * 0.3) / 4); // 30% of calories from protein
  const fat = Math.round((dailyCalories * 0.25) / 9); // 25% of calories from fat
  const carbs = Math.round((dailyCalories * 0.45) / 4); // 45% of calories from carbs
  
  // Calculate daily water goal (35ml per kg of body weight)
  const dailyWater = Math.round(weightKg * 35);

  // Generate three meals with proper macro distribution
  const meals = [
    generateMeal('Breakfast', '8:00 AM', 0.3, dailyCalories, protein, carbs, fat, dailyWater, userData),
    generateMeal('Lunch', '1:00 PM', 0.4, dailyCalories, protein, carbs, fat, dailyWater, userData),
    generateMeal('Dinner', '7:00 PM', 0.3, dailyCalories, protein, carbs, fat, dailyWater, userData),
  ];

  // Generate shopping list based on ingredients
  const shoppingList = Array.from(new Set(meals.flatMap(meal => meal.ingredients)));

  // Return the diet plan with the correct structure
  return {
    meals,
    nutrition: {
      calories: dailyCalories,
      protein,
      carbs,
      fat,
      water: dailyWater
    },
    shoppingList,
    recommendation: generateRecommendation(userData),
    explanation: generateExplanation(userData, dailyCalories)
  };
};

const calculateBMR = (userData: UserData, weightKg: number, heightCm: number): number => {
  const { age, gender } = userData;
  
  if (gender.toLowerCase() === 'male') {
    return 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
  }
};

const generateMeal = (
  mealName: string,
  mealTime: string,
  caloriePercentage: number,
  dailyCalories: number,
  dailyProtein: number,
  dailyCarbs: number,
  dailyFat: number,
  dailyWater: number,
  userData: UserData
): {
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
  ingredients: string[];
} => {
  const mealCalories = Math.round(dailyCalories * caloriePercentage);
  const mealProtein = Math.round(dailyProtein * caloriePercentage);
  const mealCarbs = Math.round(dailyCarbs * caloriePercentage);
  const mealFat = Math.round(dailyFat * caloriePercentage);
  const mealWater = Math.round(dailyWater * caloriePercentage); // Distribute water proportionally

  // Filter foods based on dietary restrictions and health conditions
  const availableFoods = FOOD_DATABASE.filter(food => 
    isCompatibleWithRestrictions(food, userData)
  );

  // Select ingredients to meet macronutrient targets
  const ingredients = selectOptimalIngredients(
    mealName,
    mealProtein,
    mealCarbs,
    mealFat,
    availableFoods
  );

  return {
    name: mealName,
    time: mealTime,
    calories: mealCalories,
    protein: mealProtein,
    carbs: mealCarbs,
    fat: mealFat,
    water: mealWater,
    ingredients
  };
};

const isCompatibleWithRestrictions = (food: FoodItem, userData: UserData): boolean => {
  const restrictions = userData.dietary_restrictions || [];
  const healthConditions = userData.health_conditions || [];
  const foodType = userData.food_type || 'general';

  // Check dietary restrictions
  for (const restriction of restrictions) {
    if (restriction.toLowerCase() === 'vegan' && !food.restrictions.includes('vegan')) {
      return false;
    }
    if (restriction.toLowerCase() === 'vegetarian' && !food.restrictions.includes('vegetarian') && !food.restrictions.includes('vegan')) {
      return false;
    }
    if (restriction.toLowerCase() === 'non-vegetarian') {
      // Non-vegetarian users can eat anything
      continue;
    }
    if (restriction.toLowerCase() === 'gluten-free' && !food.restrictions.includes('gluten-free')) {
      return false;
    }
    if (restriction.toLowerCase() === 'dairy-free' && !food.restrictions.includes('dairy-free')) {
      return false;
    }
    if (restriction.toLowerCase() === 'nut-free' && food.name.toLowerCase().includes('nut')) {
      return false;
    }
    if (restriction.toLowerCase() === 'keto' && food.carbs > 5 && food.category !== 'fat') {
      return false; // Limit carbs for keto
    }
    if (restriction.toLowerCase() === 'paleo' && (food.category === 'grain' || food.name.toLowerCase().includes('bread'))) {
      return false; // No grains for paleo
    }
  }

  // Check health conditions
  for (const condition of healthConditions) {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower === 'diabetes' && food.carbs > 30 && food.category === 'carb') {
      return false; // Avoid high-carb foods for diabetics
    }
    if (conditionLower === 'high cholesterol' && food.fat > 50) {
      return false; // Limit high-fat foods
    }
    if (conditionLower === 'hypertension' && food.name.toLowerCase().includes('salt')) {
      return false; // Avoid high-sodium foods
    }
    if (conditionLower === 'kidney disease' && food.protein > 25) {
      return false; // Limit protein for kidney disease
    }
    if (conditionLower === 'thyroid (hypothyroidism)') {
      // No specific exclusions, but system will include varied foods
      continue;
    }
    if (conditionLower === 'anemia') {
      // No specific exclusions, lentils and spinach are good sources
      continue;
    }
    if (conditionLower === 'gout' && food.category === 'protein' && (food.name.toLowerCase().includes('red') || food.name.toLowerCase().includes('meat'))) {
      return false; // Avoid red meats (high purine)
    }
    if (conditionLower === 'osteoporosis') {
      // No specific exclusions, system will include dairy
      continue;
    }
    if (conditionLower === 'pcos' && food.carbs > 35 && food.category === 'carb') {
      return false; // Low carb/low glycemic index for PCOS
    }
    if (conditionLower === 'gerd' || conditionLower === 'acid reflux') {
      // Avoid spicy foods (not reliably marked in database, so minimal check)
      continue;
    }
    if (conditionLower === 'ibs') {
      // No specific exclusions, system will include soluble fiber foods
      continue;
    }
    if (conditionLower === 'none') {
      // No health conditions to check
      continue;
    }
  }

  // Check food type preference (can mix but prefer selected type)
  if (foodType !== 'anything goes' && foodType !== 'general') {
    // Prefer the selected food type but don't exclude others
    if (food.foodType !== foodType && food.foodType !== 'general') {
      // 70% chance to use if it doesn't match preference
      return Math.random() > 0.3;
    }
  }

  return true;
};

const selectOptimalIngredients = (
  mealType: string,
  targetProtein: number,
  targetCarbs: number,
  targetFat: number,
  availableFoods: FoodItem[]
): string[] => {
  const ingredients: string[] = [];
  let remainingProtein = targetProtein;
  let remainingCarbs = targetCarbs;
  let remainingFat = targetFat;

  // Select protein source (primary ingredient)
  const proteinSources = availableFoods.filter(f => f.category === 'protein');
  if (proteinSources.length > 0) {
    const proteinSource = proteinSources[Math.floor(Math.random() * proteinSources.length)];
    const proteinServingSize = calculateServingSize(proteinSource, remainingProtein, 'protein');
    ingredients.push(proteinSource.name);
    remainingProtein = Math.max(0, remainingProtein - (proteinSource.protein * proteinServingSize / 100));
  }

  // Select carb source (secondary ingredient)
  const carbSources = availableFoods.filter(f => f.category === 'grain' || f.category === 'carb' || f.category === 'fruit');
  if (carbSources.length > 0) {
    const carbSource = carbSources[Math.floor(Math.random() * carbSources.length)];
    const carbServingSize = calculateServingSize(carbSource, remainingCarbs, 'carbs');
    ingredients.push(carbSource.name);
    remainingCarbs = Math.max(0, remainingCarbs - (carbSource.carbs * carbServingSize / 100));
  }

  // Select vegetable (always a good addition)
  const vegetables = availableFoods.filter(f => f.category === 'vegetable');
  if (vegetables.length > 0) {
    const vegetable = vegetables[Math.floor(Math.random() * vegetables.length)];
    ingredients.push(vegetable.name);
  }

  // Select fat source if still needed
  if (remainingFat > 5) {
    const fatSources = availableFoods.filter(f => f.category === 'fat');
    if (fatSources.length > 0) {
      const fatSource = fatSources[Math.floor(Math.random() * fatSources.length)];
      ingredients.push(fatSource.name);
    }
  }

  // Add optional ingredient (fruit or additional vegetable) to ensure minimum 3 ingredients
  if (ingredients.length < 3) {
    const fruits = availableFoods.filter(f => f.category === 'fruit' && !ingredients.includes(f.name));
    if (fruits.length > 0) {
      ingredients.push(fruits[Math.floor(Math.random() * fruits.length)].name);
    }
  }

  // Ensure at least 3 ingredients
  if (ingredients.length < 3) {
    const remaining = availableFoods.filter(f => !ingredients.includes(f.name));
    while (ingredients.length < 3 && remaining.length > 0) {
      const randomFood = remaining[Math.floor(Math.random() * remaining.length)];
      if (!ingredients.includes(randomFood.name)) {
        ingredients.push(randomFood.name);
      }
    }
  }

  return ingredients;
};

const calculateServingSize = (food: FoodItem, targetNutrient: number, nutrientType: 'protein' | 'carbs' | 'fat'): number => {
  const nutrientContent = food[nutrientType];
  if (nutrientContent === 0) return 0;
  const servingSize = (targetNutrient / nutrientContent) * 100;
  return Math.min(servingSize, 300); // Cap at 300g serving
};

const generateRecommendation = (userData: UserData): string => {
  const recommendations: string[] = [
    `Based on your activity level (${userData.activity_level}), focus on protein-rich foods to support muscle maintenance and recovery.`,
    `Consider spreading your meals throughout the day to maintain stable energy levels and prevent energy crashes.`,
    `Stay hydrated by drinking 8-10 glasses of water daily, especially around your workout times.`,
    `Incorporate more leafy greens and the vegetables in your diet for additional micronutrients.`,
    `Ensure you're eating whole grains for sustained energy and better digestion.`
  ];

  return recommendations[Math.floor(Math.random() * recommendations.length)];
};

const generateExplanation = (userData: UserData, calories: number): string => {
  return `This personalized diet plan is carefully designed based on your ${userData.activity_level} activity level, age (${userData.age}), and current body metrics. The total daily calorie target of ${calories} calories is distributed across three meals to help you maintain a balanced and sustainable diet. Each meal is composed of carefully selected ingredients that respect your dietary restrictions (${userData.dietary_restrictions.join(', ') || 'none'}) and health conditions (${userData.health_conditions.join(', ') || 'none'}). The meals are designed to provide the optimal mix of proteins, carbs, and healthy fats while ensuring proper nutrition.`;
}; 