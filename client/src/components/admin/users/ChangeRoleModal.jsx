import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import {
  Shield,
  User,
  X,
} from "lucide-react";

const ChangeRoleModal = ({
  open,
  setOpen,
  user,
  refresh,
}) => {
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const newRole =
    user.role === "admin"
      ? "user"
      : "admin";

  const handleChangeRole = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/users/${user._id}/role`,
        {
          role: newRole,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      refresh?.();

      setOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update role."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
        >
          <motion.div
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
            }}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111] p-8"
          >
            {/* Header */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10">

                  {newRole === "admin" ? (
                    <Shield
                      size={28}
                      className="text-yellow-400"
                    />
                  ) : (
                    <User
                      size={28}
                      className="text-blue-400"
                    />
                  )}

                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    Change Role
                  </h2>

                  <p className="text-sm text-gray-400">
                    Confirm role update.
                  </p>

                </div>

              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 hover:bg-white/10"
              >
                <X size={20} />
              </button>

            </div>

            {/* Body */}

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">

              <p className="text-gray-400">
                You are about to change the role of
              </p>

              <h3 className="mt-2 text-xl font-bold">
                {user.name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                @{user.username}
              </p>

              <div className="mt-6 flex items-center justify-center gap-4">

                <span className="rounded-xl bg-white/10 px-4 py-2">
                  {user.role}
                </span>

                <span className="text-yellow-400 text-xl">
                  →
                </span>

                <span className="rounded-xl bg-yellow-400 px-4 py-2 font-semibold text-black">
                  {newRole}
                </span>

              </div>

            </div>

            {/* Actions */}

            <div className="mt-8 flex gap-4">

              <button
                onClick={() => setOpen(false)}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-3 transition hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={handleChangeRole}
                className="flex-1 rounded-2xl bg-yellow-400 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-50"
              >
                {loading
                  ? "Updating..."
                  : "Change Role"}
              </button>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChangeRoleModal;