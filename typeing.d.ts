export type nftdata ={
    token_id:string,
    metadata:any,
    name:string,
    symbol:string,
    token_address:string
    token_uri:string
}
export type locktoken = {
    id:string,
    token_uri:string
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