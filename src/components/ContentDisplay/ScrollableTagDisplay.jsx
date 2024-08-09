/* eslint-disable react/prop-types */
import TagDisplay from "./TagDisplay";

const ScrollableTagDisplay = ({translation, handleLoadingBar}) => {
  return (
    <div
      style={{ transform: `translateX(-${translation}px)` }}
      className="h-12 w-full my-1 flex items-center gap-3 transition-all"
    >
      <TagDisplay loadinBar={handleLoadingBar}>All</TagDisplay>
      <TagDisplay loadinBar={handleLoadingBar}>Gaming</TagDisplay>
      <TagDisplay loadinBar={handleLoadingBar}>Fomula 1</TagDisplay>
      <TagDisplay loadinBar={handleLoadingBar}>Development</TagDisplay>
      <TagDisplay loadinBar={handleLoadingBar}>Mixes</TagDisplay>
      <TagDisplay loadinBar={handleLoadingBar}>Playlists</TagDisplay>
      <TagDisplay loadinBar={handleLoadingBar}>Trackmania</TagDisplay>
      <TagDisplay loadinBar={handleLoadingBar}>Comedy</TagDisplay>
      <TagDisplay loadinBar={handleLoadingBar}>Anime</TagDisplay>
      <TagDisplay loadinBar={handleLoadingBar}>Role-Playing Games</TagDisplay>
      <TagDisplay loadinBar={handleLoadingBar}>Recently Uploaded</TagDisplay>
      <TagDisplay loadinBar={handleLoadingBar}>Watched</TagDisplay>
      <TagDisplay loadinBar={handleLoadingBar}>New to you</TagDisplay>
    </div>
  );
};

export default ScrollableTagDisplay;
