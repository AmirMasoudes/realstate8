/**
 * Custom Hook for Contact Form
 * Manages form state and submission
 */

import { useAtom } from "jotai";
import {
  contactFormDataAtom,
  contactFormErrorsAtom,
  contactSubmittingAtom,
  contactSuccessAtom,
  contactErrorAtom,
  type ContactFormData,
} from "../atom/atom";
import { submitContactForm } from "../api/page.api";
import { useError } from "../../../services/err/useError";
import { showSuccessToast } from "../../../services/utils/toastManager";

export function useContactForm() {
  const [formData, setFormData] = useAtom(contactFormDataAtom);
  const [formErrors, setFormErrors] = useAtom(contactFormErrorsAtom);
  const [submitting, setSubmitting] = useAtom(contactSubmittingAtom);
  const [success, setSuccess] = useAtom(contactSuccessAtom);
  const [error, setError] = useAtom(contactErrorAtom);
  const { handleError, clearError } = useError();

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "نام الزامی است";
    }

    if (!formData.email.trim()) {
      errors.email = "ایمیل الزامی است";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "ایمیل معتبر نیست";
    }

    if (!formData.subject.trim()) {
      errors.subject = "موضوع الزامی است";
    }

    if (!formData.message.trim()) {
      errors.message = "پیام الزامی است";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submit = async (): Promise<boolean> => {
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      return false;
    }

    setSubmitting(true);
    try {
      await submitContactForm(formData);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setFormErrors({});
      showSuccessToast("پیام شما با موفقیت ارسال شد");
      return true;
    } catch (err: any) {
      setError(err);
      handleError(err, { showToast: true });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setFormErrors({});
    setError(null);
    setSuccess(false);
    clearError();
  };

  return {
    formData,
    formErrors,
    submitting,
    success,
    error,
    updateField,
    validateForm,
    submit,
    reset,
    clearError,
  };
}

