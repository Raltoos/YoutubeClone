/* eslint-disable react/prop-types */
import TagDisplay from "./TagDisplay";

const ScrollableTagDisplay = ({translation}) => {
  return (
    <div
      style={{ transform: `translateX(-${translation}px)` }}
      className="h-12 w-full my-1 flex items-center gap-3 transition-all"
    >
      <TagDisplay>All</TagDisplay>
      <TagDisplay>Gaming</TagDisplay>
      <TagDisplay>Fomula 1</TagDisplay>
      <TagDisplay>Development</TagDisplay>
      <TagDisplay>Mixes</TagDisplay>
      <TagDisplay>Playlists</TagDisplay>
      <TagDisplay>Trackmania</TagDisplay>
      <TagDisplay>Comedy</TagDisplay>
      <TagDisplay>Anime</TagDisplay>
      <TagDisplay>Role-Playing Games</TagDisplay>
      <TagDisplay>Recently Uploaded</TagDisplay>
      <TagDisplay>Watched</TagDisplay>
      <TagDisplay>New to you</TagDisplay>
    </div>
  );
};

export default ScrollableTagDisplay;
