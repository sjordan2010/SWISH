export default function Spinner() {
    return (
      <div className="absolute top-52 left-1/2">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
        <span className="relative">Loading...</span>
      </div>
    );
  }