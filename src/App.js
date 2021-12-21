import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Spinner from "./shared/components/Spinner";

import Section from "./shared/components/Section";
import Searchbar from "./components/Searchbar";
import Button from "./shared/components/Button";
import ImageGalleryList from "./components/ImageGalleryList";
import Error from "./components/Error";

import { galleryAPI } from "./shared/servises/galleryAPI";
import { initialState } from "./js/initialState";

import "./styles/App.css";

const App = () => {
  const [state, setState] = useState({ ...initialState });

  const { totalImages, error, status, gallery, page, searchQuery } = state;

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    async function searchImages() {
      setState({
        ...state,
        status: "pending",
      });
      try {
        const result = await galleryAPI.fetchQuery(searchQuery, page);
        if (!result.data.hits.length) {
          toast.error("Sorry we can't find anything(");
        }

        setState(({ gallery }) => ({
          ...state,
          totalImages: result.data.totalHits,
          status: "resolved",
          gallery: [...gallery, ...result.data.hits],
        }));
      } catch (error) {
        setState({
          ...state,
          error: error.message,
          status: "rejected",
        });
      }
    }
    searchImages();
  }, [searchQuery, page]);

  function formSubmitHandler(query) {
    if (query === searchQuery) {
      return;
    }
    setState({ ...state, searchQuery: query, page: 1, gallery: [] });
  }

  function handleClick() {
    setState((prev) => ({
      ...state,
      page: prev.page + 1,
      status: "pending",
    }));
  }

  const totalPages = Math.ceil(totalImages / 12);

  return (
    <>
      <Section>
        <Searchbar onSubmit={formSubmitHandler} />
      </Section>

      <Section>
        {status === "pending" && <Spinner />}
        {status === "rejected" && <Error error={error} />}

        {gallery.length > 0 && <ImageGalleryList data={gallery} />}
        {gallery.length > 0 && page < totalPages && status !== "pending" && (
          <Button
            type="button"
            text="Load more"
            onClick={handleClick}
            className={"load-more"}
          />
        )}
        {page === totalPages && (
          <p className="text">
            We're sorry, but you've reached the end of search results.
          </p>
        )}
      </Section>
      <ToastContainer autoClose={3000} position="top-center" />
    </>
  );
};

export default App;
