import React, { useState } from "react";
import { getItem, setItem } from "../utils/localStorage";
import Modal from "../components/Modal";
import AddMoreModal from "../components/AddMoreModal";

const Compare = () => {
  const [open, setOpen] = useState(false);

  const [products, setProducts] = useState(getItem("productsToCompare") || []);

  const attributes = ["description", "price", "discountPercentage", "category", "brand"];

  const columnWidth = "w-1/5";

  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)

  const deleteProduct = (id) => {
    const productsToCompare = getItem('productsToCompare') || [];
    const newProductsToCompare = productsToCompare?.filter(pr => pr.id !== id);
    setItem('productsToCompare', newProductsToCompare)
    setProducts(newProductsToCompare);
  }

  return (
    <div className="container mx-auto p-4">
      {open && (
        <Modal isOpen={open} onClose={onClose}>
          <AddMoreModal onClose={onClose} setData={setProducts}/>
        </Modal>
      )}
      <div className="flex items-end w-full">
        <button onClick={onOpen} className="ml-auto px-5 py-2 rounded-lg border border-gray-500 hover:bg-gray-300 my-2">
          Add More
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Product Comparison</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="border-b border-gray-300">
              <th className={`p-2 ${columnWidth} text-left bg-gray-100`}>
                Attribute
              </th>
              {products.map((product) => (
                <th
                  key={product.title}
                  className={`p-2 ${columnWidth} text-left bg-gray-100 border-l border-gray-300`}
                >
                  <div>{product.title}</div>
                  <button onClick={() => deleteProduct(product.id)} className="px-2 py-1 rounded-lg border border-gray-500 hover:bg-gray-300 my-2">
                    Delete
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attributes.map((attr) => (
              <tr key={attr} className="border-b border-gray-300">
                <td className={`p-2 font-semibold ${columnWidth} bg-gray-50`}>
                  {attr.charAt(0).toUpperCase() + attr.slice(1)}
                </td>
                {products.map((product) => (
                  <td
                    key={product.title + attr}
                    className={`p-2 ${columnWidth} border-l border-gray-300`}
                  >
                    {attr === "price"
                      ? `$${product[attr]}`
                      : attr === "discountPercentage"
                      ? `${product[attr]}%`
                      : product[attr]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compare;
