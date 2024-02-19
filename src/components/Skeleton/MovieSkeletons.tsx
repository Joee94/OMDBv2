import { Skeleton } from ".";

export const MovieSkeletons = ({ count = 10 }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <Skeleton key={index} width={320} height={120} component={"li"} />
  ));

  return <>{skeletons}</>;
};
