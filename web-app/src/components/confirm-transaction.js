import { useContext, useEffect, useState } from 'react';
import 'react-dots-loader/index.css';
import { ethLogo } from '../images/images';
import { ThreeDots } from 'react-loader-spinner';
import TradeCalculations from './trade-calculation';
import { confirmProccess } from '../utils/ConfirmProccess';
import walletInstance from '../utils/walletInstance';
import { ethers } from 'ethers';
import { AppContext } from '../App';
import { writeContract } from '@wagmi/core';
import { tokenABI } from '../utils/constants';

const ConfirmTransaction = ({ setConfirmTransactionToggle, tokens, from }) => {
  const [waitingForAllowance, setAllowanceWaiting] = useState(false);
  const [reviewPageFlag, setReviewFlag] = useState(true);
  const [startTransactionFlag, setTransactionFlag] = useState(false);
  const [removableTokens, setRemovableTokens] = useState();
  const [fetchingClaimableBalance, setBalanceFetching] = useState(false);
  const { setConfirmTransactionFlag } = useContext(AppContext);

  const getclaimableLiquidity = async () => {
    try {
      setBalanceFetching(true);
      const { networkId } = await walletInstance();
      const reqBody = {
        poolId: tokens.pool?.poolId,
        providedLPT: ethers.utils.parseEther(tokens?.LPTAmount),
        networkId,
      };
      console.log(reqBody);
      const removableTokensresponse = await fetch('/api/getRemovableTokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      });
      const response = await removableTokensresponse.json();
      setRemovableTokens(response);
      setBalanceFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (from === 'RemoveLiquidity') {
      getclaimableLiquidity();
    }
  }, []);

  return (
    <div
      className="token_selector_container h-screen w-screen bg-slate-600 bg-opacity-50 absolute top-0"
      onClick={() => setConfirmTransactionToggle(false)}
    >
      <div
        className="main absolute pb-5 p-4 md:p-3 sm:top-1/2 left-1/2 bottom-0 -translate-x-1/2 sm:-translate-y-1/2 bg-uni-dim-white w-[400px] sm:rounded-3xl rounded-t-3xl max-h-fit overflow-hidden "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {reviewPageFlag ? (
          <>
            <div className="heading flex justify-between p-3">
              <span className="font-medium">
                Review {from === 'SwapUI' && 'a Swap'}
              </span>
              <button onClick={() => setConfirmTransactionToggle(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="tokens_review p-2 flex flex-col gap-3">
              <div className="token1_review">
                <p> You Pay </p>
                <div className="flex justify-between items-center">
                  <span className="text-4xl text-black font-medium">
                    {from === 'RemoveLiquidity' ? (
                      <>{tokens?.LPTAmount} LPT</>
                    ) : (
                      <>
                        {Number(tokens?.token1.amount).toFixed(2)}{' '}
                        <span>{tokens.token1?.name}</span>
                      </>
                    )}
                  </span>
                  <img src={ethLogo} alt="" className="w-7" />
                </div>
              </div>
              {
                <div className="token2_review">
                  <p>
                    {from === 'SwapUI' || from === 'RemoveLiquidity' ? (
                      <>You receive </>
                    ) : (
                      <>You Pay</>
                    )}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-4xl text-black font-medium">
                      {!(from === 'RemoveLiquidity') ? (
                        <>
                          {Number(tokens?.token2.amount).toFixed(2)}{' '}
                          <span>{tokens.token2?.name}</span>
                        </>
                      ) : (
                        <>
                          <span
                            className={`flex gap-3 items-center ${
                              fetchingClaimableBalance && 'animate-pulse'
                            }`}
                          >
                            <img src={ethLogo} alt="" className="w-7" />
                            <span className="text-center text-3xl">
                              {removableTokens?.withdrawableToken1?.toFixed(4)}
                              <span> {tokens.token1?.name}</span>
                            </span>
                          </span>
                          <span> + </span>
                          <span
                            className={`flex gap-3 items-center ${
                              fetchingClaimableBalance && 'animate-pulse'
                            }`}
                          >
                            <img src={ethLogo} alt="" className="w-7" />
                            <span className="text-center text-3xl">
                              {removableTokens?.withdrawableToken2?.toFixed(4)}
                              <span> {tokens.token2?.name}</span>
                            </span>
                          </span>
                        </>
                      )}
                    </span>
                    {!(from === 'RemoveLiquidity') && (
                      <img src={ethLogo} alt="" className="w-7" />
                    )}
                  </div>
                </div>
              }
            </div>
            {from === 'SwapUI' && (
              <TradeCalculations
                token1={{
                  name: tokens.token1?.name,
                  amount: tokens?.token1.amount,
                }}
                token2={{
                  name: tokens.token2?.name,
                  amount: tokens?.token2.amount,
                }}
                review={true}
              />
            )}
            <div
              className={`confirm_btn w-full ${
                fetchingClaimableBalance && 'animate-pulse'
              }`}
              onClick={() => {
                if (!fetchingClaimableBalance) {
                  setReviewFlag(false);
                  (async () => {
                    await writeContract({
                      address: tokens.token1?.address,
                      abi: tokenABI,
                      functionName: 'approve',
                      args: [
                        process.env.REACT_APP_LIQUIDITY_CONTRACT,
                        ethers.utils.parseEther(tokens?.token1.amount),
                      ],
                    });
                  })();
                  // confirmProccess(tokens, from, setAllowanceWaiting, setTransactionFlag, setConfirmTransactionToggle, setConfirmTransactionFlag)
                }
              }}
            >
              <button className="bg-uni-dark-pink text-uni-dim-white text-xl w-full text-center p-3 font-medium rounded-2xl mt-3">
                Confirm {from === 'SwapUI' ? 'Swap' : 'Transaction '}
              </button>
            </div>
          </>
        ) : !startTransactionFlag ? (
          <>
            <div className="heading flex justify-end p-3">
              <button onClick={() => setConfirmTransactionToggle(false)}>
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
            <div>
              <div className="flex flex-col justify-center items-center p-5 break-words gap-2">
                {waitingForAllowance ? (
                  <>
                    <ThreeDots
                      height="80"
                      width="80"
                      radius="9"
                      color="black"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                    />
                    <span className="text-xl text-black text-center w-3/4">
                      Waiting for transaction to be confirmed
                    </span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-5xl text-uni-dark-pink">
                      order_approve
                    </span>
                    <span className="text-xl text-black text-center w-3/4">
                      {' '}
                      Enable spending{' '}
                      {from === 'RemoveLiquidity'
                        ? `LPT`
                        : from === 'SwapUI'
                        ? `${tokens.token1?.name}`
                        : `${tokens.token1?.name} and ${tokens.token2?.name}`}{' '}
                      to contract
                    </span>
                  </>
                )}
                <a
                  href="https://ethereum.org/en/developers/tutorials/understand-the-erc-20-token-smart-contract/#:~:text=The%20ERC%2D20%20standard%20allows,spend%20on%20behalf%20of%20owner%20."
                  className="text-uni-dark-pink text-base font-medium"
                  target="#"
                >
                  Why is this required?
                </a>
                {!waitingForAllowance && (
                  <p className="mt-7 text-sm text-slate-600">
                    Proceed in your wallet
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="heading flex justify-end p-3">
              <button onClick={() => setConfirmTransactionToggle(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div>
              <div className="flex flex-col justify-center items-center p-5 break-words gap-2">
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="black"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
                <span className="text-xl text-black text-center w-3/4">
                  Confirm {from === 'SwapUI' ? 'swap' : 'transaction '}
                </span>
                {!(from === 'RemoveLiquidity') && (
                  <div className="w-ful">
                    <span className="flex gap-1 items-center">
                      <span className="flex gap-1 items-center">
                        <img src={ethLogo} alt="" className="w-4" />
                        <span className="text-center text-sm">
                          {tokens?.token1.amount}
                          <span> {tokens.token1?.name}</span>
                        </span>
                      </span>
                      {from === 'SwapUI' ? (
                        <span className="material-symbols-outlined">
                          arrow_right_alt
                        </span>
                      ) : (
                        <span> + </span>
                      )}
                      <span className="flex gap-1 items-center">
                        <img src={ethLogo} alt="" className="w-4" />
                        <span className="text-center">
                          {tokens?.token2.amount}
                          <span> {tokens.token2?.name}</span>
                        </span>
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ConfirmTransaction;
