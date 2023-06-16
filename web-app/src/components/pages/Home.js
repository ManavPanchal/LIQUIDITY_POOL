import React from 'react';
import homepic from '../../images/homepic.png';
import homeswappic from '../../images/homeswappic.png';
import homenftpic from '../../images/homenftpic.png';
import feature1pic from '../../images/feature1.png';
import feature2pic from '../../images/feature2.png';
import feature3pic from '../../images/feature3.png';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="max-md:h-fit">
      <div className="flex justify-center items-center ">
        <img
          src={homepic}
          alt="swap"
          className="mt-12 rounded-2xl mb-16 border-transparent hover:border-pink-200 border-2 transition-all duration-300 transform hover:-translate-y-2  border-b-0"
        />
      </div>
      <div className="text-center max-md:pb-20">
        <h1 className=" text-6xl max-md:text-4xl bg-clip-text text-transparent bg-gradient-to-b from-uni-text-pink-a  to-uni-text-pink-b font-roboto font-bold">
          Trade crypto and NFTs <h1 className="mb-6">with confidence</h1>
        </h1>
        <h2 className="text-slate-400 text-xl max-md:text-lg font-roboto mb-6 ">
          Buy, sell, and explore tokens and NFTs
        </h2>
        <Link to="/swap">
          <button className=" h-14 w-72 max-md:w-52 rounded-3xl bg-gradient-to-r from-uni-btn-a to-uni-text-pink-b text-white font-roboto font-bold m-auto text-center py-2 text-lg mb-6">
            Get started
          </button>
        </Link>
        <h3 className="text-slate-400 text-xl font-roboto mb-32 max-md:mb-20 ">
          Learn More ⇩
        </h3>
      </div>
      <div className="h-80 flex justify-around ml-36 mr-36 mb-10 max-sm:flex-col max-sm:gap-5 max-md:flex-col max-md:gap-5 max-sm:mb-60 max-md:mb-60 max-sm:mx-4 max-md:mx-6 max-lg:mx-0 max-md:mt-24 max-lg:mt-20">
        <div className="h-full w-[740px] max-sm:max-w-full max-md:max-w-full max-lg:ml-10 max-md:m-auto bg-white mr-8 flex justify-between rounded-2xl   border-transparent hover:border-gray-300 border-2 shadow-md shadow-white">
          <div className="flex flex-col  justify-around max-lg:mx-0">
            <h1 className="flex font-roboto text-3xl max-sm:text-2xl max-lg:text-2xl mt-8 ml-8 font-bold">
              Swap tokens
            </h1>
            <h3 className="font-roboto text-xl mt-32 ml-8 max-sm:mt-8 max-md:mt-16  max-xl:mt-6  max-sm:text-md max-md:text-lg max-xl:text-lg">
              Buy, sell, and explore tokens on Ethereum,{' '}
              <h3>Polygon, Optimism, and more.</h3>
            </h3>
            <h4 className="font-roboto text-xl mt-8 ml-8 max-sm:mt-2  max-md:mt-2 max-xl:mt-4 max-sm:text-md max-md:text-lg max-lg:text-lg text-pink-600 font-medium">
              Trade Tokens
            </h4>
          </div>
          <div>
            <img
              src={homeswappic}
              alt="swap2 "
              className=" rounded-2xl border-transparent h-72 "
            />
          </div>
        </div>
        <div className=" h-full w-[740px] max-sm:max-w-full max-md:max-w-full max-lg:max-w-full bg-white mr-8 flex justify-between rounded-2xl   border-transparent hover:border-gray-300 border-2 shadow-md shadow-white ">
          <div className="flex flex-col justify-around">
            <h1 className="font-roboto text-3xl max-sm:text-2xl max-lg:text-2xl mt-8 ml-8 font-bold">
              Trade NFTs
            </h1>
            <h3 className="font-roboto text-xl mt-32 ml-8  max-sm:mt-8  max-md:mt-16   max-xl:mt-6  max-sm:text-md max-md:text-lg max-xl:text-lg">
              Buy and sell NFTs across marketplaces to find
              <h3>more listings at better prices.</h3>
            </h3>
            <h4 className="font-roboto text-xl mt-8 ml-8 max-sm:mt-2  max-md:mt-2 max-xl:mt-4 max-sm:text-md max-md:text-lg text-pink-600 font-medium">
              Explore NFTs
            </h4>
          </div>
          <div>
            <img
              src={homenftpic}
              alt="swap3"
              className=" rounded-2xl  border-transparent h-72 "
            />
          </div>
        </div>
      </div>

      <div className="w-10/12 m-auto">
        <div className="h-[260px] flex justify-between mb-20 max-sm:flex-col max-sm:gap-5 max-md:flex-col max-md:gap-5 max-xl:gap-5">
          <div className="h-full w-[460px] max-sm:max-w-full max-md:max-w-full max-xl:m-auto bg-uni-feature-bg mr-8 flex justify-between rounded-3xl border-transparent hover:border-gray-300 border-2">
            <div className="flex flex-col justify-around">
              <div className="flex justify-between">
                <h1 className="font-roboto text-3xl max-sm:text-2xl max-xl:text-2xl mt-8 ml-8 font-bold">
                  Buy Crypto
                </h1>
                <div>
                  <img
                    src={feature1pic}
                    alt="swap4"
                    className=" rounded-2xl  border-transparent mt-4 "
                  />
                </div>
              </div>

              <h3 className="font-roboto text-xl mt-10 ml-8 max-sm:mt-5 max-xl:mt-4 text-slate-400">
                Buy crypto with your credit
                <h3> card or bank account at the best rates</h3>
              </h3>
              <h4 className="font-roboto text-xl mt-8 ml-8 mb-4 max-sm:mt-2 max-sm:text-lg max-xl:mt-2 max-xl:text-lg text-pink-600 font-medium">
                Buy Now
              </h4>
            </div>
          </div>
          <div className="h-full w-[460px] max-sm:max-w-full max-md:max-w-full max-xl:m-auto bg-uni-feature-bg mr-8 flex justify-between rounded-3xl border-transparent hover:border-gray-300 border-2 ">
            <div className="flex flex-col justify-around">
              <div className="flex justify-between">
                <h1 className="font-roboto text-3xl max-sm:text-2xl max-xl:text-2xl mt-8 ml-8 font-bold">
                  Earn
                </h1>
                <div>
                  <img
                    src={feature2pic}
                    alt="swap4"
                    className=" rounded-2xl  border-transparent mt-4 "
                  />
                </div>
              </div>

              <h3 className="font-roboto text-xl mt-10 ml-8 max-sm:mt-5 max-xl:mt-4 text-slate-400">
                Provide liquidity to pools on Uniswap
                <h3> and earn fees on swaps.</h3>
              </h3>
              <h4 className="font-roboto text-xl mt-8 ml-8 mb-4 max-sm:mt-2 max-sm:text-lg max-xl:mt-2 max-xl:text-lg text-pink-600 font-medium">
                Provide Liquidity
              </h4>
            </div>
          </div>
          <div className="h-full w-[460px] max-sm:max-w-full max-md:max-w-full max-xl:m-auto bg-uni-feature-bg mr-8 flex justify-between rounded-3xl border-transparent hover:border-gray-300 border-2 ">
            <div className="flex flex-col justify-around">
              <div className="flex justify-between">
                <h1 className="font-roboto text-3xl max-sm:text-2xl max-xl:text-2xl  mt-8 ml-8 font-bold">
                  Build dApps
                </h1>
                <div>
                  <img
                    src={feature3pic}
                    alt="swap5"
                    className=" rounded-2xl  border-transparent mt-4 "
                  />
                </div>
              </div>

              <h3 className="font-roboto text-xl mt-10 ml-8 max-sm:mt-5 max-xl:mt-4 text-slate-400">
                Build apps and tools on the largest
                <h3> DeFi protocol on Ethereum.</h3>
              </h3>
              <h4 className="font-roboto text-xl mt-8 ml-8 mb-4 max-sm:mt-2 max-sm:text-lg max-xl:mt-2 max-xl:text-lg text-pink-600 font-medium">
                Developer Docs
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between h-32 max-sm:hidden max-md:hidden max-xl:m-0 bg-gradient-to-r from-uni-btn-a to-uni-text-pink-b  ml-40 mr-44 mb-10 rounded-2xl ">
        <div className="flex flex-col max-sm:max-w-full max-md:max-w-full">
          <h1 className="font-roboto text-3xl max-xl:text-2xl font-bold ml-16 mt-8 text-white">
            Powered by the Uniswap Protocol
          </h1>
          <h2 className="font-roboto text-xl max-xl:text-lg font-medium ml-16 mt-2 text-white">
            The leading decentralized crypto trading protocol, governed by a
            global community.
          </h2>
        </div>
        <div className="flex ">
          <button className="border-white border-2 rounded-xl max-xl:text-lg text-white font-roboto h-14 w-44 mt-10 mr-20">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
//linear-gradient(10deg, rgb(255, 79, 184) 0%, rgb(255, 159, 251) 100%)
