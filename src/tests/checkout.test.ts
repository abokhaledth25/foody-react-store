
import { describe, test, expect } from "vitest";

import {
    checkoutSchema,
} from "../validation/checkoutSchema";

const validData = {
    fullName: "Ali Ahmad",
    email: "ali@example.com",
    phone: "+96170123456",
    city: "Sidon",
    address: "Main Street, Building 12",
};

describe("Checkout Validation", () => {
    test("accepts valid checkout data", () => {
        const result = checkoutSchema.safeParse(validData);

        expect(result.success).toBe(true);
    });

    test("rejects invalid email", () => {
        const result = checkoutSchema.safeParse({
            ...validData,
            email: "wrong-email",
        });

        expect(result.success).toBe(false);

        if (!result.success) {
            const hasEmailError = result.error.issues.some(
                (issue) => issue.path[0] === "email"
            );

            expect(hasEmailError).toBe(true);
        }
    });

    test("rejects missing required fields", () => {
        const result = checkoutSchema.safeParse({
            fullName: "",
            email: "",
            phone: "",
            city: "",
            address: "",
        });

        expect(result.success).toBe(false);
    });
});
