import { AiFillGithub } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import { BiHelpCircle } from "react-icons/bi";
import { bsc,bscTestnet ,mainnet} from "wagmi/chains";


//for eth u need to put mainnet only...

//chiand ID
export const chains = [mainnet];


// RPC
export const RPC_URL = 'https://eth-mainnet.g.alchemy.com/v2/pIJkI_T6lQ0_TZ9mw6DLakx0L_v3TdMT';
export const LogoLink =""

export const SocialItem = [
    {
        name: "Twitter",
        icon: AiOutlineTwitter,
        link:""
    },
    {
        name: "Telegram",
        icon: FaTelegramPlane,
        link:""
    },
   
]


export const HeaderItem = [
    {
        id: 0,
        name: "Buy",
        link: "",
    }, {
        id: 1,
        name: "Chart",
        link: "",
    }, {
        id: 2,
        name: "Etherscan",
        link: "",
    },
    {
        id: 3,
        name: "Bitcoin Royalty (NFT)",
        link: "",

    },

]

