import { useCallback, useEffect, useMemo, useState } from "react"

const useTokens = (initialToken) =>{
    const [tokens, setTokens] =  useState(initialToken);

    useEffect(()=>{console.log(tokens);},[tokens])

    const token1 = {
        name:useMemo(()=> tokens.token1?.name,[tokens.token1?.name]),
        address: useMemo(() => tokens.token1?.address,[tokens.token1?.address]),
        balance: useMemo(() => tokens.token1?.balance,[tokens.token1?.balance]),
        amount: useMemo(() => tokens.token1?.amount,[tokens.token1?.amount]),
        logo:useMemo(() => tokens.token1?.logo,[tokens.token1?.logo]),
        isSelected: useMemo(()=> tokens.token1?.isSelected,[tokens.token1?.isSelected]),
        select : useCallback(() =>{
            setTokens( prevVal => { return {token1:{...prevVal.token1, isSelected:true}, token2:{...prevVal.token2, isSelected:false}}})
        },[]),
        setName: useCallback((name)=>{
            setTokens( prevVal => { return {...prevVal,token1:{...prevVal.token1, name}}})
        },[]),
        setAddress: useCallback((address)=>{
            setTokens( prevVal => { return {...prevVal,token1:{...prevVal.token1, address}}})
        },[]),
        setBalance : useCallback((balance)=>{
            setTokens( prevVal => { return {...prevVal,token1:{...prevVal.token1, balance}}})
        },[]),
        setLogo: useCallback((logo) =>{
            setTokens( prevVal => { return {...prevVal,token1:{...prevVal.token1, logo}}})
        },[]),
        setAmount: useCallback((amount) =>{
            setTokens( prevVal => { return {...prevVal,token1:{...prevVal.token1, amount}}})
        },[])
    }

    const token2 = {
        name:useMemo(()=> tokens.token2?.name,[tokens.token2?.name]),
        address: useMemo(()=> tokens.token2?.address,[tokens.token2?.address]),
        balance: useMemo(()=> tokens.token2?.balance,[tokens.token2?.balance]),
        amount: useMemo(()=> tokens.token2?.amount,[tokens.token2?.amount]),
        logo:useMemo(()=> tokens.token2?.logo,[tokens.token2?.logo]),
        isSelected: useMemo(()=> tokens.token2?.isSelected,[tokens.token2?.isSelected]),
        select : useCallback(() =>{
            setTokens( prevVal => { return {token2:{...prevVal.token2, isSelected:true}, token1:{...prevVal.token1, isSelected:false}}})
        },[]),
        setName: useCallback((name)=>{
            setTokens( prevVal => { return {...prevVal,token2:{...prevVal.token2, name}}})
        },[]),
        setAddress: useCallback((address)=>{
            setTokens( prevVal => { return {...prevVal,token2:{...prevVal.token2, address}}})
        },[]),
        setBalance : useCallback((balance)=>{
            setTokens( prevVal => { return {...prevVal,token2:{...prevVal.token2, balance}}})
        },[]),
        setLogo: useCallback((logo)=>{
            setTokens( prevVal => { return {...prevVal,token2:{...prevVal.token2, logo}}})
        },[]),
        setAmount: useCallback((amount) =>{
            setTokens( prevVal => { return {...prevVal,token2:{...prevVal.token2, amount}}})
        },[])
    }

    const pool = useMemo(()=>tokens.pool,[tokens.pool])

    const swapPair = () =>{
        setTokens({
            token1: { ...tokens.token2 },
            token2: { ...tokens.token1 },
        });
    }

    const setPoolId = (poolId) =>{
        setTokens( prevVal => { return {...prevVal, pool:{poolId}}})
    }

    const resetTokens = () =>{ setTokens(initialToken)}

    return {
        token1,
        token2,
        swapPair,
        resetTokens,
        pool,
        setPoolId
    }

}

export default useTokens;