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
  min-height: 58px;  // Changed from height to min-height
  font-size: 1.25rem;
  padding: 0 30px;
  animation: ${props => props.disabled ? 'none' : `${pulse} 2s infinite`};
  opacity: ${props => props.disabled ? 0.6 : 1};
  color: white !important;  // Ensure text is always white
  background: ${props => props.disabled ? 
    'linear-gradient(45deg,rgb(194, 0, 0) 30%,rgb(126, 0, 0) 90%)' : 
    'linear-gradient(45deg, #0D47A1 30%, #7B1FA2 90%)'
  };
  
  &:hover {
    background: ${props => props.disabled ? 
      'linear-gradient(45deg, #9E9E9E 30%, #757575 90%)' : 
      'linear-gradient(45deg, #0D47A1 30%, #7B1FA2 90%)'
    };
  }
`;

export default AnimatedButton;