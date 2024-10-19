import Divider from "@/components/common/Divider/Divider";
import HeaderTagLine from "@/components/common/HeaderTagLine/HeaderTagLine";
import styles from "./PageHeader.module.scss";

interface IPageHeaderProps {
  teamName?: string;
}

const PageHeader = (props: IPageHeaderProps) => {
  return (
    <header className={styles.pageHeader}>
      <HeaderTagLine teamName={props.teamName} isPageHeader={true} />
      <Divider />
    </header>
  );
};

export default PageHeader;
