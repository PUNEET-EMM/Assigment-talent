import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSkillFilter, fetchTalents } from "../store/talentsSlice.js";

const SkillFilter = () => {
  const dispatch = useDispatch();
  const { currentSkill, loadingList } = useSelector(state => state.talents); // 🔹 use loadingList
  const [input, setInput] = useState(currentSkill);
  const [isActive, setIsActive] = useState(!!currentSkill); // 🔹 for visual effect

  const handleApply = () => {
    const trimmed = input.trim();
    dispatch(setSkillFilter(trimmed));
    dispatch(fetchTalents(trimmed)); 
    setIsActive(!!trimmed);          
  };

  const handleClear = () => {
    setInput("");
    dispatch(setSkillFilter(""));
    dispatch(fetchTalents());
    setIsActive(false);
  };

  return (
    <div className="space-y-3">
      <label className="block text-lg font-semibold text-gray-700 flex items-center gap-2">
        <span className="text-indigo-500">🔍</span>
        Filter by Skill
      </label>
      <div className="flex gap-3 flex-wrap">
        <input
          type="text"
          value={input}
          placeholder="e.g. React, Node.js, Python"
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleApply()}
          className="flex-1 min-w-[200px] px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
        />
        <button
          onClick={handleApply}
          disabled={loadingList}
          className={`px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow-md
            ${isActive
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-indigo-500 hover:bg-indigo-600 text-white"}
            ${loadingList ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {loadingList ? "Filtering..." : isActive ? "Filtered" : "Apply"}
        </button>
        <button
          onClick={handleClear}
          type="button"
          disabled={loadingList || !isActive}
          className={`px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors
            ${(!isActive || loadingList) ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SkillFilter;
