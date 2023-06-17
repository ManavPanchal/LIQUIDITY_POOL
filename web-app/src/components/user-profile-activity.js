import { React, useState, useEffect } from 'react';
import poolInstance from '../utils/poolInstance';
import moment from 'moment';
const UserActivity = () => {
  const [swappedActivities, setSwappedActivities] = useState([]);
  const [addedActivities, setAddedActivities] = useState([]);
  const [removedActivities, setRemovedActivities] = useState([]);
  useEffect(() => {
    async function activityEvents() {
      const { contract, signerAddress } = await poolInstance();
      const swappedEvents = await contract.queryFilter('swappedTokens');
      const swappedActivity = swappedEvents
        .filter((pool) => {
          return signerAddress === pool.args[0];
        })
        .map((pool) => {
          return pool.args;
        });
      setSwappedActivities(swappedActivity);

      const addedEvents = await contract.queryFilter('liquidityAdded');
      const addedActivity = addedEvents
        .filter((pool) => {
          return signerAddress === pool.args[0];
        })
        .map((pool) => {
          return pool.args;
        });
      setAddedActivities(addedActivity);

      const removedEvents = await contract.queryFilter('liquidityRemoved');
      console.log(removedEvents);
      const removedActivity = removedEvents
        .filter((pool) => {
          return signerAddress === pool.args[0];
        })
        .map((pool) => {
          console.log(pool.args, '.....');
          return pool.args;
        });
      console.log(removedActivity, 'raaaaa');
      setRemovedActivities(removedActivity);
    }
    activityEvents();
  }, []);

  let activities = [
    ...swappedActivities.map((swappedActivity, index) => ({
      name: 'Swapped',
      image1: '',
      image2: '',
      activity: `${parseFloat(swappedActivity[2] / 10 ** 18)} ${
        swappedActivity[1].split('/')[0]
      } for ${parseFloat(swappedActivity[3] / 10 ** 18)}  ${
        swappedActivity[1].split('/')[1]
      }`,
      duration: moment(swappedActivity[4] * 1000).fromNow(),
      key: `swapped-${index}`,
    })),
    ...addedActivities.map((addedActivity, index) => ({
      name: 'Liquidity Added',
      image1: '',
      image2: '',
      activity: `${parseFloat(addedActivity[2] / 10 ** 18)} ${
        addedActivity[1].split('/')[0]
      } for  ${parseFloat(addedActivity[3] / 10 ** 18)}  ${
        addedActivity[1].split('/')[1]
      }`,
      duration: moment(addedActivity[4] * 1000).fromNow(),
      key: `added-${index}`,
    })),
    ...removedActivities.map((removedActivity, index) => ({
      name: 'Liquidity Removed',
      image1: '',
      image2: '',
      activity: `${parseFloat(removedActivity[2] / 10 ** 18)} ${
        removedActivity[1].split('/')[0]
      }for  ${parseFloat(removedActivity[3] / 10 ** 18)}  ${
        removedActivity[1].split('/')[1]
      }`,
      duration: moment(removedActivity[4] * 1000).fromNow(),
      key: `removed-${index}`,
    })),
  ];

  return (
    <div className="break-words w-full h-full">
      {activities ? (
        <div className="Activities w-full h-full flex flex-col gap-1">
          {activities?.map((activity) => {
            let fillColor =
              (activity.name === 'Liquidity Added' && 'fill-green-500') ||
              (activity.name === 'Liquidity Removed' && 'fill-red-600');
            return (
              <div className="activity flex justify-between items-center cursor-pointer hover:bg-slate-400 hover:bg-opacity-10 px-3 py-1">
                <div className="activity_details flex items-center gap-2">
                  <div className="activity_icon flex items-center">
                    {activity.name === 'Swapped' && (
                      <span class="material-symbols-outlined text-4xl w-full h-full text-uni-dark-pink">
                        swap_vertical_circle
                      </span>
                    )}
                    {(activity.name === 'Liquidity Added' ||
                      activity.name === 'Liquidity Removed') && (
                      <svg
                        width="35"
                        height="25"
                        viewBox="0 0 81 85"
                        xmlns="http://www.w3.org/2000/svg"
                        className={fillColor}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M40.98 44C53.1302 44 62.98 34.1503 62.98 22C62.98 9.84974 53.1302 0 40.98 0C28.8297 0 18.98 9.84974 18.98 22C18.98 34.1503 28.8297 44 40.98 44ZM49.23 22L40.98 13.75L32.73 22L40.98 30.25L49.23 22Z"
                          fill={fillColor}
                        ></path>
                        <path
                          d="M2.5 63.1986C12.9105 63.1986 20.7173 53.0581 20.7173 53.0581C20.7173 53.0581 28.5241 63.1986 38.9346 63.1986C49.3409 63.1986 59.7514 53.0581 59.7514 53.0581C59.7514 53.0581 70.1619 63.1986 77.9687 63.1986M2.5 82.2504C12.9105 82.2504 20.7173 72.1099 20.7173 72.1099C20.7173 72.1099 28.5241 82.2504 38.9346 82.2504C49.3409 82.2504 59.7514 72.1099 59.7514 72.1099C59.7514 72.1099 70.1619 82.2504 77.9687 82.2504"
                          stroke="#98A1C0"
                          stroke-width="5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          fill={fillColor}
                        ></path>
                      </svg>
                    )}
                  </div>
                  <div className="activity_data flex flex-col">
                    <div
                      className={`activity_name text-base font-medium text-black`}
                    >
                      {activity.name}
                    </div>
                    <div className="text-sm">{activity.activity}</div>
                  </div>
                </div>
                <div className="activity_duration">
                  <p>{activity.duration}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="h-full w-full flex justify-center items-center">
          No activity yet
        </p>
      )}
    </div>
  );
};

export default UserActivity;
