import { useState } from "react";
import { TextField, CircularProgress, Box, MenuItem } from "@mui/material";
import axios from "axios";

const API_KEY = "ak_m6kgz2ix8p1AE5DW6pLG78Hf9LE6L"; // Replace with your actual API key

const AddressInput = ({ value, onChange, error, helperText, disabled }) => {
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAddressSuggestions = async (query) => {
    if (!query.trim()) {
      setAddressSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.ideal-postcodes.co.uk/v1/autocomplete/addresses?api_key=${API_KEY}&query=${query}`
      );
      setAddressSuggestions(res.data?.result?.hits || []);
    } catch (err) {
      console.error("Error fetching address suggestions:", err);
      setAddressSuggestions([]);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    // Forward the change to the parent
    onChange(e);
    // Fetch suggestions based on the new input
    fetchAddressSuggestions(e.target.value);
  };

  const handleAddressSelect = (selectedAddress) => {
    // Update the address field in the parent using a synthetic event
    onChange({ target: { name: "address", value: selectedAddress } });
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
        disabled={disabled}
      />
      {loading && <CircularProgress size={20} sx={{ marginLeft: 1 }} />}
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
            <MenuItem key={index} onClick={() => handleAddressSelect(suggestion.suggestion)}>
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
