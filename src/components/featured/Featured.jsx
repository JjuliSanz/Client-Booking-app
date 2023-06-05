import useFetch from "../../hooks/useFetch.js";
import "./featured.css";

const Featured = () => {
  // const { data, loading, error } = useFetch(
  //   "/hotels/countByCity?cities=berlin,madrid,london"
  // );
  const { data, loading, error } = useFetch("/hotels");

  // Get unique city names from the hotel data
  const uniqueCities = [...new Set(data.map((hotel) => hotel.city))];

  console.log(data);
  // return (
  //   <div className="featured">
  //     {loading ? (
  //       "Loading please wait"
  //     ) : (
  //       <>        
  //         <div className="featuredItem">
  //           <img
  //             src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
  //             alt=""
  //             className="featuredImg"
  //           />
  //           <div className="featuredTitles">
  //             <h1>Berlin</h1>
  //             {/* <h1>{data.name}</h1> */}
  //             <h2>{data[0]} properties</h2>
  //           </div>
  //         </div>

  //         <div className="featuredItem">
  //           <img
  //             src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
  //             alt=""
  //             className="featuredImg"
  //           />
  //           <div className="featuredTitles">
  //             <h1>Madrid</h1>
  //             <h2>{data[1]} properties</h2>
  //           </div>
  //         </div>
  //         <div className="featuredItem">
  //           <img
  //             src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
  //             alt=""
  //             className="featuredImg"
  //           />
  //           <div className="featuredTitles">
  //             <h1>London</h1>
  //             <h2>{data[2]} properties</h2>
  //           </div>
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );
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
                  src={hotelsByCity[0].photos[0]} // Use the first hotel's image URL
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
