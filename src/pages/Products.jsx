import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/product'; 
import { Image, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom'; 
import ProductsTable from '../components/ProductsTable';
import {getItem, setItem} from '../utils/localStorage'
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const productsToCompare = getItem("productsToCompare") || [];

  const fetchProducts = async (page = 1) => {
    const response = await getProducts((page - 1) * 10);
    setProducts(response?.products);
    setTotalItems(response?.total);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page'), 10) || 1;
    setCurrentPage(page);

    fetchProducts(page);
  }, [location.search]);

  const handleTableChange = (page) => {
    const params = new URLSearchParams(location.search);
    params.set('page', page);
    
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });

    fetchProducts(page);
  };

  const handleCompare = (product) => {
    const productsToCompare = getItem('productsToCompare') || [];
    if(productsToCompare?.length >= 4){
      toast.error('You can only compare maximum 4 Products')
      return
    }
    productsToCompare.push(product)
    setItem('productsToCompare', productsToCompare)
    navigate('/compare')
  };

  return (
    <ProductsTable
      currentPage={currentPage}
      handleTableChange={handleTableChange}
      products={products}
      totalItems={totalItems}
      extraColumns={[
        {
          title: 'Image',
          dataIndex: 'images',
          key: 'images',
          render: (images, record) => {
            const firstImage = images && images.length > 0 ? images[0] : null;
            const title = record.title;
            return (
              <div>
                {firstImage ? (
                  <Image alt={title} src={firstImage} width={100} />
                ) : (
                  <span>No Image</span>
                )}
              </div>
            );
          },
        },
        {
          title: 'Compare',
          key: 'compare',
          render: (text, record) => {
            const isExists = productsToCompare?.find(product => product?.id === record?.id) ? true : false;
            return (
            <Button disabled={isExists} onClick={() => handleCompare(record)}>Compare</Button>
          )},
        },
      ]}
    />
  );
};

export default Products;
