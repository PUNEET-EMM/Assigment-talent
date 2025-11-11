import mongoose from "mongoose";

const talentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },
    skills: {
      type: [String],
      default: []
    },
    experience: {
      type: Number,
      default: 0,
      min: [0, "Experience cannot be negative"]
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

const Talent = mongoose.model("Talent", talentSchema);

export default Talent;
