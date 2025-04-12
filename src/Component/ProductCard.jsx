import React from "react";
import { useTheme } from "../Context/themeContext";
import { useWishlist } from "../Context/wishListContext";
import { Button } from "../Libs";
import { Heart } from "lucide-react";

const ProductCard = ({ product, viewStyle }) => {
  const { theme } = useTheme();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWished = wishlist.some((item) => item.id === product.id);
  return (
    <div
      key={product.id}
      className={`border relative ${
        viewStyle === "list" ? "flex gap-4" : "block"
      } rounded-xl p-3 shadow-sm ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } `}
    >
      <div className="">
        <img
          src={product?.thumbnail}
          alt={product.model}
          className={`rounded-xl ${
            viewStyle === "grid" ? "w-full" : "w-72"
          } h-40 object-cover`}
        />
        <Button
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() =>
            isWished ? removeFromWishlist(product.id) : addToWishlist(product)
          }
          icon={
            <Heart
              className={`w-5 h-5 ${
                isWished ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          }
        />
      </div>
      <div className="mt-2">
        <h3 className="font-bold line-clamp-1">{product?.title}</h3>
        <p className="text-blue-600 font-semibold">
          ${product.price.toLocaleString()}
        </p>
        <div
          className={`text-sm ${
            theme === "dark" ? "text-gray-300" : "text-gray-500"
          }`}
        >
          <p>
            {product.fuel} • {product.seats} Seats
          </p>
        </div>
      </div>
      <Button
        className={` ${
          viewStyle === "grid"
            ? "w-full "
            : "w-max h-min ml-auto py-1 px-10 absolute bottom-4 right-4"
        } mt-2 bg-blue-600 rounded-lg text-white py-1 font-serif hover:bg-blue-700 transition duration-200`}
        onClick={() => console.log(`View details of ${product.id}`)}
        btntext="View Details"
      />
    </div>
  );
};

export default ProductCard;
