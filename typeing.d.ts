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
    burnPool:any,
    totalBurned:any,
    totalharvest:any,
    totalsupply:any

}