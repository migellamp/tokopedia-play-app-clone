import { useParams } from "react-router-dom";
import * as React from "react";
import axios from "axios";
import CardProduct from "../../component/cardProduct";
import Navbar from "../../component/navbar";
import "./style.css";
import Chat from "../../component/chat";

const DetailPage = () => {
  const id = Object.values(useParams());
  const [product, setProduct] = React.useState(null);
  const [videoId, setVideo] = React.useState(null);

  const getProduct = async () => {
    const productList = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/product/${id}`
    );
    if (productList.data.ListProduct.length !== 0) {
      setProduct(productList.data.ListProduct);
    }
  };

  const getVideo = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/video/${id}`
    );
    const url = response.data.video.videoUrl;
    if (url.indexOf("youtu.be") >= 0) {
      const urlObject = new URL(url);
      const video = urlObject.pathname.split("/")[1];
      setVideo(video);
    } else if (url.indexOf("youtube") >= 0) {
      const regex = /v=([^&]+)/;
      const match = url.match(regex);
      const videoID = match && match[1];
      setVideo(videoID);
    }
  };

  React.useEffect(() => {
    getProduct();
    getVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="video-detail">
        <div className="container-detail-video">
          <Navbar></Navbar>
          <div className="main-section-detail-video">
            <div className="video-section">
              {videoId && (
                <div className="video-responsive">
                  <iframe
                    width="1220"
                    height="700"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                </div>
              )}
            </div>
            <div className="product-section">
              {product !== null ? (
                product?.map((val, id) => {
                  return (
                    <div key={id} className="container-card">
                      <CardProduct
                        id={id + 1}
                        title={val.title}
                        productUrl={val.productUrl}
                        imageUrl={val.productImage}
                        stock={val.stock}
                        price={val.price}
                      ></CardProduct>{" "}
                    </div>
                  );
                })
              ) : (
                <h6 style={{ color: "white" }}>There is no product yet!</h6>
              )}
              {/* {product === null ? (
              <h1 style={{ color: "white" }}>There is no product yet!</h1>
            ) : null} */}
            </div>
          </div>
          <div className="livechat-section-video">
            {videoId && <Chat id={id}></Chat>}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
