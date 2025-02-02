import { useState } from "react";
import { TextField, CircularProgress, Box, MenuItem } from "@mui/material";
import axios from "axios";

const API_KEY = "ak_m6kgz2ix8p1AE5DW6pLG78Hf9LE6L"; // Replace with your actual API key

const AddressInput = ({ value, onChange, error, helperText, disabled }) => {
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loadingFullAddress, setLoadingFullAddress] = useState(false);

  // Fetch address suggestions (autocomplete) based on the input query.
  const fetchAddressSuggestions = async (query) => {
    if (!query.trim()) {
      setAddressSuggestions([]);
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
      // Expect an array of objects in res.data.result.hits
      setAddressSuggestions(res.data?.result?.hits || []);
    } catch (err) {
      console.error("Error fetching address suggestions:", err);
      setAddressSuggestions([]);
    }
    setLoadingSuggestions(false);
  };

  // Use the UDPRN to fetch the full address details.
  const fetchFullAddress = async (udprn) => {
    setLoadingFullAddress(true);
    try {
      const res = await axios.get(
        `https://api.ideal-postcodes.co.uk/v1/udprn/${udprn}`,
        {
          params: { api_key: API_KEY },
        }
      );
      // The full address details are returned under res.data.result
      return res.data?.result || null;
    } catch (err) {
      console.error("Error fetching full address:", err);
      return null;
    } finally {
      setLoadingFullAddress(false);
    }
  };

  // Helper function to format the address object into a single string.
  // You can adjust which fields to display.
  const formatAddress = (addressObj) => {
    const parts = [];
    if (addressObj.organisation_name) parts.push(addressObj.organisation_name);
    if (addressObj.building_number) parts.push(addressObj.building_number);
    if (addressObj.thoroughfare) parts.push(addressObj.thoroughfare);
    if (addressObj.post_town) parts.push(addressObj.post_town);
    if (addressObj.postcode) parts.push(addressObj.postcode);
    return parts.join(", ");
  };

  // Handle changes in the text field: update parent and fetch new suggestions.
  const handleInputChange = (e) => {
    onChange(e);
    fetchAddressSuggestions(e.target.value);
  };

  // When a suggestion is clicked, use its UDPRN to retrieve the full address.
  // Then, format the address and send it to the parent.
  const handleAddressSelect = async (suggestionObj) => {
    const fullAddress = await fetchFullAddress(suggestionObj.udprn);
    if (fullAddress) {
      const formattedAddress = formatAddress(fullAddress);
      // Pass both the formatted string and the full address object if needed.
      onChange({
        target: {
          name: "address",
          value: formattedAddress,
          fullAddress, // Optional: include the entire address object for further processing.
        },
      });
    } else {
      // Fallback: use the suggestion text if lookup fails.
      onChange({ target: { name: "address", value: suggestionObj.suggestion } });
    }
    setAddressSuggestions([]);
  };

  return (
    <>
      <TextField
        fullWidth
        name="address"
        value={value}
        onChange={handleInputChange}
        label="Address"
        required
        error={!!error}
        helperText={helperText}
        autoComplete="off"
        disabled={disabled || loadingFullAddress}
      />
      {loadingSuggestions && (
        <CircularProgress size={20} sx={{ marginLeft: 1 }} />
      )}
      {addressSuggestions.length > 0 && (
        <Box
          mt={1}
          sx={{
            background: "#f9f9f9",
            borderRadius: "5px",
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {addressSuggestions.map((suggestion, index) => (
            <MenuItem
              key={index}
              onClick={() => handleAddressSelect(suggestion)}
            >
              <Box sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
                {suggestion.suggestion}
              </Box>
            </MenuItem>
          ))}
        </Box>
      )}
    </>
  );
};

export default AddressInput;
