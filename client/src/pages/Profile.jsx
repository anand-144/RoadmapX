import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Edit3,
  Save,
  X,
  Loader2,
  BadgeInfo,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const { user } = useAuth();
  const { username } = useParams();

  const isOwnProfile =
    !username || username === user?.username;

  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
  });

  // ...

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ===============================
  // Fetch Logged In User
  // ===============================

  const fetchProfile = async () => {
    try {
      setLoading(true);

      let data;

      if (username) {
        // Someone else's profile
        const response = await axios.get(
          `${API_URL}/user/${username}`
        );

        data = response.data;
      } else {
        // Logged-in user
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        data = response.data;
      }

      setProfile(data.user);

      setFormData({
        name: data.user.name || "",
        username: data.user.username || "",
        bio: data.user.bio || "",
      });

      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]);

  // ===============================
  // Handle Input
  // ===============================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ===============================
  // Cancel Editing
  // ===============================

  const handleCancel = () => {
    setEditMode(false);

    setFormData({
      name: profile.name,
      username: profile.username,
      bio: profile.bio || "",
    });

    setSuccess("");
    setError("");
  };

  // ===============================
  // Update Profile
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `${API_URL}/user/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(data.user);

      // Update localStorage user

      const storedUser =
        JSON.parse(localStorage.getItem("user")) || {};

      const updatedUser = {
        ...storedUser,
        ...data.user,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setSuccess(data.message);

      setError("");

      setEditMode(false);
    } catch (err) {
      setSuccess("");

      setError(
        err.response?.data?.message ||
        "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // Loading Screen
  // ===============================

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  // ===============================
  // Main UI
  // ===============================

  return (

    <>
      import {Helmet} from "react-helmet-async";
      import {useParams} from "react-router-dom";

      const {username} = useParams();

      <Helmet>
        <title>
          {profile?.name
            ? `${profile.name} | RoadmapX`
            : `${username} | RoadmapX`}
        </title>

        <meta
          name="description"
          content={
            profile?.bio ||
            `View ${username}'s profile and learning roadmaps on RoadmapX.`
          }
        />
      </Helmet>
      <div className="min-w-screen bg-black px-4 pt-28 pb-10">

        <div className="overflow-hidden rounded-3xl border-4 border-gray-500 bg-white shadow-xl">

          {/* Header */}

          <div className="border-b border-white/10 bg-black p-10">

            <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between">

              <div className="flex items-center gap-5">

                <div className="flex h-24 w-30 items-center justify-center rounded-full border border-white/10 bg-white text-4xl font-bold text-black">

                  {profile.name?.charAt(0).toUpperCase()}

                </div>

                <div>

                  <h1 className="text-3xl font-bold text-white">
                    {profile.name}
                  </h1>

                  <p className="mt-1 text-yellow-400">
                    @{profile.username}
                  </p>

                </div>

              </div>

              {isOwnProfile && !editMode ? (
                <button
                  onClick={() => {
                    setEditMode(true);
                    setSuccess("");
                    setError("");
                  }}
                  className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-black transition-all hover:bg-gray-200 duration-300"
                >
                  <Edit3 size={18} />
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 rounded-xl border border-white/10 text-white px-5 py-3 transition-all duration-300 hover:bg-white/10 hover:text-white"
                >
                  <X size={18} />
                  Cancel
                </button>
              )}

            </div>

          </div>
          {/* Content */}

          <div className="grid gap-8 p-8 lg:grid-cols-3">

            {/* ===================== */}
            {/* Left Side */}
            {/* ===================== */}

            <div className="space-y-5">

              <div className="rounded-2xl border-2 border-b-4 border-slate-200 p-6">

                <h2 className="mb-6 text-lg font-bold">
                  Account Information
                </h2>

                <div className="space-y-5">

                  <div className="flex items-start gap-4">

                    <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                      <User size={18} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Full Name
                      </p>

                      <p className="font-semibold text-slate-800">
                        {profile.name}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-4">

                    <div className="rounded-lg bg-purple-100 p-3 text-purple-600">
                      <BadgeInfo size={18} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Username
                      </p>

                      <p className="font-semibold text-slate-800">
                        @{profile.username}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-4">

                    <div className="rounded-lg bg-green-100 p-3 text-green-600">
                      <Mail size={18} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Email
                      </p>

                      <p className="break-all font-semibold text-slate-800">
                        {profile.email}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-4">

                    <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
                      <Shield size={18} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Role
                      </p>

                      <span className="rounded-full bg-slate-300 px-3 py-1 text-sm font-semibold capitalize">
                        {profile.role}
                      </span>
                    </div>

                  </div>

                  <div className="flex items-start gap-4">

                    <div className="rounded-lg bg-pink-100 p-3 text-pink-600">
                      <Calendar size={18} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Joined
                      </p>

                      <p className="font-semibold text-slate-800">
                        {new Date(profile.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* ===================== */}
            {/* Right Side */}
            {/* ===================== */}

            <div className="lg:col-span-2">

              {success && (
                <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
                  {success}
                </div>
              )}

              {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                  {error}
                </div>
              )}

              <div className="rounded-2xl border-2 border-b-4 border-r-4 border-slate-200 p-8">

                <h2 className="mb-8 text-2xl font-bold">
                  {editMode ? "Edit Profile" : "Profile Details"}
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >

                  {/* Name */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={`w-full rounded-xl border px-4 py-3 outline-none transition ${editMode
                        ? "border-slate-300 focus:border-blue-500"
                        : "cursor-not-allowed border border-white/10 bg-white/5 text-white"
                        }`}
                    />

                  </div>

                  {/* Username */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Username
                    </label>

                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={`w-full rounded-xl border px-4 py-3 outline-none transition ${editMode
                        ? "border-slate-300 focus:border-blue-500"
                        : "cursor-not-allowed bg-slate-100"
                        }`}
                    />

                  </div>

                  {/* Email */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full cursor-not-allowed rounded-xl border bg-slate-100 px-4 py-3"
                    />

                  </div>

                  {/* Bio */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Bio
                    </label>

                    <textarea
                      rows={5}
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={!editMode}
                      placeholder="Tell everyone something about yourself..."
                      className={`w-full resize-none rounded-xl border px-4 py-3 outline-none transition ${editMode
                        ? "border-slate-300 focus:border-blue-500"
                        : "cursor-not-allowed bg-slate-100"
                        }`}
                    />

                  </div>
                  {/* Action Buttons */}

                  {isOwnProfile && editMode && (
                    <div className="flex flex-col gap-4 pt-2 sm:flex-row">

                      <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center justify-center border border-slate-200 gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {saving ? (
                          <>
                            <Loader2
                              size={18}
                              className="animate-spin"
                            />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={18} />
                            Save Changes
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleCancel}
                        disabled={saving}
                        className="rounded-xl border border-slate-300 px-6 py-3 font-semibold transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        Cancel
                      </button>

                    </div>
                  )}

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>

  );
};

export default Profile;