import { RiCloseCircleFill } from "react-icons/ri";

export const FolderSwitcher = ({ toogleShow }) => {
  const handleClose = () => {
    toogleShow(false);
  };
  const folders = [
    {
      name: "Default",
    },
    {
      name: "Hello",
    },
    {
      name: "World",
    },
  ];
  const preventPropagation = (e)=>{
    e.stopPropagation()
  }
  return (
    <div
      className="fixed top-0 left-0 FitPage bg-blackglass flex justify-center items-center z-50"
      onClick={handleClose}
    >
      <div className="bg-white h-4/5 w-2/4 rounded-xl" onClick={preventPropagation}>
        <div className="flex w-full p-5 h-[90px] justify-center items-center gap-3 border-b border-gray">
          <h3 className="text-title font-bold">Folders</h3>
          <input
            type="text"
            className="bg-gray-50 w-full h-full border border-gray text-black text-subititle rounded-lg focus:ring-green focus:border-green outline-none block p-2.5"
            placeholder="Type to add a new task."
            required
          />
        </div>
        <div className="min-h-[300px] p-5">
          <div className="flex flex-col">
            {folders.map((each) => {
              return (
                <div className="flex items-center w-full justify-between px-3 h-12">
                  <p>{each.name}</p>
                  <div className="flex gap-1">
                    <div className="bg-green px-3 rounded-3xl">
                      <p className="text-white text-content">Selected</p>
                    </div>
                    <RiCloseCircleFill className="text-title text-gray cursor-pointer" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
