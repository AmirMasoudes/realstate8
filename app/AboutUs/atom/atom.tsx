/**
 * About Us Page Atoms
 * State management for About Us page using Jotai
 */

import { atom } from "jotai";
import { XHRError } from "../../../services/api/xhr";

export interface AboutUsData {
  title: string;
  description: string;
  mission?: string;
  vision?: string;
  values?: string[];
  team?: Array<{
    name: string;
    role: string;
    image?: string;
  }>;
  [key: string]: any;
}

// About Us data
export const aboutUsAtom = atom<AboutUsData | null>(null);
export const aboutUsLoadingAtom = atom<boolean>(false);
export const aboutUsErrorAtom = atom<XHRError | null>(null);

// Derived atoms
export const aboutUsHasDataAtom = atom((get) => {
  const data = get(aboutUsAtom);
  return data !== null;
});

export const aboutUsTeamCountAtom = atom((get) => {
  const data = get(aboutUsAtom);
  return data?.team?.length || 0;
});

