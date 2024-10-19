import { ChangeEvent, FC, useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useDebounce from "@/hooks/useDebounce";
import styles from "./Search.module.scss";

interface ISearchProps {
  search: string;
  setSearch: (search: string) => void;
  mainColor: string;
}

const Search: FC<ISearchProps> = (props) => {
  const DEFAULT_PLACEHOLDER = "Search by name or id...";
  const [placeholder, setPlaceholder] = useState(DEFAULT_PLACEHOLDER);
  const [isSearching, setIsSearching] = useState(false);
  const [internalSearch, setInternalSearch] = useState("");

  const isSearchingClassName = isSearching ? styles.isSearching : "";
  const mainColorClassName = `color-${props.mainColor.slice(1).toLowerCase()}`;

  const onClickSearchBox = () => {
    setIsSearching(true);
  };

  const onBlurSearchBox = () => {
    setIsSearching(false);
  };

  const debouncedOnChange = useDebounce(
    useCallback(
      async (e: ChangeEvent<HTMLInputElement>) => {
        props.setSearch(e.target.value);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [props.setSearch]
    )
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInternalSearch(e.target.value);
    debouncedOnChange(e);
  };

  return (
    <div
      className={`${styles.searchBox} ${isSearchingClassName}`}
      onClick={onClickSearchBox}
      onBlur={onBlurSearchBox}
    >
      <div className={styles.searchIcon}>
        <FontAwesomeIcon icon={faSearch} color={props.mainColor} />
      </div>
      <input
        type="text"
        value={internalSearch}
        onChange={onInputChange}
        placeholder={placeholder}
        onClick={() => setPlaceholder("")}
        onBlur={() => setPlaceholder(DEFAULT_PLACEHOLDER)}
        style={{ color: props.mainColor }}
        className={styles[mainColorClassName]}
      />
      <svg
        className={styles.searchBorder}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 671 111"
        xmlSpace="preserve"
      >
        <path
          className={styles.border}
          d="M335.5,108.5h-280c-29.3,0-53-23.7-53-53v0c0-29.3,23.7-53,53-53h280"
          stroke={props.mainColor}
        />
        <path
          className={styles.border}
          d="M335.5,108.5h280c29.3,0,53-23.7,53-53v0c0-29.3-23.7-53-53-53h-280"
          stroke={props.mainColor}
        />
      </svg>
    </div>
  );
};

export default Search;
