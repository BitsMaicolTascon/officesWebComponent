import { css } from "lit";

export default css`
  .card {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.25px;
    width: auto;
    height: auto;
    border: 1px solid #616364;
    border-radius: 30px;
    margin: 30px;
    text-align: center;
    background: #f5f5f5;
  }

  .card-header {
    margin: 20px;
    font-size: 20px;
    color: #3498db;
  }

  .card-body {
    font-size: 15px;
  }

  .card-footer {
    padding: 15px;
  }

  .img-card {
    width: 120px;
    height: 120px;
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .loading {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
