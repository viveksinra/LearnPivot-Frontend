
import Button from '@mui/material/Button';
import { styled, keyframes } from '@mui/system';


const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(123, 31, 162, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(123, 31, 162, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(123, 31, 162, 0);
  }
`;

const AnimatedButton = styled(Button)`
  background: linear-gradient(45deg, #0D47A1 30%, #7B1FA2 90%);
  border: 0;
  border-radius: 3px;
  color: white;
  height: 58px;
  font-size: 1.25rem;
  padding: 0 30px;
  animation: ${pulse} 2s infinite;
`;



export default AnimatedButton;
