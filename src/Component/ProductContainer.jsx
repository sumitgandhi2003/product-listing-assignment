import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { Button, Input, Select } from "../Libs/index.js";
import { Moon, Sun, Heart, User, Filter } from "lucide-react";
import { useTheme } from "../Context/themeContext.jsx";
import Pagination from "./Pagination.jsx";
import ViewToggle from "./viewToggle.jsx";
import ProductCard from "./ProductCard.jsx";
import { useApi } from "../utility/constant.js";
import FilterSidebar from "./FilterSidebar.jsx";
const ProductContainer = () => {
  const [productArr, setProductArr] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { theme } = useTheme();
  const [filterData, setFilterData] = useState({
    category: [],
    price: 500,
  });
  const [filteredProductArr, setFilteredProductArr] = useState(productArr);
  const [limit, setLimit] = useState(10);
  const { apiCaller, isLoading, error } = useApi();

  const [viewStyle, setViewStyle] = useState("grid");
  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrPage(page);
  };

  const getProductData = async () => {
    try {
      const { data } = await apiCaller({
        url: "https://dummyjson.com/products",
        method: "GET",
        params: { limit: limit, skip: (currPage - 1) * limit },
      });
      console.log(data);
      setProductArr(data?.products);
      setFilteredProductArr(data?.products);
      setTotalPages(() => {
        const totalProduct = data?.total;
        const totalPages = Math.ceil(totalProduct / limit);
        return totalPages;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getFilterData = (filterData) => {
    const { category, price } = filterData;

    const categoryfiltered = category.length
      ? productArr.filter((product) => category.includes(product.category))
      : productArr; // If no category selected, return all
    const priceFiltered = categoryfiltered.filter(
      (product) => product.price <= price
    );
    console.log(priceFiltered);
    setFilteredProductArr(priceFiltered);
    setTotalPages(() => {
      const totalProduct = priceFiltered?.length;
      const totalPages = Math.ceil(totalProduct / limit);
      return totalPages;
    });
  };
  useEffect(() => {
    getProductData();
  }, [currPage, limit]);

  console.log(viewStyle);
  console.log(limit);
  console.log(filterData);

  // console.log(totalPages);
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    getFilterData(filterData);
  }, [filterData.price, filterData.category]);
  return (
    <div
      className={`${
        theme === "dark" ? " bg-gray-900 text-white" : "bg-white text-black"
      } flex-1/2 `}
    >
      <div className="flex flex-col md:flex-row gap-6 p-4">
        {/* Filters Sidebar */}
        <FilterSidebar setFilterData={setFilterData} />

        {/* Car Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Available Product</h2>
              <p className="text-gray-500">
                Showing {currPage} to {totalPages} of {productArr.length}{" "}
                products
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <Select
                onChange={(e) => {
                  setLimit(e.target.value);
                }}
                name="limit"
                itemArray={[
                  { id: "1", value: "10", name: "10" },
                  { id: "2", value: "20", name: "20" },
                  { id: "3", value: "40", name: "40" },
                  { id: "4", value: "50", name: "50" },
                ]}
                className={
                  "px-2 py-1 rounded-md w-[80px] h-[40px] font-semibold font-sans"
                }
                value={limit}
              />
              <ViewToggle viewStyle={viewStyle} setViewStyle={setViewStyle} />
            </div>
          </div>

          <div
            className={`${
              viewStyle === "grid"
                ? "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4"
                : "flex flex-col gap-4"
            } gap-4`}
          >
            {filteredProductArr.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                viewStyle={viewStyle}
              />
            ))}
            {isLoading && <div>products are loading</div>}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;
