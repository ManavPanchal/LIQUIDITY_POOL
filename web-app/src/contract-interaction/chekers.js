import { toast } from 'react-toastify';
import { toastMessage } from '../toster';

export const checkOrSetApprovance = async (
  contract,
  owner = '0x',
  spender = '0x',
  allowance = 0,
  setLoader = () => {},
) => {
  try {
    let hasAllowanceOf = await contract.read('allowance', [owner, spender]);

    if (Number(hasAllowanceOf) < allowance) {
      setLoader(true);
      await contract.write('approve', [spender, allowance]);
      hasAllowanceOf = await contract.read('allowance', [owner, spender]);
      if (hasAllowanceOf < allowance)
        toastMessage('please give sufficient allowance', 'error');
      setLoader(false);
    }
  } catch (error) {
    throw error;
  }
};
