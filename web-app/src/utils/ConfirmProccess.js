import { pools } from "./constants";
import lptInstance from "./lptInstance";
import poolInstance from "./poolInstance";
import SwappingInstance from "./swappingInstance";
import tokensInstance from "./tokensInstance";
export const confirmProccess = async(tokens,from, setAllowanceWaiting, setTransactionFlag, setConfirmTransactionToggle)=>{
    try {
        console.log(tokens,from, setAllowanceWaiting, setTransactionFlag, setConfirmTransactionToggle);
        const { contract: poolContract } = await poolInstance();
        if(!(from === "RemoveLiquidity")){
            let { contract: token1Contract, signerAddress } = await tokensInstance(tokens.token1?.address);
            let token1Allowance = await token1Contract.allowance(signerAddress, process.env.REACT_APP_LIQUIDITY_CONTRACT);
            if((Number(token1Allowance)/(10**18)) < tokens?.token1Amount){
                const tx = await token1Contract.approve(process.env.REACT_APP_LIQUIDITY_CONTRACT, `${(tokens?.token1Amount)*(10**18)}`)
                setAllowanceWaiting(true)
                await tx.wait();
                setAllowanceWaiting(false);
                token1Allowance = await token1Contract.allowance(signerAddress, process.env.REACT_APP_LIQUIDITY_CONTRACT);
            }
            if(from === "AddLiquidity"){
                const { contract: tokenContract, signerAddress } = await tokensInstance(tokens.token2?.address);
                let token2Allowance = await tokenContract.allowance(signerAddress, process.env.REACT_APP_LIQUIDITY_CONTRACT);
                if((Number(token2Allowance)/(10**18)) < tokens?.token2Amount){
                    const tx = await tokenContract.approve(process.env.REACT_APP_LIQUIDITY_CONTRACT, `${(tokens?.token2Amount)*(10**18)}`)
                    setAllowanceWaiting(true)
                    await tx.wait();
                    setAllowanceWaiting(false);
                    token2Allowance = await tokenContract.allowance(signerAddress, process.env.REACT_APP_LIQUIDITY_CONTRACT);
                }
                if((Number(token1Allowance)/(10**18)) >= tokens?.token1Amount && (Number(token2Allowance)/(10**18)) >= tokens?.token2Amount){
                    setTransactionFlag(true);
                    const tx = await poolContract.addLiquidity(tokens.pool?.poolId, `${tokens?.token1Amount * (10**18)}`, `${tokens?.token2Amount * (10**18)}`);
                    await tx.wait();
                    setConfirmTransactionToggle(false);
                }else {
                    alert("please give sufficient Allowance");
                    confirmProccess()
                }
            }
            else{
                if((Number(token1Allowance)/(10**18)) >= tokens?.token1Amount){
                    setTransactionFlag(true);
                    await SwappingInstance(tokens);
                    setConfirmTransactionToggle(false);
                }else {
                    alert("please give sufficient Allowance");
                    confirmProccess()
                }
            }
        }else{
            const { contract : LPTContract, signerAddress} = await lptInstance(
                pools[tokens.pool?.poolId].LPTAddress,
            );
            let LPTAllowance = await LPTContract.allowance(signerAddress, process.env.REACT_APP_LIQUIDITY_CONTRACT);
            if((Number(LPTAllowance)/(10**18)) < tokens?.LPTAmount){
                const tx = await LPTContract.approve('0x644ee3a7780593C480E4c072A415Dd4034544A95',`${tokens?.LPTAmount * (10**18)}`,);
                setAllowanceWaiting(true)
                await tx.wait();
                setAllowanceWaiting(false);
                LPTAllowance = await LPTContract.allowance(signerAddress, process.env.REACT_APP_LIQUIDITY_CONTRACT);
            }
            if((Number(LPTAllowance)/(10**18)) >= tokens?.LPTAmount){
                setTransactionFlag(true);
                const tx = await poolContract.removeLiquidity(tokens.pool?.poolId, `${tokens?.LPTAmount * (10**18)}`);
                await tx.wait();
                setConfirmTransactionToggle(false);
            }else {
                alert("please give sufficient Allowance");
                confirmProccess()
            }
        }

    } catch (error) {
        console.log("inner"+error);
    }
}