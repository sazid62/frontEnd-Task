import { useNavigate } from "react-router-dom";
import { useAddProducts } from "../api/queries";

export default function AddProducts() {
  const addProducts = useAddProducts();
  const navigate = useNavigate();
  async function addProductAction(formData) {
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      stock: parseInt(formData.get("stock")),
    };

    try {
      const result = await addProducts.mutateAsync(data);
      alert("Product added successfully!");
      navigate("/");
    } catch (error) {
      alert(error.message || "Something went wrong!");
    }
  }

  return (
    <form
      action={addProductAction}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "300px",
      }}
    >
      <h2>Add New Product</h2>

      <label>
        Product Name:
        <input type="text" name="name" required />
      </label>

      <label>
        Description:
        <textarea name="description" required />
      </label>

      <label>
        Price:
        <input type="number" name="price" required />
      </label>

      <label>
        Stock:
        <input type="number" name="stock" required />
      </label>

      <button type="submit">Add Product</button>
    </form>
  );
}
