import { ConnectKitButton } from "connectkit";

export const ExampleButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName }) => {
        return (
          <button className="px-6 py-2  rounded-2xl text-sm
          font-semibold bg-black dark:bg-black  text-white whitespace-nowrap" onClick={show} >
            {isConnected ? address?.slice(0,5)+"..."+ address?.slice(-3) : "Connect"}
          </button>
          
        );
      }}
    </ConnectKitButton.Custom>
  );
};


export const ConnectButtonwagmi= () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName }) => {
        return (
          <button className="px-6 py-4 mb-3 mt-3 border w-full rounded-2xl text-lg font-semibold bg-[#e8ae00] dark:bg-white dark:text-black text-white whitespace-nowrap" onClick={show} >
          Connect
          </button>
          
        );
      }}
    </ConnectKitButton.Custom>
  );
};