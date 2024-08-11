/* eslint-disable react/prop-types */
export default function SideBarTab({ onclick, children }) {
  return (
    <div className="w-full h-10 p-4 pr-20 flex gap-7 items-center text-sm text-white font-innterTight ml-3 hover:bg-highlight hover:rounded-lg hover:cursor-pointer"
    onClick={onclick}
    >
      {children}
    </div>
  );
}
