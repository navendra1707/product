import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import ProductsTable from './ProductsTable';
import { getItem, setItem } from '../utils/localStorage';
import { getProducts } from '../api/product';
import toast from 'react-hot-toast';

const AddMoreModal = ({onClose, setData}) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0); 

  const productsToCompare = getItem("productsToCompare") || []

  const fetchProducts = async (page = 1) => {
    const response = await getProducts((page - 1) * 10);
    setProducts(response?.products);
    setTotalItems(response?.total);
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleTableChange = (page) => {
    setCurrentPage(page);
    fetchProducts(page);
  };

  const handleAdd = (product) => {
    const productsToCompare = getItem('productsToCompare') || [];
    if(productsToCompare?.length >= 4){
      toast.error('You can only compare maximum 4 Products')
      return;
    }
    productsToCompare.push(product);
    setItem('productsToCompare', productsToCompare);
    setData(productsToCompare)
    onClose();
  };

  return (
    <ProductsTable
      currentPage={currentPage}
      handleTableChange={handleTableChange}
      products={products}
      totalItems={totalItems}
      extraColumns={[
        {
          title: 'Add',
          key: 'add',
          render: (text, record) => {
            const isExists = productsToCompare?.find(product => product?.id === record?.id) ? true : false;
            return (
            <Button disabled={isExists} onClick={() => handleAdd(record)}>Add</Button>
          )},
        },
      ]}
    />
  );
};

export default AddMoreModal;
