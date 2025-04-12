import React, { useEffect, useState } from "react";
import { Input } from "../Libs";
import { useTheme } from "../Context/themeContext";
import { useApi } from "../utility/constant";

const FilterSidebar = ({ setFilterData }) => {
  const { theme } = useTheme();
  const { apiCaller, isLoading, error } = useApi();
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [priceRange, setPriceRange] = useState(500);
  const getAllCategory = async () => {
    try {
      const { data } = await apiCaller({
        url: "https://dummyjson.com/products/categories",
        method: "GET",
      });
      console.log(data);
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
    // const options = {
    //   method: "GET",
    //   url: "https://dummyjson.com/products/category-list",
    //   // params: { limit: limit, skip: (currPage - 1) * limit },
    // };
    // axios
    //   .request(options)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   }
    // );
  };
  console.log(selectedCategory);
  const handleCategoryToggle = (slug) => {
    if (selectedCategory.includes(slug)) {
      setSelectedCategory(selectedCategory.filter((item) => item !== slug));
      return;
    } else {
      setSelectedCategory([...selectedCategory, slug]);
      return;
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  useEffect(() => {
    setFilterData({
      category: selectedCategory,
      price: priceRange,
    });
  }, [selectedCategory, priceRange]);
  return (
    <div className="w-full md:w-1/4 space-y-4 p-4 border-r h-full overflow-y-auto  ">
      <h1 className="p-2 font-bold text-xl mb-2 ">Filters</h1>
      <div>
        <h2 className="font-semibold mb-2">Brand</h2>
        <div className="grid grid-cols-3 gap-3">
          {Array.isArray(category) &&
            category?.map((brand, index) => (
              <div
                key={index}
                className={`flex items-center rounded-lg overflow-hidden cursor-pointer ${
                  theme === "dark"
                    ? "border-white hover:bg-gray-800  text-white"
                    : "border-blue-500 hover:bg-blue-100 text-blue-500"
                } ${
                  selectedCategory.includes(brand.slug)
                    ? "bg-blue-600 text-white"
                    : ""
                } border-dashed border-2 p-2 hover:border-solid`}
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryToggle(brand?.slug);
                }}
              >
                {/* <input type="checkbox" id={brand} className="mr-2 hidden" /> */}
                <Input
                  type="checkbox"
                  className="hidden"
                  id={brand?.slug}
                  checked={selectedCategory.includes(brand?.slug)}
                />
                <label htmlFor={brand?.slug} className={` font-semibold  `}>
                  {brand?.name}{" "}
                </label>
              </div>
            ))}
        </div>

        <div className="mt-4">
          <h2 className="font-semibold mb-2">Price: ₹{priceRange}</h2>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
