import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email("Invalid email address"),
    role: z.enum(['user', 'admin']),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string(),
    address: z.string(),
    isDeleted:z.boolean().default(false)
  })
   
});
 const AuthValidationSchema = z.object({
  body:z.object({
    email:z.string().email(),
    password:z.string()
  })
 })
export const UserValidation = {
  userValidationSchema,AuthValidationSchema
};
