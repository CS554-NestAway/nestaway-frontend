import { useCallback, useEffect, useState } from "react";
import api, { GetUniqueStates } from "../api";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { useDispatch, useSelector } from "react-redux";
import { searchHousesByState, setQuery } from "../store/houseSlice";
import moment from "moment";

const SearchBar = () => {
  const [uniqueStates, setUniqueStates] = useState([]);
  // const [query, setQuery] = useState({
  //   state: "",
  //   checkIn: "",
  //   checkOut: "",
  // });

  const dispatch = useDispatch();

  const query = useSelector((state) => state.houses.query);
  useEffect(() => {
    api
      .get(GetUniqueStates)
      .then((response) => {
        if (typeof response.data === "object") {
          setUniqueStates(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      setUniqueStates([]);
    };
  }, []);

  // const handleSearch = useCallback(() => {
  //   api.get;
  // }, []);

  return (
    <div className="flex bg-accent1 shadow-shadow2 rounded-xl whitespace-nowrap cursor-pointer border border-primary">
      {uniqueStates.length > 0 && (
        <>
          <Dropdown
            className="flex justify-center items-center rounded-xl bg-accent1 text-accent2 hover:bg-secondary min-w-64 w-64 px-6 focus:shadow-none focus-visible:outline-none"
            panelClassName="bg-accent1 text-accent2"
            value={query.state}
            options={
              Array.isArray(uniqueStates) &&
              uniqueStates?.map((state) => ({
                label: state,
                value: state,
              }))
            }
            placeholder="Select Destination"
            onChange={(e) =>
              dispatch(
                setQuery({
                  ...query,
                  state: e.value,
                  lat: "",
                  lng: "",
                  radius: 10,
                })
              )
            }
          />
          <Calendar
            inputClassName="placeholder:text-accent2 bg-accent1 flex justify-center rounded-xl hover:bg-secondary min-w-40 w-40 px-6 focus:shadow-none focus-visible:outline-none"
            placeholder="Check-In"
            value={query.checkIn}
            onChange={(e) =>
              dispatch(
                setQuery({
                  ...query,
                  checkIn: e.value,
                  lat: "",
                  lng: "",
                  radius: 10,
                })
              )
            }
            dateFormat="mm/dd/yy"
          />
          <Calendar
            inputClassName="placeholder:text-accent2 bg-accent1 flex justify-center rounded-xl hover:bg-secondary min-w-40 w-40 px-6 focus:shadow-none focus-visible:outline-none"
            placeholder="Check-Out"
            value={query.checkOut}
            onChange={(e) =>
              dispatch(
                setQuery({
                  ...query,
                  checkOut: e.value,
                  lat: "",
                  lng: "",
                  radius: 10,
                })
              )
            }
            dateFormat="mm/dd/yy"
          />
          <button
            className={`flex justify-center items-center rounded-xl ${
              moment(query.checkIn).isValid() &&
              !moment(query.checkOut).isValid()
                ? "bg-primary bg-opacity-80 cursor-not-allowed"
                : "bg-primary hover:bg-action"
            } text-accent1 min-w-36 w-36 py-2 px-6`}
            disabled={
              moment(query.checkIn).isValid() &&
              !moment(query.checkOut).isValid()
            }
            onClick={() => {
              dispatch(searchHousesByState());
            }}
          >
            Search
          </button>
        </>
      )}
    </div>
  );
};

export default SearchBar;
