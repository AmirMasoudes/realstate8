/**
 * Home Page Atoms
 * State management for Home page using Jotai
 * Extends base atoms from services/atoms/propertiesAtom
 */

import { atom } from "jotai";
import { 
  propertiesListAtom, 
  propertiesLoadingAtom, 
  propertiesErrorAtom 
} from "../../../services/atoms/propertiesAtom";
import { Property } from "../../../services/base/atoms";

// Re-export base atoms for convenience
export {
  propertiesListAtom,
  propertiesLoadingAtom,
  propertiesErrorAtom,
};

// Home-specific derived atoms
export const homePropertiesCountAtom = atom((get) => {
  const properties = get(propertiesListAtom);
  return properties.length;
});

export const homeHasPropertiesAtom = atom((get) => {
  const properties = get(propertiesListAtom);
  return properties.length > 0;
});

// Featured properties (can be extended later)
export const featuredPropertiesAtom = atom<Property[]>([]);
export const featuredPropertiesLoadingAtom = atom<boolean>(false);
export const featuredPropertiesErrorAtom = atom<any>(null);

