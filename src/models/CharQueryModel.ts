export type CharQueryModel = {
   /**
    * @query char name
    */
   name?: string,
   /**
* @query elem limit
*/
   limit?: string,
   /**
* @query page
*/
   page?: string,
   localSpecialtyId?: number,
   enemyMaterialId?: number,
   bossMaterialId?: number,
   stoneTypeId?: number,
   talentMaterialId?: number,
   weekBossMaterialId?: number,
   weaponId?:number,
   region?:number,
   sex?:number,
   stars?:number,
   size?:number
}