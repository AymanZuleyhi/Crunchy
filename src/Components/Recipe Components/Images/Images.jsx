import "./Images.css";
import { useState, useEffect } from "react";

function Images(props) {
  const { images } = props;
  
  const allImages = images.map((img, i) => {
    return i === 0
    ? { ...img, active: true }
    : { ...img }
  });

  const [imgs, setImgs] = useState(allImages);
  const [activeImg, setActiveImg] = useState(imgs[0]);

  const changeActiveImage = (img) => {
    setImgs((prevImgs) => {
      return prevImgs.map((eachImg) => {
        return eachImg.url === img.url
        ? { ...eachImg, active: true }
        : { ...eachImg, active: false }
      })
    });
  };

  useEffect(() => {
      const img = imgs.filter((img) => img.active);
      setActiveImg(img[0]);
  }, [imgs])

  return (
    <div className="IMAGES">
      <img src={activeImg === undefined ? allImages[0].url : activeImg.url} className="active-img"/>

      <div className="images">
        {imgs.map((img) => {
          return (
            <img 
              onClick={() => changeActiveImage(img)}
              key={img.url} 
              src={img.url} 
              className={`${img.active ? "active" : "not-active"}`} 
            />
          )
        })}
      </div>
    </div>

  )
};

export default Images;