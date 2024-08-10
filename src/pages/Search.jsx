import SearchResultPage from "../components/SearchResult";
import Header from "../components/Header/Header";
import SideBarClosed from "../components/Sidebar/SideBarClosed";

const SearchPage = () => {
  return (
    <div className="w-screen h-screen bg-[#0f0f0f] font-sans flex flex-col items-center overflow-hidden">
      <Header className="fixed top-0" />
      <div className="flex w-full justify-between">
        <div>
          <SideBarClosed />
        </div>
        <div>
          <SearchResultPage />  
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
