import "../../css/generator/generator-header.scss";

const HeaderGenerator = () => {
  return (
    <div className="generator-image-and-title">
      <p className="generator-logo">
        d<span className="generator-logo-span">3</span>vlab
      </p>
      <p className="generator-title">NFT Generator</p>
      <div id="stage">
        <div id="spinner">
          <img className="img-1" src="media/img/2-outfit.png" />
          <img className="img-2" src="media/img/1-mouth.png" />
          <img className="img-3" src="media/img/5-eyes.png" />
          <img className="img-4" src="media/img/2-glasses.png" />
          <img
            className="img-5"
            src="media/img/1-body.png"
            width="238"
            height="160"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderGenerator;
