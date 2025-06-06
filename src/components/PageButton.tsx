import "../styles/PageButton.css";
type Props = {
  nextUrl?: string;
  previousUrl?: string;
  onChangeNextPage: () => void;
  onChangePreviousPage: () => void;
};
const PageButton = (props: Props) => {
  return (
    <div className="page-button">
      <button onClick={props.onChangePreviousPage}>前へ</button>
      <button onClick={props.onChangeNextPage}>次へ</button>
    </div>
  );
};
export default PageButton;
