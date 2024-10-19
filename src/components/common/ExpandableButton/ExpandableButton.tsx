import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./ExpandableButton.module.scss";

interface IExpandableButtonProps {
  header: string;
  children: any;
}

const ExpandableButton: FC<IExpandableButtonProps> = ({
  header,
  children,
}: IExpandableButtonProps) => {
  const [isExpanded, setIsExpandable] = useState<boolean>(false);
  const [height, setHeight] = useState<number | undefined>(
    isExpanded ? undefined : 0
  );
  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    if (!isExpanded) {
      setIsExpandable(true);
    }
  };

  useEffect(() => {
    if (!height || !isExpanded || !ref.current) return undefined;

    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height + 8);
    });
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [height, isExpanded]);

  useEffect(() => {
    if (isExpanded) {
      setHeight(ref.current?.getBoundingClientRect().height);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  return (
    <div
      className={`${styles.expandableButton} ${isExpanded ? styles.expanded : ""}`}
      onClick={onClick}
    >
      <button className={styles.header}>{header}</button>
      <div className={styles.content} style={{ height }}>
        <div ref={ref} className={styles.contentInner}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ExpandableButton;
