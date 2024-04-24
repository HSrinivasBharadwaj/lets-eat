import React from "react";
import useFetchCategories from "../hooks/useFetchCategories";
import { CATEGORIES_URI } from "../utils/constants";
import Shimmer from "./Shimmer";
import lang from "../utils/language";
import { useSelector } from "react-redux";

const Categories = () => {
  const getLanguages = useSelector(state => state.config.lang);
  const { loading, error, categories } = useFetchCategories();
  const { info } = categories;
  if (loading || !info || info.length === 0) {
    return <Shimmer />
  }
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  const handleTest = (title) => {

  }
 
  return (
    <div>
      <h1 className="font-bold text-2xl">{lang[getLanguages].categories}</h1>
      <div className="flex overflow-x-scroll">
        {info.map((category) => {
          return (
            <div key={category.id}>
              <img
                onClick={() => handleTest(category.action.text)}
                className="w-40 h-40 cursor-pointer max-w-none object-contain"
                src={CATEGORIES_URI + category.imageId}
                alt={category.action.text}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;