import useFetch from "../../hooks/useFetch.js";
import "./featured.css";

const Featured = () => {
  const BACKEND_URL = "https://backend-booking-app.onrender.com/api";

  // const { data, loading, error } = useFetch(
  //   "/hotels/countByCity?cities=berlin,madrid,london"
  // );
  const { data, loading, error } = useFetch(`${BACKEND_URL}/hotels`);

  // Get unique city names from the hotel data
  const uniqueCities = [...new Set(data.map((hotel) => hotel.city))];

  console.log(data);
  
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          {uniqueCities.map((city) => {
            // Filter hotels by the current city
            const hotelsByCity = data.filter((hotel) => hotel.city === city);

            return (
              <div className="featuredItem" key={city}>
                <img
                  src={hotelsByCity[0].photos[0]} // Use the first hotel's image BACKEND_URL
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h1>{city}</h1>
                  <h2>{hotelsByCity.length} properties</h2>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Featured;
