import './App.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import axios from 'axios';
import { ThemeContext } from './App';

function Advice() {
  const darkTheme = useContext(ThemeContext)
  const [advice,setAdvice] = useState()
  const [id,setId] = useState();
  const adviceIdRef = useRef();

  // const [input,setInput] =useState();

  // const schema = yup.object().shape({
  //   adviceid : yup.number().min(1)
  // })
  // const {register,handleSubmit,formState : {errors},reset} = useForm({resolver:yupResolver(schema)})

useEffect(()=>{
  fetchAdvice();
},[])

  const fetchAdvice = async() =>{
    const response = await axios.get("https://api.adviceslip.com/advice")
    setAdvice(response.data.slip.advice)
    setId(response.data.slip.id)
  }
  
 

  const fetchAdviceId = (e)=>{
    e.preventDefault();
    let slipId = adviceIdRef.current.value ;

    if(slipId.trim()){
      const fetchSearch = async ()=>{
        try{
          const response = await axios.get(`https://api.adviceslip.com/advice/${slipId}`)
          setAdvice(response.data.slip.advice)
          console.log(response.data.slip.advice);
          setId(response.data.slip.id)
          
        }
        catch(error){
          console.log(error);
        }
      }
      fetchSearch();
    }else{
      fetchAdvice();
    }
    
  } 
  console.log(darkTheme);
  return (
    <div className={darkTheme? "dark_App":"App"}>
        <div className={darkTheme? "dark_search":"search"}>
          <form onSubmit={(e)=> fetchAdviceId(e)}>
          <input placeholder='Enter Upto 3 Digits' type='num' name='adviceid' autoComplete='off'   ref={adviceIdRef} />
          </form>
        </div>


     
            <div className={darkTheme? "dark_box": "box"}>

            <div className={darkTheme? "dark_upper":"upper"}>Advice #{id}</div>
            <div className="middle">
            <div className="quotes"><h3>{advice}</h3></div>
            <div className={darkTheme? "dark_pattern":"pattern"}>
              
            </div>
              </div>


            <div className={darkTheme?"dark_lower":"lower"}>
              <button onClick={fetchAdvice}><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="#202733"/></svg></button>
            </div>
            </div>
    </div>
    
  )
}

export default Advice