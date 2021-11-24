import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import jwt_decode from "jwt-decode";
import axiosInstance from '../Utils/axios';


function FormCharacter() {

    const [str, setStr] = useState(5);
    const [intel, setIntel] = useState(5);
    const [constitution, setConstitution] = useState(5)
    const [dex, setDex] = useState(5)
    const [vit, setVit] = useState(5)
    const [capital, setCapital] = useState(20)
    const userId = jwt_decode(localStorage.getItem('accessToken')).id
    
    
    const Submit = (event) => {
    const data = {idUser:userId, cStr:str, cDex:dex, cIntel:intel, cVit:vit, cConst:constitution};
    event.preventDefault();
    axiosInstance.post('/api/newcharacters',data).then(function (response) {
        window.location = "http://localhost:3001"
    })
    .catch(function (error) {
        console.log(error);
    });
}

    const IncrementStr = () => {
        if(capital > 0){
            setStr(str + 1);
            setCapital (capital - 1 )
        } 
      }
    const DecreaseStr = () => {
        if(capital<20 && str >=5){
            setStr(str - 1);
            setCapital (capital + 1)
        }
      }
      const IncrementIntel = () => {
        if(capital > 0){
            setIntel(intel + 1);
            setCapital (capital - 1 )
        } 
      }
    const DecreaseIntel = () => {
        if(capital<20 && intel >=5){
            setIntel(intel - 1);
            setCapital (capital + 1)
        }
      }
      const IncrementConst = () => {
        if(capital > 0){
            setConstitution(constitution + 1);
            setCapital (capital - 1 )
        } 
      }
    const DecreaseConst = () => {
        if(capital<20 && constitution >=5){
            setConstitution(constitution - 1);
            setCapital (capital + 1)
        }
      }
      const IncrementVit = () => {
        if(capital > 0){
            setVit(vit + 1);
            setCapital (capital - 1 )
        } 
      }
    const DecreaseVit = () => {
        if(capital<20 && vit >=5){
            setVit(vit - 1);
            setCapital (capital + 1)
        }
      }
      const IncrementDex = () => {
        if(capital > 0){
            setDex(dex + 1);
            setCapital (capital - 1 )
        } 
      }
    const DecreaseDex = () => {
        if(capital<20 && dex >= 5){
            setDex(dex - 1);
            setCapital (capital + 1)
        }
      }

    return (
        <div className="Login">
            <Form onSubmit={Submit}>
            <Form.Group size="lg" controlId="email">
                <Form.Label>FORCE</Form.Label>
                <Button onClick={IncrementStr}>+ </Button>
                    {str}
                <Button onClick={DecreaseStr}> - </Button>
            </Form.Group>
            <Form.Group size="lg" controlId="email">
                <Form.Label>INTELLIGENCE</Form.Label>
                <Button onClick={IncrementIntel}>+ </Button>
                    {intel}
                <Button onClick={DecreaseIntel}> - </Button>
            </Form.Group>
            <Form.Group size="lg" controlId="email">
                <Form.Label>DEXTERITE</Form.Label>
                <Button onClick={IncrementDex}>+ </Button>
                    {dex}
                <Button onClick={DecreaseDex}> - </Button>
            </Form.Group>
            <Form.Group size="lg" controlId="email">
                <Form.Label>VITESSE</Form.Label>
                <Button onClick={IncrementVit}>+ </Button>
                    {vit}
                <Button onClick={DecreaseVit}> - </Button>
            </Form.Group>
            <Form.Group size="lg" controlId="email">
                <Form.Label>CONSTITUTION</Form.Label>
                <Button onClick={IncrementConst}>+ </Button>
                    {constitution}
                <Button onClick={DecreaseConst}> - </Button>
            </Form.Group>
            CAPITAL : {capital}
            
            <Button block size="lg" type="submit">
                Create Character
            </Button>
            </Form>
            
        </div>
    )
}

export default FormCharacter
