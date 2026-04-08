import pandas as pd
import requests
import json

# ── Step 1: Classify foods using LLM ─────────────────────────────────────────
def classify_foods_with_llm(food_database):
    # Build a list of all food names to classify
    food_names = list(food_database.keys())
    food_list_text = "\n".join(food_names)

    prompt = f"""You are a food classification expert. For each food item listed below, 
classify it into ONE of these categories:
- vegan (no animal products at all)
- vegetarian (no meat/fish but may have dairy/eggs)
- non-vegetarian (contains meat, poultry, or fish)

Return ONLY a valid JSON object like this, no extra text:
{{
  "chicken breast": "non-vegetarian",
  "apple": "vegan",
  "greek yogurt": "vegetarian"
}}

Foods to classify:
{food_list_text}"""

    response = requests.post(
        'http://127.0.0.1:1234/v1/chat/completions',
        headers={'Content-Type': 'application/json'},
        json={
            'model': 'phi-4-mini-reasoning',
            'messages': [{'role': 'user', 'content': prompt}],
            'temperature': 0.1,  # low temp for consistent classification
            'max_tokens': 2000
        }
    )

    if response.status_code == 200:
        raw = response.json()['choices'][0]['message']['content']
        # Strip any markdown code fences if LLM adds them
        raw = raw.replace('```json', '').replace('```', '').strip()
        classifications = json.loads(raw)
        return {k.lower(): v.lower() for k, v in classifications.items()}
    else:
        raise ConnectionError(f"LLM classification error: {response.status_code}")

# ── Step 2: Tag each food in database with its classification ─────────────────
def enrich_database_with_classifications(food_database):
    print("Classifying foods with AI... (this runs once)")
    classifications = classify_foods_with_llm(food_database)
    
    for name in food_database:
        food_database[name]['diet_type'] = classifications.get(name.lower(), 'unknown')
    
    return food_database

# ── Step 3: Filter using AI classifications instead of keywords ───────────────
def is_food_compatible(food, dietary_restrictions):
    restrictions = [r.lower() for r in dietary_restrictions]
    diet_type = food.get('diet_type', 'unknown')

    if 'vegan' in restrictions and diet_type != 'vegan':
        return False
    if 'vegetarian' in restrictions and diet_type not in ('vegan', 'vegetarian'):
        return False
    if 'lactose-free' in restrictions and diet_type != 'lactose-free':
        return False
    if 'gluten-free' in restrictions and diet_type != 'gluten-free':
        return False
  
    return True

# ── Step 4: Cache classifications to avoid re-running every time ──────────────
def load_food_database(csv_path='data/food_database.csv', cache_path='data/food_classified.csv'):
    import os

    # If classified CSV already exists, just use that
    if os.path.exists(cache_path):
        print("Loading pre-classified food database...")
        df = pd.read_csv(cache_path)
    else:
        print("No cache found, classifying foods for the first time...")
        df = pd.read_csv(csv_path)
        food_database = {
            row['name'].lower(): {
                'name':     row['name'],
                'calories': row['calories'],
                'protein':  row['protein'],
                'carbs':    row['carbs'],
                'fat':      row['fat'],
                'sugar':    row.get('sugar', 0)
            }
            for _, row in df.iterrows()
        }
        food_database = enrich_database_with_classifications(food_database)
        
        # Save classified results to cache CSV so it doesn't re-run next time
        rows = list(food_database.values())
        pd.DataFrame(rows).to_csv(cache_path, index=False)
        print(f"Saved classified database to {cache_path}")
        return food_database

    # Load from cached CSV
    food_database = {}
    for _, row in df.iterrows():
        food_database[row['name'].lower()] = {
            'name':      row['name'],
            'calories':  row['calories'],
            'protein':   row['protein'],
            'carbs':     row['carbs'],
            'fat':       row['fat'],
            'sugar':     row.get('sugar', 0),
            'diet_type': row.get('diet_type', 'unknown')
        }
    return food_database