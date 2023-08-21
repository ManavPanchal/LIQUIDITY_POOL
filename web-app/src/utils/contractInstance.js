import { readContract, waitForTransaction, writeContract } from '@wagmi/core';

export const Contract = (address, abi) => {
  return {
    read: async (functionName, args = []) => {
      const data = await readContract({
        address,
        abi,
        functionName,
        args,
      });

      return data;
    },
    write: async (functionName, args = []) => {
      try {
        const { hash } = await writeContract({
          address,
          abi,
          functionName,
          args,
        });

        const result = await waitForTransaction({ hash });
        return result;
      } catch (error) {
        throw error;
      }
    },
  };
};
