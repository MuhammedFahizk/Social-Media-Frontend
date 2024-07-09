import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const OtpTimer = () => {
  const formatTime = (time) => {
    // Calculate minutes and seconds from remaining time in seconds
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Return formatted time as a string
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <CountdownCircleTimer
      isPlaying
      duration={300}
      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[7, 5, 2, 0]}
    >
      {({ remainingTime }) => formatTime(remainingTime)}
    </CountdownCircleTimer>
  );
};

export default OtpTimer;
