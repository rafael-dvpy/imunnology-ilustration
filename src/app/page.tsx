import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex-col">
        <div className="bg-slate-500 w-screen h-14"></div>
        <div className="bg-slate-100 w-screen h-6"></div>
      </div>
      <div className="flex">
        <div className="bg-gray-600 h-screen w-16"></div>
        <div className="bg-gray-500 h-screen w-80">
          <div className="bg-gray-300 h-14 w-80 flex justify-center">
            <div className="bg-white border-black rounded-sm w-72 h-12 my-auto"></div>
          </div>
        </div>
        <div className="bg-slate-400 w-screen h-screen">
          <div className="bg-white w-10/12 h-5/6 my-auto mx-auto"></div>
        </div>
      </div>
    </main>
  );
}
