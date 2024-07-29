/* eslint-disable react/prop-types */
export default function TagDisplay({children}){
    return <div className="h-8 bg-[#272727] w-fit p-3 shrink-0 flex justify-center items-center text-white rounded-lg hover:bg-[#525252] cursor-pointer">
        {children}
    </div>;
}