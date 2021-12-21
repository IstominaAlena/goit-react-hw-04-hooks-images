import { useState } from "react";

import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { AiOutlineCompass } from "react-icons/ai";
import { toast } from "react-toastify";

import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";

import s from "./Searchbar.module.css";

const Searchbar = (props) => {
  const [query, setQuery] = useState("");

  function onInputChange(e) {
    setQuery(e.target.value);
  }

  function onFormSubmit(e) {
    e.preventDefault();

    if (query.trim() === "") {
      toast.warn("Please, enter your request");
    }

    props.onSubmit(query);
    setQuery("");
  }

  return (
    <form className={s.form} onSubmit={onFormSubmit}>
      <Input
        value={query}
        onChange={onInputChange}
        type="text"
        placeholderValue="Search images and photos"
        autoFocus={true}
        autoComplete="off"
      />

      <Button
        type="submit"
        text={
          <IconContext.Provider
            value={{
              color: "rgb(21, 180, 243)",
              className: "search-icon",
              size: "20px",
            }}
          >
            <span className={s["button-label"]}>
              <AiOutlineCompass />
            </span>
          </IconContext.Provider>
        }
        className="search"
      />
    </form>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
