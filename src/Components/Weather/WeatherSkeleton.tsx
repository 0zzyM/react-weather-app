import "./Weather.css";

const WeatherSkeleton = () => {
  return (
    <div className="resultContainer skeleton">
      <div className="skeleton-icon" />
      <div className="skeleton-line wide" />
      <div className="skeleton-line medium" />
      <div className="skeleton-line narrow" />
      <div className="skeleton-extra">
        <div className="skeleton-line narrow" />
        <div className="skeleton-line narrow" />
      </div>
    </div>
  );
};

export default WeatherSkeleton;
