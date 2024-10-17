import Spinner from "../_components/Spinner";

export default function loading() {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <Spinner />
      <span>Loading Data...</span>
    </div>
  );
}
