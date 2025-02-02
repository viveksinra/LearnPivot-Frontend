import React, { useState, useEffect, useRef } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import axios from "axios";

const API_KEY = "ak_m6kgz2ix8p1AE5DW6pLG78Hf9LE6L"; // Replace with your actual API key

const AddressSelect = ({ value, onChange, error, helperText, disabled }) => {
  const [addressOptions, setAddressOptions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loadingFullAddress, setLoadingFullAddress] = useState(false);
  // inputValue holds the string currently typed in the field.
  const [inputValue, setInputValue] = useState(value || "");
  // Using a ref to debounce API calls.
  const debounceRef = useRef(null);

  // Fetch autocomplete suggestions for the address.
  const fetchAddressSuggestions = async (query) => {
    if (!query.trim()) {
      setAddressOptions([]);
      return;
    }
    setLoadingSuggestions(true);
    try {
      const res = await axios.get(
        "https://api.ideal-postcodes.co.uk/v1/autocomplete/addresses",
        {
          params: { api_key: API_KEY, query },
        }
      );
      // Expected suggestions are in res.data.result.hits (or an empty array).
      setAddressOptions(res.data?.result?.hits || []);
    } catch (err) {
      console.error("Error fetching address suggestions:", err);
      setAddressOptions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // Fetch the full address details using the UDPRN.
  const fetchFullAddress = async (udprn) => {
    setLoadingFullAddress(true);
    try {
      const res = await axios.get(
        `https://api.ideal-postcodes.co.uk/v1/udprn/${udprn}`,
        {
          params: { api_key: API_KEY },
        }
      );
      return res.data?.result || null;
    } catch (err) {
      console.error("Error fetching full address:", err);
      return null;
    } finally {
      setLoadingFullAddress(false);
    }
  };

  // Format the address object into a single, readable string.
  const formatAddress = (addressObj) => {
    const parts = [];
    if (addressObj.organisation_name) parts.push(addressObj.organisation_name);
    if (addressObj.building_number) parts.push(addressObj.building_number);
    if (addressObj.thoroughfare) {
      if (addressObj.building_number) {
        parts[parts.length - 1] += ` ${addressObj.thoroughfare}`;
      } else {
        parts.push(addressObj.thoroughfare);
      }
    }
    if (addressObj.post_town) parts.push(addressObj.post_town);
    if (addressObj.postcode) parts.push(addressObj.postcode);
    return parts.join(", ");
  };

  // Debounce the input changes to reduce API calls.
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      fetchAddressSuggestions(inputValue);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [inputValue]);

  // When the text input changes, update the state and propagate the value.
  const handleInputChange = (event, newInputValue, reason) => {
    if (reason === "input") {
      setInputValue(newInputValue);
      // Propagate raw input change if needed.
      onChange({
        target: {
          name: "address",
          value: newInputValue,
        },
      });
    }
  };

  // When a suggestion is selected, fetch the full address details.
  const handleChange = async (event, selectedOption) => {
    if (selectedOption && selectedOption.udprn) {
      const fullAddress = await fetchFullAddress(selectedOption.udprn);
      if (fullAddress) {
        const formattedAddress = formatAddress(fullAddress);
        onChange({
          target: {
            name: "address",
            value: formattedAddress,
            fullAddress, // Optionally, pass the entire address object.
          },
        });
        setInputValue(formattedAddress);
      } else {
        // Fallback: use the suggestion text if the lookup fails.
        onChange({
          target: {
            name: "address",
            value: selectedOption.suggestion,
          },
        });
        setInputValue(selectedOption.suggestion);
      }
      // Clear suggestions after selection.
      setAddressOptions([]);
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={addressOptions}
      // Provide a label for each option.
      getOptionLabel={(option) => option.suggestion || ""}
      loading={loadingSuggestions}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleChange}
      disabled={disabled || loadingFullAddress}
      noOptionsText="Start typing to get address suggestions..."
      renderInput={(params) => (
        <TextField
          {...params}
          label="Address"
          error={!!error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {(loadingSuggestions || loadingFullAddress) && (
                  <CircularProgress color="inherit" size={20} />
                )}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AddressSelect;
