export type conditionsType = { $and: { name: { $regex: string; }; }[]; } | { $and?: undefined; }

export type char = {
    name: string,
    localSpecialtyId: number,
    enemyMaterialId: number,
    bossMaterialId: number,
    stoneTypeId: number,
    talentMaterialId: number,
    weekBossMaterialId: number,
    pathId?:number,
    img: string,
    weaponId: number,
    region: number,
    sex: number,
    stars: number,
    size: number,
    charInfo?: any
}
export type newChar = {
    id: number
} & char
export type updateChar = {
    id: number
    s1: string,
    s2: string,
    s3: string,
    s4: string,
    spec: string,
    emat1: string,
    emat2: string,
    emat3: string,
    ematT1: string,
    ematT2: string,
    ematT3: string,
    bmat: string,
    tal1: string,
    tal2: string,
    tal3: string,
    wbmat: string
}
export type weaponType = {
    name: string,
    img: string,
    enemyWeaponMaterialId: number,
    enemyMaterialId: number,
    weaponMaterialId: number,
    weaponId: number,
    stars: number,
}
export type newWeapon = {
    id: number
} & weaponType

export type updateWeapon = {
    id: number
    emat1: string,
    emat2: string,
    emat3: string,
    ewmat1: string,
    ewmat2: string,
    ewmat3: string,
    wmat1: string,
    wmat2: string,
    wmat3: string,
    wmat4: string,
}
export type rollType = {
    year: number,
    month: number,
    day: number,
    isChar: boolean,
    rewardId: number,
    rewardName: string,
    stars: number,
    img: string
}
export type newRollType = {
    id: number
} & rollType
export type updateCharDataType = {
    id: number,
    ownWeaponId: number,
    recWeapons: string,
    recFiveStarWeaponId: number,
    recFourStarWeaponId: number,
    firstArtSetfirstHalfId: number,
    firstArtSetSecondHalfId: number,
    secondArtSetfirstHalfId: number,
    secondArtSetSecondHalfId: number,
    thirdArtSetfirstHalfId: number,
    thirdArtSetSecondHalfId: number,
    firstPlanarSetId: number,
    secondPlanarSetId: number,
    thirdPlanarSetId: number,
    firstArtProp: string
    secondArtProp: string
    thirdArtProp: string
    fourthArtProp: string
    charProps: string,
    firstTeam: string,
    secondTeam: string,
    thirdTeam: string,
    firstPatch: number,
    lastPatch: number,
    patchCounter: number,
    info: string
}
export type updateWeaponDataType = {
    id: number,
    info: string,
    attack: string,
    def: string,
    hp: string,
    prop: string,
    propValue: string,
    effect: string,
}