
const Rating = ({ rating }) => {
    let bgColor;
    if (rating >= 7) {
      bgColor = 'bg-green-500';
    } else if (rating >= 4) {
      bgColor = 'bg-yellow-500';
    } else {
      bgColor = 'bg-red-500';
    }
  
    return (
      <div className={`absolute top-4 left-4 rounded-full w-16 h-16 flex items-center justify-center text-white text-xl font-bold ${bgColor}`}>
        {rating}
      </div>
    );
  };
  
  export default Rating;