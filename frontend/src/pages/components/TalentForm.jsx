import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTalent } from "../../store/talentsSlice.js";

const TalentForm = () => {
  const dispatch = useDispatch();
  const { loadingCreate } = useSelector(state => state.talents);

  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
    experience: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    const payload = {
      name: form.name,
      email: form.email,
      skills: form.skills,
      experience: form.experience ? Number(form.experience) : 0
    };

    const resultAction = await dispatch(createTalent(payload));
    if (createTalent.fulfilled.match(resultAction)) {
      setForm({
        name: "",
        email: "",
        skills: "",
        experience: ""
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Jane Doe"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Skills (comma separated)
          </label>
          <input
            type="text"
            name="skills"
            placeholder="React, Node.js, MongoDB"
            value={form.skills}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Experience (years)
          </label>
          <input
            type="number"
            name="experience"
            min="0"
            placeholder="2"
            value={form.experience}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loadingCreate}
        className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        {loadingCreate ? "Saving..." : "Add Talent"}
      </button>
    </form>
  );
};

export default TalentForm;
