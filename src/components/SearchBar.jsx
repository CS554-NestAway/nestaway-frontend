import { useCallback, useEffect, useState } from "react";
import api, { GetUniqueStates } from "../api";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

const SearchBar = () => {
  const [uniqueStates, setUniqueStates] = useState([]);
  const [query, setQuery] = useState({
    state: "",
    checkIn: "",
    checkOut: "",
  });
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

  const handleSearch = useCallback(() => {
    api.get;
  }, []);

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
              setQuery((prevValue) => ({ ...prevValue, state: e.value }))
            }
          />
          <Calendar
            inputClassName="placeholder:text-accent2 bg-accent1 flex justify-center rounded-xl hover:bg-secondary min-w-40 w-40 px-6 focus:shadow-none focus-visible:outline-none"
            placeholder="Check-In"
            value={query.checkIn}
            onChange={(e) =>
              setQuery((prevValue) => ({ ...prevValue, checkIn: e.value }))
            }
            dateFormat="mm/dd/yy"
          />
          <Calendar
            inputClassName="placeholder:text-accent2 bg-accent1 flex justify-center rounded-xl hover:bg-secondary min-w-40 w-40 px-6 focus:shadow-none focus-visible:outline-none"
            placeholder="Check-Out"
            value={query.checkOut}
            onChange={(e) =>
              setQuery((prevValue) => ({ ...prevValue, checkOut: e.value }))
            }
            dateFormat="mm/dd/yy"
          />
          <div
            className="flex justify-center items-center rounded-xl bg-primary text-accent1 hover:bg-action min-w-36 w-36 py-2 px-6"
            onClick={() => handleSearch()}
          >
            Search
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
