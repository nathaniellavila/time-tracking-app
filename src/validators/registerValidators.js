// src/validators/registerValidators.js

export const collegeIdRules = [
  v => !!v || "College ID is required",
];

export const firstNameRules = [
  v => !!v || "First name is required",
];

export const lastNameRules = [
  v => !!v || "Last name is required",
];

export const middleInitialRules = [
  v => !v || /^[A-Za-z]$/.test(v) || "Middle Initial must be a single letter",
];
// Optional: if you want to validate it is just 1 letter (optional field)

export const courseRules = [
  v => !!v || "Course is required",
];

export const yearLevelRules = [
  v => !!v || "Year level is required",
];

export const emailRules = [
  v => !!v || "Email is required",
  v => /.+@.+\..+/.test(v) || "Email must be valid",
];

export const passwordRules = [
  v => !!v || "Password is required",
  v => v.length >= 6 || "Password must be at least 6 characters",
];

export const confirmPasswordRules = (password) => [
  v => !!v || "Password confirmation is required",
  v => v === password || "Passwords do not match",
];
