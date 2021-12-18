import { useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Section from "./shared/components/Section";
import Searchbar from "./components/Searchbar";
import ImageGalleryList from "./components/ImageGalleryList";

import "./styles/App.css";

const App = () => {
  const [query, setQuery] = useState("");

  function formSubmitHandler(data) {
    setQuery(data);
  }

  return (
    <>
      <Section>
        <Searchbar onSubmit={formSubmitHandler} />
      </Section>

      <Section>
        <ImageGalleryList propsQuery={query} />
      </Section>
      <ToastContainer autoClose={3000} position="top-center" />
    </>
  );
};

export default App;
