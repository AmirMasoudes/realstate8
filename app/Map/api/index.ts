/**
 * Properties API - Barrel Export
 * Import all property-related API functions from here
 */

export { getProperties, type GetPropertiesParams, type PropertiesResponse } from "./getProperties";
export { getPropertyById } from "./getPropertyById";
export { createProperty, type CreatePropertyData } from "./createProperty";
export { updateProperty, type UpdatePropertyData } from "./updateProperty";
export { patchProperty, type PatchPropertyData } from "./patchProperty";
export { deleteProperty, type DeletePropertyResponse } from "./deleteProperty";
export { getFeaturedProperties, type GetFeaturedPropertiesParams, type FeaturedPropertiesResponse } from "./getFeaturedProperties";
export { searchProperties, type SearchPropertiesParams, type SearchPropertiesResponse } from "./searchProperties";

