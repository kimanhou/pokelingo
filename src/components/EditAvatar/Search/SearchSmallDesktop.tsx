import {
  ChangeEvent,
  FocusEvent,
  FC,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDebounce from "@/hooks/useDebounce";
import styles from "./SearchSmallDesktop.module.scss";

interface ISearchSmallDesktopProps {
  search: string;
  setSearch: (search: string) => void;
}

const SearchSmallDesktop: FC<ISearchSmallDesktopProps> = ({
  search,
  setSearch,
}: ISearchSmallDesktopProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [internalSearch, setInternalSearch] = useState(search);
  const [isShrinking, setIsShrinking] = useState(false);
  const isSearchingClassName = isSearching ? styles.isSearching : "";
  const isShrinkingClassName = isShrinking ? styles.isShrinking : "";

  const shrink = () => {
    setIsShrinking(true);
  };

  const onClickSearchBox = () => {
    if (!isSearching) {
      setIsSearching(true);
    }
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const onBlurInput = (e: FocusEvent<HTMLInputElement>) => {
    if (buttonRef.current?.contains(e.relatedTarget as Node)) {
      return;
    }

    if (!internalSearch) {
      shrink();
    }
  };

  const onBlurButton = (e: FocusEvent<HTMLButtonElement>) => {
    if (buttonRef.current?.contains(e.relatedTarget as Node)) {
      return;
    }

    if (!internalSearch) {
      shrink();
    }
  };

  const debouncedOnChange = useDebounce(
    useCallback(
      async (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [setSearch]
    )
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInternalSearch(e.target.value);
    debouncedOnChange(e);
  };

  useEffect(() => {
    const onTransitionEnd = () => {
      if (isShrinking && isSearching) {
        setIsShrinking(false);
        setIsSearching(false);
      }
    };
    buttonRef.current?.addEventListener("transitionend", onTransitionEnd);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      buttonRef.current?.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [isShrinking, isSearching]);

  return (
    <button
      ref={buttonRef}
      className={`${styles.searchSmallDesktop} ${isSearchingClassName} ${isShrinkingClassName}`}
      onClick={onClickSearchBox}
      onBlur={onBlurButton}
    >
      <FontAwesomeIcon icon={faSearch} color="var(--bg)" />
      {!isSearching && "Search"}
      <input
        ref={inputRef}
        type="text"
        value={internalSearch}
        onChange={onInputChange}
        onBlur={onBlurInput}
      />
    </button>
  );
};

export default SearchSmallDesktop;
