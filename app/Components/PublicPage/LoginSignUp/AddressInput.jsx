import React, { useState, useEffect, useRef } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import axios from "axios";

const API_KEY = "ak_m6kgz2ix8p1AE5DW6pLG78Hf9LE6L"; // Replace with your actual API key

/**
 * AddressSelect Component
 *
 * Props:
 * - value: The current value of the address first line (controlled input).
 * - onChange: Callback to propagate changes. When a suggestion is selected,
 *   it sends an event with target properties:
 *     - name: "address"
 *     - value: addressFirstLine (string)
 *     - addressFirstLine, addressSecondLine, addressThirdLine, city, postcode: full address fields.
 * - error: Flag to indicate error state.
 * - helperText: Helper text for the input.
 * - disabled: Boolean to disable the input.
 */
const AddressSelect = ({
  value,
  onChange,
  error,
  helperText,
  disabled,
}) => {
  const [addressOptions, setAddressOptions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loadingFullAddress, setLoadingFullAddress] = useState(false);
  // The inputValue holds the searchable address first line.
  const [inputValue, setInputValue] = useState(value || "");
  // Ref used for debouncing API calls.
  const debounceRef = useRef(null);

  /**
   * Fetch autocomplete suggestions for the address.
   */
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
      // Expected suggestions are in res.data.result.hits or an empty array.
      setAddressOptions(res.data?.result?.hits || []);
    } catch (err) {
      console.error("Error fetching address suggestions:", err);
      setAddressOptions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  /**
   * Fetch the full address details using the UDPRN.
   */
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

  /**
   * Debounce the input changes to reduce API calls.
   */
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

  /**
   * When the text input changes, update the state and propagate the raw input value.
   */
  const handleInputChange = (event, newInputValue, reason) => {
    if (reason === "input") {
      setInputValue(newInputValue);
      // Propagate the raw input change if needed.
      onChange({
        target: {
          name: "address",
          value: newInputValue,
        },
      });
    }
  };

  /**
   * When a suggestion is selected, fetch the full address details
   * and propagate all required address fields.
   */
  const handleChange = async (event, selectedOption) => {
    if (selectedOption && selectedOption.udprn) {
      const fullAddress = await fetchFullAddress(selectedOption.udprn);
      if (fullAddress) {
        // Map the API response to your desired fields.
        const addressFields = {
          addressFirstLine: fullAddress.line_1 || "",
          addressSecondLine: fullAddress.line_2 || "",
          addressThirdLine: fullAddress.line_3 || "",
          city: fullAddress.post_town || "",
          postcode: fullAddress.postcode || "",
        };

        // Propagate the fields using onChange.
        onChange({
          target: {
            name: "address",
            value: addressFields.addressFirstLine, // searchable value
            ...addressFields, // additional address fields for your form
            fullAddress, // optionally, pass the full address object as well
          },
        });
        setInputValue(addressFields.addressFirstLine);
      } else {
        // Fallback: use the suggestion text if the full address lookup fails.
        onChange({
          target: {
            name: "address",
            value: selectedOption.suggestion,
          },
        });
        setInputValue(selectedOption.suggestion);
      }
      // Clear suggestions after a selection.
      setAddressOptions([]);
    }
  };

  return (
    <Autocomplete
      freeSolo
      required

      options={addressOptions}
      // Display the suggestion text.
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
          required

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
