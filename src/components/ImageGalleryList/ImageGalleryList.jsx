// import React, { Component } from "react";
import { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { galleryAPI } from "../../shared/servises/galleryAPI";
import { toast } from "react-toastify";

import Button from "../../shared/components/Button";
import ImageGalleryItem from "../ImageGalleryItem";
import Modal from "../../shared/components/Modal";
import ContentForModal from "../ContentForModal";
import Error from "../Error";
import Spinner from "../../shared/components/Spinner";

import s from "./ImageGalleryList.module.css";

const ImageGalleryList = ({ propsQuery }) => {
  const [state, setState] = useState({
    gallery: [],
    page: 1,
    totalImages: 0,
    status: "idle",
    modalOpen: false,
    modalObj: {},
    error: "",
  });

  const { totalImages, error, status, modalOpen, modalObj, gallery, page } =
    state;

  useEffect(() => {
    if (!propsQuery) {
      return;
    }

    searchImages([]);
  }, [propsQuery]);

  useEffect(() => {
    if (!propsQuery) {
      return;
    }
    searchImages(gallery);
  }, [page]);

  async function searchImages(prevGallery) {
    try {
      const result = await galleryAPI.fetchQuery(propsQuery, page);
      if (!result.data.hits.length) {
        toast.error("Sorry we can't find anything(");
      }

      setState({
        ...state,
        totalImages: result.data.totalHits,
        status: "resolved",
        gallery: [...prevGallery, ...result.data.hits],
      });
    } catch (error) {
      setState({
        ...state,
        error: error.message,
        status: "rejected",
      });
    }
  }

  function handleClick() {
    setState((prevState) => ({
      ...state,
      page: prevState.page + 1,
      status: "pending",
    }));
  }

  function showModal(id) {
    const modalObj = gallery.find((item) => item.id === id);
    setState({
      ...state,
      modalObj,
      modalOpen: true,
    });
  }

  function hideModal() {
    setState({
      ...state,
      modalOpen: false,
    });
  }

  const totalPages = Math.ceil(totalImages / 12);

  return (
    <>
      {status === "pending" && <Spinner />}

      {status === "rejected" && <Error error={error} />}

      {modalOpen && (
        <Modal closeModal={hideModal}>
          <ContentForModal {...modalObj} />
        </Modal>
      )}
      {gallery.length > 0 && (
        <ul className={s.gallery}>
          <ImageGalleryItem imageData={gallery} onClick={showModal} />
        </ul>
      )}
      {gallery.length > 0 && page < totalPages && (
        <Button
          type="button"
          text="Load more"
          onClick={handleClick}
          className={"load-more"}
        />
      )}
      {page === totalPages && (
        <p className={s.text}>
          We're sorry, but you've reached the end of search results.
        </p>
      )}
    </>
  );
};

export default ImageGalleryList;

ImageGalleryList.propTypes = {
  propsQuery: PropTypes.string,
};
