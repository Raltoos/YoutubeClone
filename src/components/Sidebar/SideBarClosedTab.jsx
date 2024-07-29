/* eslint-disable react/prop-types */
export default function SideBarClosedTab({ children }) {
    return (
      <div className="w-13 h-30 p-2 mb-3 flex flex-col gap-3 items-center justify-center text-xs text-white font-innterTight hover:bg-highlight hover:rounded-md hover:cursor-pointer">
        {children}
      </div>
    );
  }