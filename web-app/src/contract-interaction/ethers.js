import {readContract, writeContract, waitForTransaction} from "@wagmi/core"

export const contract = (address, abi) =>{
    return {
        read: async (functionName, args = [])=>{
            const response = await readContract({
                address,
                abi,
                functionName,
                args
            })
            return response
        },
        write: async(functionName, args=[])=>{
            const {hash} = await writeContract({
                address,
                abi,
                functionName,
                args
            })
            return await waitForTransaction({hash});
        }
    }
}