// TalentList.jsx
import React from "react";
import { useSelector } from "react-redux";

const TalentList = () => {
  const { items, loading, error, currentSkill } = useSelector(
    state => state.talents
  );

  if (loading && !items.length) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-indigo-500"></div>
          <p className="mt-4 text-gray-600">Loading talents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <p className="font-medium">⚠️ {error}</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500 text-lg">
          No talents found{currentSkill ? ` for skill "${currentSkill}"` : ""}.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map(talent => (
        <div
          key={talent._id}
          className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-800">{talent.name}</h3>
            <span className="bg-indigo-100 text-indigo-600 text-xs font-semibold px-2.5 py-1 rounded-full">
              {talent.experience ?? 0}y
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 flex items-center gap-2">
            <span className="text-blue-500">✉️</span>
            {talent.email}
          </p>

          {talent.skills?.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {talent.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Added: {new Date(talent.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TalentList;