/**
 * Categories Page API
 * All API calls for Categories should be defined here
 * Re-exports from individual API files
 */

export { 
  getCategories, 
  type GetCategoriesParams, 
  type CategoriesResponse 
} from "./getCategories";
export { getCategoryById } from "./getCategoryById";

