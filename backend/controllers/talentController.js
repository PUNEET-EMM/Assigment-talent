import Talent from "../models/Talent.js";
import { success, sendError } from "../utils/apiResponse.js"; 


export const createTalent = async (req, res, next) => {
  try {
    const { name, email, skills, experience } = req.body;

    if (!name || !email) {
      return sendError(res, "Name and email are required", 400);
    }

    const existing = await Talent.findOne({ email });
    if (existing) {
      return sendError(res, "Email already exists", 409);
    }

    const skillsArray = Array.isArray(skills)
      ? skills
      : typeof skills === "string"
      ? skills
          .split(",")
          .map(s => s.trim())
          .filter(Boolean)
      : [];

    const talent = await Talent.create({
      name,
      email,
      skills: skillsArray,
      experience: experience || 0
    });

    return success(res, talent, "Talent created successfully", 201);
  } catch (error) {
    console.error(error);
    return sendError(res, error.message || "Failed to create talent", 500, error);
  }
};


export const getTalents = async (req, res, next) => {
  try {
    const { skill } = req.query;

    const query = {};
    if (skill) {
      query.skills = { $regex: new RegExp(skill, "i") };
    }

    const talents = await Talent.find(query).sort({ createdAt: -1 });
    return success(res, talents, "Talents fetched successfully", 200);
  } catch (error) {
    console.error(error);
    return sendError(res, error.message || "Failed to fetch talents", 500, error);
  }
};
