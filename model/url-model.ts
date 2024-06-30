import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: {
          type: Number,
        },
        deviceType: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Url = mongoose.models.urls || mongoose.model("urls", urlSchema);
