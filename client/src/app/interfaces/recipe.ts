export interface Recipe {
  uri: string;
  label: string;
  image: string;
  images: Images;
  source: string;
  url: string;
  shareAs: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: any[];
  ingredientLines: string[];
  ingredients: Ingredient[];
  calories: number;
  totalWeight: number;
  totalTime: number;
  cuisineType: string[];
  mealType: string[];
  dishType: string[];
  totalNutrients: { [key: string]: Total };
  totalDaily: { [key: string]: Total };
  digest: Digest[];
}

export interface Digest {
  label: string;
  tag: string;
  schemaOrgTag: null | string;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: Unit;
  sub?: Digest[];
}

export enum Unit {
  Empty = '%',
  G = 'g',
  Kcal = 'kcal',
  Mg = 'mg',
  Μg = 'µg',
}

export interface Images {
  THUMBNAIL: Large;
  SMALL: Large;
  REGULAR: Large;
  LARGE: Large;
}

export interface Large {
  url: string;
  width: number;
  height: number;
}

export interface Ingredient {
  text: string;
  quantity: number;
  measure: null | string;
  food: string;
  weight: number;
  foodCategory: string;
  foodId: string;
  image: string;
}

export interface Total {
  label: string;
  quantity: number;
  unit: Unit;
}
