import { Result } from "@/types/api";

interface Props {
  value: Result;
  open: boolean;
  setOpen(): void;
}

export const Card = ({ value, open, setOpen }: Props) => {
  return (
    <button className={"cardButton"} onClick={setOpen}>
      <div className={`wrapper${open ? " open" : ""}`}>
        <img src={value.Poster} alt={`${value.Title} - ${value.Year} poster`} />
      </div>
      <div className="info">
        <div>{value.Title}</div>
        <div>{value.Year}</div>
      </div>
    </button>
  );
};
