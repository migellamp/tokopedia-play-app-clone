import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../component/card";
import "./style.css";
import Navbar from "../../component/navbar";
import { SearchContext } from "../../context/search";
import { useContext } from "react";

function HomePage() {
  // sessionStorage.removeItem("user");
  const [data, setData] = useState(null);
  const { typeValue } = useContext(SearchContext);
  const searchData = async () => {
    const videoList = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/video`
    );
    const searchData = videoList?.data.video;

    const filteredData = searchData?.filter((val) => {
      return (
        val.title?.toLowerCase().indexOf(typeValue?.toLowerCase()) >= 0 ||
        val.channel?.toLowerCase().indexOf(typeValue?.toLowerCase()) >= 0
      );
    });
    if (filteredData.length > 0) {
      setData(filteredData);
    }
    if (filteredData.length === 0) {
      setData(null);
      // return (
      //   <>

      //     <Navbar></Navbar>
      //     <h1 style={{ color: "white" }}>There is no video yet!</h1>;
      //   </>
      // );
    }
  };

  useEffect(() => {
    searchData();
    // eslint-disable-next-line
  }, [typeValue]);

  const getData = async () => {
    const videoList = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/video`
    );
    setData(videoList.data.video);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="container-main">
        <Navbar></Navbar>
        <div className="container-list-video">
          <div className="list-video-section">
            {data?.map((val, id) => {
              return (
                <div key={id} className="container-card">
                  <Card
                    title={val?.title}
                    link={val?.imgUrl}
                    id={val?._id}
                    channel={val?.channel}
                  ></Card>{" "}
                </div>
              );
            })}
            {data === null ? (
              <>
                <h6 className="mt-5" style={{ color: "white" }}>
                  There is no video yet!
                </h6>
                ;
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
