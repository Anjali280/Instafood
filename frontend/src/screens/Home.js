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
    console.log(foodItems);
  };

  useEffect(() => {
    loadFoodItems();
  }, []);
  return (
    <div>
      <Navbar />
      <Carousel />
      <div className="container">
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItems !== [] ? (
                    foodItems
                      .filter(
                        (items) => items.CategoryName === data.CategoryName
                        //  &&
                        // items.name
                        //   .toLowerCase()
                        //   .includes(search.toLowerCase())
                      )
                      .map((element) => {
                        return (
                          <div
                            key={element.id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              foodName={element.name}
                              item={element}
                              options={element.options[0]}
                              ImgSrc={element.img}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div> No Such Data </div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
