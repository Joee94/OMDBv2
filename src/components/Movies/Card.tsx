import { Result } from "@/types/api";
import missingPoster from "./missingPoster.png";

interface Props {
  value: Result;
  open: boolean;
  setOpen(): void;
}

export const Card = ({ value, open, setOpen }: Props) => {
  return (
    <button className={"cardButton"} onClick={setOpen}>
      <div className={`wrapper${open ? " open" : ""}`}>
        {value.Poster === "N/A" && <caption>Missing Poster</caption>}
        <img
          src={value.Poster === "N/A" ? missingPoster : value.Poster}
          alt={`${value.Title} - ${value.Year} poster`}
        />
      </div>
      <div className="info">
        <div>{value.Title}</div>
        <div>{value.Year}</div>
      </div>
    </button>
  );
};
