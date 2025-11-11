// Home.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TalentForm from "./components/TalentForm.jsx";
import SkillFilter from "./components/SkillFilter.jsx";
import TalentList from "./components/TalentList.jsx";
import { fetchTalents } from "../store/talentsSlice.js";

const Home = () => {
  const dispatch = useDispatch();
  const { currentSkill } = useSelector(state => state.talents);

  useEffect(() => {
    dispatch(fetchTalents(currentSkill || undefined));
  }, [dispatch, currentSkill]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Talent Management</h1>
          <p className="text-gray-600">Manage and filter your talent pool</p>
        </div>

        <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-blue-500">✨</span>
            Add New Talent
          </h2>
          <TalentForm />
        </section>

        <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <SkillFilter />
        </section>

=        <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-purple-500">👥</span>
            Talent Directory
          </h2>
          <TalentList />
        </section>
      </div>
    </div>
  );
};

export default Home;