import { useHistory } from "react-router-dom";
import notFoundCat from "../images/notFoundCat.png";

export const NotFoundPage = () => {
  const history = useHistory();

  return (
    <>
      <div className="not-found-cat">
        <img src={notFoundCat} alt="Not Found Cat" />
        <button
          className="not-found-button"
          onClick={() => history.push("/")}>Home</button>
      </div>

    </>
  );
};