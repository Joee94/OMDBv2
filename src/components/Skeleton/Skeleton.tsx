import "./skeleton.css";

interface Props {
  width: string | number;
  height: string | number;
  component: keyof JSX.IntrinsicElements;
}

export const Skeleton = ({ width, height, component: Component }: Props) => {
  return <Component style={{ width, height }} className="skeleton" />;
};
