
export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
};

export const products: Product[] = [
    {
        id: 1,
        name: "Organic Tomatoes",
        price: 3.50,
        category: "Vegetables",
        image: "/images/product-1.jpg",
    },
    {
        id: 2,
        name: "Fresh Pineapple",
        price: 4.50,
        category: "Fruits",
        image: "/images/product-2.jpg",
    },
    {
        id: 3,
        name: "Fresh Chili Peppers",
        price: 2.75,
        category: "Vegetables",
        image: "/images/product-3.jpg",
    },
    {
        id: 4,
        name: "Fresh Strawberry",
        price: 5.25,
        category: "Fruits",
        image: "/images/product-4.jpg",
    },
    {
        id: 5,
        name: "Fresh Cucumbers",
        price: 2.25,
        category: "Vegetables",
        image: "/images/product-5.jpg",
    },
    {
        id: 6,
        name: "Orange Tomato",
        price: 3.25,
        category: "Vegetables",
        image: "/images/product-6.jpg",
    },
    {
        id: 7,
        name: "Fresh Potatoes",
        price: 2.50,
        category: "Vegetables",
        image: "/images/product-7.jpg",
    },
    {
        id: 8,
        name: "Fresh Banana",
        price: 1.95,
        category: "Fruits",
        image: "/images/product-8.jpg",
    },
];
