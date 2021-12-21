import { memo } from "react";
import PropTypes from "prop-types";

import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ imageData, onClick }) => {
  const items = imageData.map((item) => (
    <li
      className={s["gallery-item"]}
      key={item.id}
      onClick={() => onClick(item.id)}
    >
      <img
        src={item.webformatURL}
        alt={item.tags}
        className={s["gallery-img"]}
      />
    </li>
  ));
  return items;
};

export default memo(ImageGalleryItem);

ImageGalleryItem.propTypes = {
  imageData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func,
};
