import "../assets/components/design/home.scss";

const Home = () => {
  return (
    <div className="main-container">
      <div className="first-section">
        <div className="first-section-title-description">
          <div className="main-title">NFT Collection Generator</div>
          <div className="main-title-description">
            Generate your NFT collections in just a few steps
          </div>
          <div className="blockchains-container">
            <div className="blockchains">
              <img
                className="polygon"
                src="https://storage.googleapis.com/uniqmynftimg/polygon-logo.webp"
              />

              <img src="https://storage.googleapis.com/uniqmynftimg/Solana-logo.png" />
            </div>
            <p className="first-section-img-description2">
              Make your NFT's available publicly on multiple blockchains
            </p>
          </div>
        </div>
        <div className="first-section-image-container">
          <div className="first-section-img"></div>
        </div>
      </div>
    </div>
  );
};
export default Home;
