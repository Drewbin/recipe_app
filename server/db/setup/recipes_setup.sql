CREATE TABLE recipes (
    recipe_id SERIAL PRIMARY KEY,
    name TEXT, 
    calories INT,
    cautions TEXT,
    labels TEXT,
    nutrition TEXT,
    image TEXT,
    ingredients TEXT,
    instructions TEXT,
    time INT,
    link TEXT

)


/*
Nutrition = digest
ingredients = ingredientLines
Name = label
Link = url

*/