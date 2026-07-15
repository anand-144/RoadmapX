import { motion } from "framer-motion";
import { useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

import BuilderHeader from "../components/builder/BuilderHeader";
import BuilderSidebar from "../components/builder/BuilderSidebar";
import BasicInfoForm from "../components/builder/BasicInfoForm";
import LivePreview from "../components/builder/LivePreview";
import PublishBar from "../components/builder/PublishBar";
import TopicList from "../components/builder/TopicList";
import TagsInput from "../components/builder/TagsInput";

const Builder = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Beginner",
    estimatedTime: "",
    icon: "",
    tags: [],
    topics: [],
    status: "Draft",
  });

  const createRoadmap = async (status) => {
    try {
      setLoading(true);

      // ==========================
      // Validation
      // ==========================

      if (!formData.title.trim()) {
        return toast.error("Title is required.");
      }

      if (!formData.description.trim()) {
        return toast.error("Description is required.");
      }

      if (!formData.category) {
        return toast.error("Please select a category.");
      }

      if (
        status === "Published" &&
        formData.topics.length === 0
      ) {
        return toast.error(
          "Add at least one topic before publishing."
        );
      }

      for (const topic of formData.topics) {
        if (!topic.title.trim()) {
          return toast.error("Every topic needs a title.");
        }

        for (const resource of topic.resources) {
          if (!resource.title.trim()) {
            return toast.error(
              `Every resource in "${topic.title}" needs a title.`
            );
          }

          if (!resource.url.trim()) {
            return toast.error(
              `Every resource in "${topic.title}" needs a URL.`
            );
          }
        }
      }

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let res;

      // ==========================
      // Edit Mode
      // ==========================

      if (isEditMode) {
        res = await axios.put(
          `${import.meta.env.VITE_API_URL}/roadmaps/${id}`,
          {
            ...formData,
            status,
          },
          config
        );

        toast.success("Roadmap updated successfully!");

        navigate("/dashboard");
      }

      // ==========================
      // Create Mode
      // ==========================

      else {
        res = await axios.post(
          `${import.meta.env.VITE_API_URL}/roadmaps`,
          {
            ...formData,
            status,
          },
          config
        );

        toast.success(res.data.message);

        setFormData({
          title: "",
          description: "",
          category: "",
          difficulty: "Beginner",
          estimatedTime: "",
          icon: "",
          tags: [],
          topics: [],
          status: "Draft",
        });

        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    createRoadmap("Draft");
  };

  const handlePublish = () => {
    createRoadmap("Published");
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories`
      );
      setCategories(res.data.categories)
      console.log(res.data.categories)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchRoadmap = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/roadmaps/id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const roadmap = res.data.roadmap;

      setFormData({
        title: roadmap.title || "",
        description: roadmap.description || "",
        category: roadmap.category?._id || "",
        difficulty: roadmap.difficulty || "Beginner",
        estimatedTime: roadmap.estimatedTime || "",
        icon: roadmap.icon || "",
        tags: roadmap.tags || [],
        topics: roadmap.topics.map((topic) => ({
          id: topic._id,
          title: topic.title,
          description: topic.description,
          order: topic.order,
          resources: topic.resources.map((resource) => ({
            id: resource._id,
            title: resource.title,
            type: resource.type,
            url: resource.url,
          })),
        })),
        status: roadmap.status,
      });

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      fetchRoadmap();
    }
  }, [id])

  return (
    <div className="min-h-screen bg-black pt-28 text-white">
      <div className="mx-auto max-w-[1700px] px-6">

        <BuilderHeader
          isEditMode={isEditMode}
        />

        <div className="mt-10 grid gap-8 xl:grid-cols-12">

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="xl:col-span-3"
          >
            <BuilderSidebar
              formData={formData}
            />
          </motion.div>

          {/* Editor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 xl:col-span-6"
          >
            <BasicInfoForm
              formData={formData}
              setFormData={setFormData}
              categories={categories}
            />

            {/* Upcoming Components */}

            <TagsInput
              formData={formData}
              setFormData={setFormData}
            />

            <TopicList
              topics={formData.topics}
              setFormData={setFormData}
            />

            <PublishBar
              formData={formData}
              setFormData={setFormData}
              onSaveDraft={handleSaveDraft}
              onPublish={handlePublish}
              loading={loading}
            />

          </motion.div>

          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="xl:col-span-3"
          >
            <div className="sticky top-28">
              <LivePreview
                formData={formData}
              />
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default Builder;