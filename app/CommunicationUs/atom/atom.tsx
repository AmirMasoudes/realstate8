/**
 * Communication Us Page Atoms
 * State management for Contact/Communication page using Jotai
 */

import { atom } from "jotai";
import { XHRError } from "../../../services/api/xhr";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Form state
export const contactFormDataAtom = atom<ContactFormData>({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

export const contactFormErrorsAtom = atom<Record<string, string>>({});
export const contactSubmittingAtom = atom<boolean>(false);
export const contactSuccessAtom = atom<boolean>(false);
export const contactErrorAtom = atom<XHRError | null>(null);

// Derived atoms
export const contactFormIsValidAtom = atom((get) => {
  const formData = get(contactFormDataAtom);
  const errors = get(contactFormErrorsAtom);
  
  return (
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.subject.trim() !== "" &&
    formData.message.trim() !== "" &&
    Object.keys(errors).length === 0
  );
});

export const contactFormHasErrorsAtom = atom((get) => {
  const errors = get(contactFormErrorsAtom);
  return Object.keys(errors).length > 0;
});

