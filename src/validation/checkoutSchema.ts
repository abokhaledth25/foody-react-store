
import { z } from "zod";

export const checkoutSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(3, {
            error: "Name must be at least 3 characters",
        }),

    email: z.email({
        error: "Enter a valid email address",
    }),

    phone: z
        .string()
        .trim()
        .regex(/^\+?[0-9]{8,15}$/, {
            error: "Enter 8–15 digits (optional +)",
        }),

    city: z
        .string()
        .trim()
        .min(2, {
            error: "City must be at least 2 characters",
        }),

    address: z
        .string()
        .trim()
        .min(5, {
            error: "Address must be at least 5 characters",
        }),
});

export type CheckoutFormData =
    z.infer<typeof checkoutSchema>;
