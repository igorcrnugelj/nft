import { Fragment } from "react";

export default () => {
  return (
    <Fragment>
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
                  src="https://storage.googleapis.com/uniqmynftimg/polygon-logo.webp" alt="polygon-logo"
                />

                <img src="https://storage.googleapis.com/uniqmynftimg/Solana-logo.png" alt="solana-logo" />
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
      {/* *************************************************************************** */}
      <div className="main-container2">
        <div className="first-section2">
          <div className="first-section-title-description2">
            <div className="main-title2">NFT Collection Generator</div>
            <div className="main-title-description2">
              Generate your NFT collections in just a few steps
            </div>
            <div className="first-section-image-container2">
              <div className="first-section-img2"></div>
            </div>
            <p className="first-section-img-description22">
              Make your NFT's available publicly on multiple blockchains
            </p>
            <div className="blockchains-container2">
              <div className="blockchains2">
                <img
                  className="polygon2"
                  src="https://storage.googleapis.com/uniqmynftimg/polygon-logo.webp"
                  alt="polygon-logo"
                />
                <img src="https://storage.googleapis.com/uniqmynftimg/Solana-logo.png" alt="solana-logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
