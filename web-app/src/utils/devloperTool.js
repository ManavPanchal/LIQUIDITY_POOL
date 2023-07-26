export const onRender = (id, phase, actualDuration, baseDuration, startTime, endTime) => {
    console.log(
      `
       id: ${id},
       phase: ${phase},
       actualDuration: ${actualDuration},
       baseDuration: ${baseDuration},
       startTime: ${startTime},
       endTime: ${endTime},
      `
    );
  }