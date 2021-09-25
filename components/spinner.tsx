import styled from "styled-components";
import { mixins } from 'styles';

const StyledSpinner = styled.div`
${mixins.flexCenter}
padding: 20px 0 0 0;
.loader {
    -webkit-animation: spin 1s linear infinite;
            animation: spin 1s linear infinite;
    border: 3px solid #ddd;
    border-top: 3px solid #42a5f5;
    border-radius: 50%;
    height: 40px;
    width: 40px;
  }
  
  @-webkit-keyframes spin {
    to {
      border-top-color: #42a5f5;
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
    }
  }
  
  @keyframes spin {
    to {
      border-top-color: #42a5f5;
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
    }
  }
`;

const Spinner = () => (
    <StyledSpinner>
        <div className="loader" />
    </StyledSpinner>
);

export default Spinner;