import React, { useState, useEffect } from 'react';
import axiosInstance from '../Utils/axios'
import jwt_decode from "jwt-decode"
import FormCharacter from './FormCharacter';
function Character(props) {
    let userId = null;
    let pseudo = null;
    const[data, setData] = useState({stamina : null,lvl:null,str:null,dex:null,intel:null,vit:null,const:null,hp:null})
    const[character, setCharacter] = useState("")
    const[bonusStuff, setBonusStuff] = useState({bonus_for: null, bonus_intel:null,bonus_dex:null,bonus_const:null,bonus_vit:null,bonus_hp:null,dmg_min:null,dmg_max:null,effect:null,weapon_test:null})
    const[user,setUser] = useState({pseudo:null})
    if(localStorage.getItem('accessToken')){
         userId = jwt_decode(localStorage.getItem('accessToken')).id
    }

    useEffect(() => {
        if (userId === null) return

        const getData = async () => {
            await axiosInstance.get(`/api/character/`+userId).then((res) => {
                setData(res.data)
                if (!res.data){
                    setCharacter(false)
                } else {
                    setCharacter(true)
                }
            }).catch(err =>{
                console.log(err)
            });
    
            
            await axiosInstance.get(`/api/bonusStuff/`+userId).then((res) => {
                setBonusStuff(res.data)
            }).catch(err =>{
                console.log(err)
            });

            await axiosInstance.get(`/api/user/`+userId).then((res) => {
                setUser(res.data)
            }).catch(err =>{
                console.log(err)
            });

        }

        getData()
    }, [userId]);
    
    if(character){
        return (
            <div>
                <h1> WELCOME BACK {user.pseudo}</h1>
                <ul>
                    <li>stamina : {data.stamina}</li>
                    <li>level : {data.lvl} </li>
                    <li>Point de vie : {data.hp} + {bonusStuff.bonus_hp}</li>
                    <li>force : {data.str} + {bonusStuff.bonus_for}</li>
                    <li>dextérité : {data.dex} + {bonusStuff.bonus_dex}</li>
                    <li>intelligence : {data.intel} + {bonusStuff.bonus_intel}</li>
                    <li>constitution : {data.const} + {bonusStuff.bonus_const}</li>
                    <li>vitesse : {data.vit} + {bonusStuff.bonus_vit}</li>
                    <li>weapon damage : {bonusStuff.dmg_min} - {bonusStuff.dmg_max}</li>
                    <li>weapon test stat : {bonusStuff.weapon_test} </li>
                    <li>weapon effect : {bonusStuff.effect}</li>
                </ul>
            </div>
        )
    } else {
        return(<FormCharacter />)
    }

}

export default Character;
