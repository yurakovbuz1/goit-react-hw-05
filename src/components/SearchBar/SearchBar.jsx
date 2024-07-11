import { useRef } from "react";
import css from './SearchBar.module.css'
import toast, { Toaster } from "react-hot-toast";
// import { useSearchParams } from "react-router-dom";

const SearchBar = ({ onSubmit }) => {
    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputRef.current.value) {
            toast.error("Search term is empty");
        } else {
            onSubmit(inputRef.current.value);
        }
    }

    return (<>
        <header>
            <div><Toaster position="top-left"/></div>
            <form onSubmit={handleSubmit} className={css.form}>
                <label htmlFor="searchField" className={css.searchLabel}>Search movies by query</label>
                <div>
                    <input
                        type="text"
                        ref={inputRef}
                        className={css.searchField}
                        id="searchField"
                    />
                        <button type="submit" className={css.searchButton}>Search</button>
                </div>
            </form>
        </header>

    </>);
}

export default SearchBar;