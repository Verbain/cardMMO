const db = require('../../db/db');
const charactersStuffService = require('../services/charactersStuffService');

class charactersStuffController{
    async getBonusFromStuff(req,res, playerID){
        playerID = req.params.playerId
        const bonusStuff = {
            for : 0,
            intel : 0,
            dex : 0,
            const : 0,
            vit : 0,
            hp : 0,
            dmg_max: 0,
            dmg_min: 0,
            weapon_test: null,
            effect: null
        }
        try {
            await db.select().table('characters').where({id_user:playerID}).first().then(async (stuffID)=>{
                await db.select().table('characters_stuff').where({id: stuffID.id_characters_stuff}).first().then(async (ret)=>{
                await db.select().table('items').where({id: ret.head}).first().then(async (stats_head)=>{
                        if(stats_head){
                            bonusStuff.for = bonusStuff.for + stats_head.bonus_for;
                            bonusStuff.intel = bonusStuff.intel + stats_head.bonus_intel;
                            bonusStuff.dex = bonusStuff.dex + stats_head.bonus_dex;
                            bonusStuff.const = bonusStuff.const + stats_head.bonus_const;
                            bonusStuff.vit = bonusStuff.vit + stats_head.bonus_vit;
                            bonusStuff.hp = bonusStuff.hp + stats_head.bonus_hp;
                        }
                    await db.select().table('items').where({id : ret.chest}).first().then(async (stats_chest)=>{
                            if(stats_chest){
                                bonusStuff.for = bonusStuff.for + stats_chest.bonus_for;
                                bonusStuff.intel = bonusStuff.intel + stats_chest.bonus_intel;
                                bonusStuff.dex = bonusStuff.dex + stats_chest.bonus_dex;
                                bonusStuff.const = bonusStuff.const + stats_chest.bonus_const;
                                bonusStuff.vit = bonusStuff.vit + stats_chest.bonus_vit;
                                bonusStuff.hp = bonusStuff.hp + stats_chest.bonus_hp;
                            }
                            await db.select().table('items').where({id : ret.shoulders}).first().then(async (stats_shoulders)=>{
                                    if(stats_shoulders){
                                        bonusStuff.for = bonusStuff.for + stats_shoulders.bonus_for;
                                        bonusStuff.intel = bonusStuff.intel + stats_shoulders.bonus_intel;
                                        bonusStuff.dex = bonusStuff.dex + stats_shoulders.bonus_dex;
                                        bonusStuff.const = bonusStuff.const + stats_shoulders.bonus_const;
                                        bonusStuff.vit = bonusStuff.vit + stats_shoulders.bonus_vit;
                                        bonusStuff.hp = bonusStuff.hp + stats_shoulders.bonus_hp;
                                    }
                                await db.select().table('items').where({id : ret.wrist}).first().then(async (stats_wrist)=>{
                                        if(stats_wrist){
                                            bonusStuff.for = bonusStuff.for + stats_wrist.bonus_for;
                                            bonusStuff.intel = bonusStuff.intel + stats_wrist.bonus_intel;
                                            bonusStuff.dex = bonusStuff.dex + stats_wrist.bonus_dex;
                                            bonusStuff.const = bonusStuff.const + stats_wrist.bonus_const;
                                            bonusStuff.vit = bonusStuff.vit + stats_wrist.bonus_vit;
                                            bonusStuff.hp = bonusStuff.hp + stats_wrist.bonus_hp;
                                        }
                                    await db.select().table('items').where({id : ret.hands}).first().then(async (stats_hands)=>{
                                            if(stats_hands){
                                                bonusStuff.for = bonusStuff.for + stats_hands.bonus_for;
                                                bonusStuff.intel = bonusStuff.intel + stats_hands.bonus_intel;
                                                bonusStuff.dex = bonusStuff.dex + stats_hands.bonus_dex;
                                                bonusStuff.const = bonusStuff.const + stats_hands.bonus_const;
                                                bonusStuff.vit = bonusStuff.vit + stats_hands.bonus_vit;
                                                bonusStuff.hp = bonusStuff.hp + stats_hands.bonus_hp;
                                            }
                                        await db.select().table('items').where({id : ret.waist}).first().then(async (stats_waist)=>{
                                                if(stats_waist){
                                                    bonusStuff.for = bonusStuff.for + stats_waist.bonus_for;
                                                    bonusStuff.intel = bonusStuff.intel + stats_waist.bonus_intel;
                                                    bonusStuff.dex = bonusStuff.dex + stats_waist.bonus_dex;
                                                    bonusStuff.const = bonusStuff.const + stats_waist.bonus_const;
                                                    bonusStuff.vit = bonusStuff.vit + stats_waist.bonus_vit;
                                                    bonusStuff.hp = bonusStuff.hp + stats_waist.bonus_hp;
                                                }
                                            await db.select().table('items').where({id : ret.legs}).first().then(async (stats_legs)=>{
                                                    if(stats_legs){
                                                        bonusStuff.for = bonusStuff.for + stats_legs.bonus_for;
                                                        bonusStuff.intel = bonusStuff.intel + stats_legs.bonus_intel;
                                                        bonusStuff.dex = bonusStuff.dex + stats_legs.bonus_dex;
                                                        bonusStuff.const = bonusStuff.const + stats_legs.bonus_const;
                                                        bonusStuff.vit = bonusStuff.vit + stats_legs.bonus_vit;
                                                        bonusStuff.hp = bonusStuff.hp + stats_legs.bonus_hp;
                                                    }
                                                await db.select().table('items').where({id : ret.feet}).first().then(async (stats_feet)=>{
                                                        if(stats_feet){
                                                            bonusStuff.for = bonusStuff.for + stats_feet.bonus_for;
                                                            bonusStuff.intel = bonusStuff.intel + stats_feet.bonus_intel;
                                                            bonusStuff.dex = bonusStuff.dex + stats_feet.bonus_dex;
                                                            bonusStuff.const = bonusStuff.const + stats_feet.bonus_const;
                                                            bonusStuff.vit = bonusStuff.vit + stats_feet.bonus_vit;
                                                            bonusStuff.hp = bonusStuff.hp + stats_feet.bonus_hp;
                                                        }
                                                    await db.select().table('items').where({id : ret.back}).first().then(async (stats_back)=>{
                                                            if(stats_back){
                                                                bonusStuff.for = bonusStuff.for + stats_back.bonus_for;
                                                                bonusStuff.intel = bonusStuff.intel + stats_back.bonus_intel;
                                                                bonusStuff.dex = bonusStuff.dex + stats_back.bonus_dex;
                                                                bonusStuff.const = bonusStuff.const + stats_back.bonus_const;
                                                                bonusStuff.vit = bonusStuff.vit + stats_back.bonus_vit;
                                                                bonusStuff.hp = bonusStuff.hp + stats_back.bonus_hp;
                                                            }
                                                        await db.select().table('items').where({id : ret.rings}).first().then(async (stats_rings)=>{
                                                                if(stats_rings){
                                                                    bonusStuff.for = bonusStuff.for + stats_rings.bonus_for;
                                                                    bonusStuff.intel = bonusStuff.intel + stats_rings.bonus_intel;
                                                                    bonusStuff.dex = bonusStuff.dex + stats_rings.bonus_dex;
                                                                    bonusStuff.const = bonusStuff.const + stats_rings.bonus_const;
                                                                    bonusStuff.vit = bonusStuff.vit + stats_rings.bonus_vit;
                                                                    bonusStuff.hp = bonusStuff.hp + stats_rings.bonus_hp;
                                                                }
                                                            await db.select().table('items').where({id : ret.necklace}).first().then(async (stats_necklace)=>{
                                                                if (stats_necklace){
                                                                    bonusStuff.for = bonusStuff.for + stats_necklace.bonus_for;
                                                                    bonusStuff.intel = bonusStuff.intel + stats_necklace.bonus_intel;
                                                                    bonusStuff.dex = bonusStuff.dex + stats_necklace.bonus_dex;
                                                                    bonusStuff.const = bonusStuff.const + stats_necklace.bonus_const;
                                                                    bonusStuff.vit = bonusStuff.vit + stats_necklace.bonus_vit;
                                                                    bonusStuff.hp = bonusStuff.hp + stats_necklace.bonus_hp;
                                                                }
                                                                await db.select().table('items').where({id : ret.off_hand}).first().then(async (stats_off_hand) =>{
                                                                    if (stats_off_hand){
                                                                        bonusStuff.for = bonusStuff.for + stats_off_hand.bonus_for;
                                                                        bonusStuff.intel = bonusStuff.intel + stats_off_hand.bonus_intel;
                                                                        bonusStuff.dex = bonusStuff.dex + stats_off_hand.bonus_dex;
                                                                        bonusStuff.const = bonusStuff.const + stats_off_hand.bonus_const;
                                                                        bonusStuff.vit = bonusStuff.vit + stats_off_hand.bonus_vit;
                                                                        bonusStuff.hp = bonusStuff.hp + stats_off_hand.bonus_hp;
                                                                    }
                                                                    await db.select().table('weapons').where({id: ret.main_hand}).first().then((stats_main_hand) =>{
                                                                        if (stats_main_hand){
                                                                            bonusStuff.for = bonusStuff.for + stats_main_hand.bonus_for;
                                                                            bonusStuff.intel = bonusStuff.intel + stats_main_hand.bonus_intel;
                                                                            bonusStuff.dex = bonusStuff.dex + stats_main_hand.bonus_dex;
                                                                            bonusStuff.const = bonusStuff.const + stats_main_hand.bonus_const;
                                                                            bonusStuff.vit = bonusStuff.vit + stats_main_hand.bonus_vit;
                                                                            bonusStuff.hp = bonusStuff.hp + stats_main_hand.bonus_hp;
                                                                            bonusStuff.dmg_min = stats_main_hand.dmg_min;
                                                                            bonusStuff.dmg_max = stats_main_hand.dmg_max;
                                                                            bonusStuff.weapon_test = stats_main_hand.stat_test;
                                                                            bonusStuff.effect = stats_main_hand.effect;
                                                                        }
                                                                    })
                                                                    res.status(200).json({
                                                                        bonus_for: bonusStuff.for,
                                                                        bonus_intel: bonusStuff.intel,
                                                                        bonus_dex: bonusStuff.dex,
                                                                        bonus_const: bonusStuff.const,
                                                                        bonus_vit: bonusStuff.vit,
                                                                        bonus_hp: bonusStuff.hp,
                                                                        dmg_min: bonusStuff.dmg_min,
                                                                        dmg_max: bonusStuff.dmg_max,
                                                                        weapon_test : bonusStuff.weapon_test,
                                                                        effect: bonusStuff.effect
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            });
        } catch (err){
            console.log(err);
        }
    }
}

module.exports = new charactersStuffController();