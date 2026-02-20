import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "@/app/(dashboard)/(components)/Header";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const defaultForm = {
  productId: v4(),
  name: "",
  price: 0,
  stockQuantity: 0,
  rating: 0,
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState(defaultForm);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isNumber = name === "price" || name === "stockQuantity" || name === "rating";
    setFormData((prev) => ({
      ...prev,
      [name]: isNumber ? (value === "" ? 0 : parseFloat(value)) : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    // Reset form with a fresh UUID for the next product
    setFormData({ ...defaultForm, productId: v4() });
    onClose();
  };

  const handleClose = () => {
    // Also reset on cancel
    setFormData({ ...defaultForm, productId: v4() });
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles =
    "block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1";
  const inputCssStyles =
    "block w-full mb-3 p-2 border-gray-300 border-2 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-500";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-5">

          <label className={labelCssStyles}>Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputCssStyles}
            required
          />

          <label className={labelCssStyles}>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price || ""}
            className={inputCssStyles}
            required
          />

          <label className={labelCssStyles}>Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity || ""}
            className={inputCssStyles}
            required
          />

          <label className={labelCssStyles}>Rating</label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating || ""}
            className={inputCssStyles}
            required
          />

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 font-semibold"
            >
              Create
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;