import pandas as pd
import glob
files =glob.glob('*.csv')
dfs=[]
current_id=1
for file in files:
    df=pd.read_csv(file)
    print(df.columns.tolist())
    df = df[['ID', 'food', 'Caloric Value', 'Protein', 'Carbohydrates', 'Fat', 'Sugars']]
    df.insert(0,'id',range(current_id,current_id+ len(df)))
    current_id += len(df)
    dfs.append(df)
    df.to_csv('food_database_clean.csv', index=False)
    print("Done! Saved to food_database_clean.csv")
combined=pd.concat(dfs,ignore_index=True)
combined.to_csv('food_database_clean.csv',index=False)
print(f"Done! Combined {len(files)} files with {len(combined)} total rows.")
