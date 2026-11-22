
import { Link } from "react-router";
import "./Categories.css";

const categories = [
    {
        id: 1,
        name: "Vegetables",
        icon: "🥦",
    },
    {
        id: 2,
        name: "Fruits",
        icon: "🍎",
    },
];

function Categories() {
    return (
        <section className="categories-section">
            <h2>Shop by Category</h2>
            <p>Explore our fresh organic food</p>

            <div className="categories-grid">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        to={`/products?category=${category.name}`}
                        className="category-card"
                    >
                        <span>{category.icon}</span>
                        <h3>{category.name}</h3>
                        <p>Shop Category →</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default Categories;
