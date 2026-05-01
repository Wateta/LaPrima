const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    field: { type: String, default: null },
    choosen_field: { type: mongoose.Schema.Types.ObjectId, ref: "Field", default: null },
    surveyAnswers: { type: Object, default: {} },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
    resetPasswordCode: { type: String },
    resetPasswordExpires: { type: Date },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    savedOpportunities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Opportunity",
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
