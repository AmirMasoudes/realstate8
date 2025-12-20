/**
 * Custom Hook for Updating User
 * Manages updating user profile
 */

import { useState } from "react";
import { useAtom } from "jotai";
import {
  currentUserAtom,
  selectedUserAtom,
  usersListAtom,
  usersErrorAtom,
} from "../atom/atom";
import { updateUser, UpdateUserData } from "../api/updateUser";
import { User } from "../atom/atom";
import { useError } from "../../../services/err/useError";
import { showSuccessToast } from "../../../services/utils/toastManager";

export function useUpdateUser() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);
  const [users, setUsers] = useAtom(usersListAtom);
  const [error, setError] = useAtom(usersErrorAtom);
  const [updating, setUpdating] = useState(false);
  const { handleError, clearError } = useError();

  const update = async (userId: number, userData: UpdateUserData): Promise<User | null> => {
    setUpdating(true);
    setError(null);

    try {
      const updatedUser = await updateUser(userId, userData);
      
      // Update current user if it's the same user
      if (currentUser && currentUser.id === userId) {
        setCurrentUser(updatedUser);
      }
      
      // Update selected user if it's the same user
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser(updatedUser);
      }
      
      // Update users list
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? updatedUser : user))
      );
      
      showSuccessToast("اطلاعات کاربر با موفقیت به‌روزرسانی شد");
      return updatedUser;
    } catch (err: any) {
      setError(err);
      handleError(err, { showToast: true });
      return null;
    } finally {
      setUpdating(false);
    }
  };

  return {
    update,
    updating,
    error,
    clearError,
  };
}

