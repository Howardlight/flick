import MovieSVG from "../../../components/SVGComponents/MovieSVG";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="animate-pulse w-1/4">
        <MovieSVG />
      </div>
    </div>
  );
}
