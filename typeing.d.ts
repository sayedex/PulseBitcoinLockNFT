export type nftdata ={
    token_id:string,
    metadata:any,
    name:string,
    symbol:string,
    token_address:string
    tokenUri:string
}
export type locktoken = {
    id:string,
    tokenUri:string
    token_id:string
}

export type userLockedNFT={
    id:string,
    locktoken:nftdata[]
    earn:number

}

export type Global = {
    totalstaked:any

}


export type HomeInfo = {
    burnPool:string,
    totalBurned:string,
    totalsupply:string
    totalstaked:string
}