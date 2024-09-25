// validations/userValidation.js
const { z } = require('zod');

const userSchema = z.object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8), // Adjust minimum length as necessary
    age: z.number().min(18),
    skills: z.array(z.string()).optional(),
    profilePic: z.string().url().optional(),
    gender: z.enum(['male', 'female', 'non-binary', 'other']),
});

const userUpdateSchema = z.object({
    email: z.string().email(),
    updates: z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        age: z.number().min(18).optional(),
        gender: z.enum(['male', 'female', 'non-binary', 'other']).optional(),
    }),
});

module.exports = { userSchema, userUpdateSchema };
