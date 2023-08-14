import "./style.css";
import * as React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, link, id, channel }) => {
  const [isHover, setHover] = React.useState(false);

  // const getDetails = (val) => {
  //   navigate(`/video/${val}`);
  // };

  return (
    <div
      className="card text-left"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ margin: 10 }}
    >
      <img className="card-img-top" src={link} alt="" />
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <div className="channel-section">
          <hr
            style={{
              border: "1px solid white",
            }}
          />
          <h4 className="card-desc">{channel}</h4>
        </div>
      </div>
      {isHover && (
        <Link to={`/video/${id}`}>
          <button className="watchButton">Watch</button>
        </Link>
      )}
    </div>
  );
};

export default Card;
