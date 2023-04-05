import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  // const [search, setSearch] = useState("");

  const loadFoodItems = async () => {
    let url = await fetch("http://localhost:4000/api/displayfooddata");
    const response = await url.json();
    //console.log(response.payload.findFood_item);
    setFoodItems(response.payload.findFood_item);
    setFoodCat(response.payload.findfoodCategory);
  };

  useEffect(() => {
    loadFoodItems();
  }, []);
  return (
    <div>
      <Navbar />
      <Carousel />
      <div className="m-3">
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div>
                  <div key={data._id} className="fs-3 m-3">
                    {data.categoryName}
                  </div>
                  <hr />
                  {foodItems}
                </div>
              );
            })
          : ""}
        <Card />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
