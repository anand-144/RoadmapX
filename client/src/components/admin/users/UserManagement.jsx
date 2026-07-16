import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import UserStats from "./UserStats";
import UserFilters from "./UserFilters";
import UserCard from "./UserCard";
import UserSkeleton from "./UserSkeleton";
import EmptyUsers from "./EmptyUsers";
import DeleteUserModal from "./DeleteUserModal";
import Pagination from "./Pagination";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalUsers: 0,
  });

  const [stats, setStats] = useState({
    totalUsers: 0,
    admins: 0,
    users: 0,
    newUsers: 0,
  });

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");

  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/users?page=${page}&limit=10&search=${search}&role=${role}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(data.users);

      if (data.pagination) {
        setPagination(data.pagination);
      }


      if (data.stats) {
        setStats(data.stats);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search, role]);

  useEffect(() => {
    fetchUsers();
  }, [page, search, role]);


  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h2 className="text-4xl font-bold">
            User Management
          </h2>

          <p className="mt-2 text-gray-400">
            Manage every user registered on the platform.
          </p>
        </div>

        <div className="rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-black">
          {pagination.totalUsers || users.length} Users
        </div>

      </div>

      {/* Stats */}

      <UserStats users={users} />

      {/* Search */}

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-2xl border border-white/10 bg-[#111] py-4 pl-12 pr-5 outline-none transition focus:border-yellow-400"
        />

      </div>

      {/* Filters */}

      <UserFilters
        role={role}
        setRole={setRole}
      />

      {/* Content */}

      {loading ? (
        <UserSkeleton />
      ) : users.length === 0 ? (
        <EmptyUsers />
      ) : (
        <motion.div
          layout
          className="grid gap-6"
        >
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              refresh={fetchUsers}
              onDelete={() => {
                setSelectedUser(user);
                setDeleteModal(true);
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Delete Modal */}

      <DeleteUserModal
        open={deleteModal}
        setOpen={setDeleteModal}
        user={selectedUser}
        refresh={fetchUsers}
      />

      <Pagination
        page={page}
        totalPages={pagination.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default UserManagement;