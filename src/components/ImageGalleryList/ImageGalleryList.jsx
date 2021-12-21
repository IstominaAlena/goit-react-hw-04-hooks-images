import { useState, useCallback } from "react";

import PropTypes from "prop-types";

import ImageGalleryItem from "../ImageGalleryItem";
import Modal from "../../shared/components/Modal";
import ContentForModal from "../ContentForModal";

import s from "./ImageGalleryList.module.css";

const ImageGalleryList = ({ data }) => {
  const [state, setState] = useState({ modalOpen: false, modalObj: {} });
  const { modalOpen, modalObj } = state;

  const showModal = useCallback(
    (id) => {
      const modalObj = data.find((item) => item.id === id);
      setState({
        ...state,
        modalObj,
        modalOpen: true,
      });
    },
    [data, state]
  );

  function hideModal() {
    setState({
      ...state,
      modalOpen: false,
    });
  }

  return (
    <>
      {modalOpen && (
        <Modal closeModal={hideModal}>
          <ContentForModal {...modalObj} />
        </Modal>
      )}
      <ul className={s.gallery}>
        <ImageGalleryItem imageData={data} onClick={showModal} />
      </ul>
    </>
  );
};

export default ImageGalleryList;

ImageGalleryList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
