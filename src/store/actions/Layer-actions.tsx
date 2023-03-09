import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { nftClient } from "../../AxiosClient";

export const getLayers = createAsyncThunk(
  "layers/getLayers",
  async (collectionId: any) => {
    const { data } = await nftClient.get(`/layer?collectionId=${collectionId}`);
    return data;
  }
);

export const deleteLayer = createAsyncThunk(
  "layers/deleteLayer",
  async (layerData: { collectionId: any; layerId: any }) => {
    const { collectionId, layerId } = layerData;
    try {
      const { data } = await nftClient.delete(
        `/layer?collectionId=${collectionId}&layerId=${layerId}`
      );
      return {
        data,
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);

export const createLayer = createAsyncThunk(
  "layers/createLayer",
  async (layer: any) => {
    try {
      const { data } = await nftClient.put(`/layer/createLayer`, layer);
      return {
        data,
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);

export const updateLayers = createAsyncThunk(
  "layers/updateLayers",
  async (layers: any) => {
    const { data } = await nftClient.post(`/layer/update-all`, layers);
    return data;
  }
);

export const editLayer = createAsyncThunk(
  "layers/editLayer",
  async (layer: any) => {
    try {
      const { data } = await nftClient.post(`/layer/updateLayer`, layer);
      return {
        data,
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);

export const getLayerImages = createAsyncThunk(
  "layers/getLayerImages",
  async (layerId: any) => {
    try {
      const { data } = await nftClient.get(`/image/?layerId=${layerId}`);
      return {
        data,
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);

export const calculateRarityImages = createAsyncThunk(
  "layers/calculateRarityImages",
  async (calculationImagesData: {
    newRarityValue: any;
    imagesForCalculateRarityFunction: any;
    imageForCalculateRarityFunction: any;
    fixRarity: any;
    maxRarityForCurrentImage: any;
  }) => {
    const {
      newRarityValue,
      imagesForCalculateRarityFunction,
      imageForCalculateRarityFunction,
      fixRarity,
      maxRarityForCurrentImage,
    } = calculationImagesData;

    //Ovdje pozivam metodu calculateRarity
    const newImagesCalculationRarity = calculateRarity(
      newRarityValue,
      imagesForCalculateRarityFunction,
      imageForCalculateRarityFunction,
      fixRarity,
      maxRarityForCurrentImage
    );
    try {
      console.log(
        "newImagesCalculationRarity.images: ",
        newImagesCalculationRarity.images
      );
      const { data } = await nftClient.post(
        `/image/update-all`,
        newImagesCalculationRarity.images
      );
      return {
        data,
        success: true,
        maxRarity: newImagesCalculationRarity.maxRarityForCurrentImage,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);

const calculateRarity = (
  newRarityValue: any,
  images: any,
  image: any,
  fixRarity: any,
  maxRarityForCurrentImage: any
) => {
  newRarityValue = parseInt(newRarityValue);
  const imagesForCalculate = images.images;

  let sumOfValuesLessThanIncrease = 0;
  let numberOfImagesWithRarityValuesMoreThanIncrease = 0;
  let numberOfImagesWithFixedRarity = 0;
  let sumOfRarityValuesOfImagesWithFixedRarity = 0;

  //Korak 8. Izračunati ukupan broj slika s fiksnim raritijem
  for (let i = 0; i < imagesForCalculate.length; i++) {
    if (
      imagesForCalculate[i].imageId !== image.imageId &&
      imagesForCalculate[i].fixedRarity === true
    ) {
      numberOfImagesWithFixedRarity++;
      sumOfRarityValuesOfImagesWithFixedRarity +=
        imagesForCalculate[i].imageRarity;
    }
  }

  maxRarityForCurrentImage = 100 - sumOfRarityValuesOfImagesWithFixedRarity;
  //Izračunavamo broj slika koje nisu current i nemaju fiksni rarity

  const lengthOfImagesArray =
    imagesForCalculate.length - 1 - numberOfImagesWithFixedRarity;

  // console.log("lengthOfImagesArray: ", lengthOfImagesArray);

  //1. Izracunati povecanje = povecano stanje slike - trenutno stanje (prije povecanja)
  const increaseTotal = newRarityValue - image.imageRarity;
  //2. Podjeliti povecanje sa preostalim brojem slika (5) 30 / 5 = 6 - broj za koji je potrebno umanjiti rarity svake pojedine slike - to su sve one slike koje nemaju fiksni rarity i nisu current
  const increase = increaseTotal / lengthOfImagesArray;

  //Izračunavamo ukupnu sumu svih raritija koji su manji od "stope povećanja" i broj slika koje imaju rarity veći od stope povećanja
  for (let i = 0; i < imagesForCalculate.length; i++) {
    //Korak 3. Pronaci vrijednosti koje su manje od broja za koji se umanjuje, 6 < n vrijednosti i dobiti ukupan zbroj tih vrijednosti - 4 + 5 + 5 = 14 (Napomena, vrijednost se postavlja na 0)
    if (
      imagesForCalculate[i].imageId !== image.imageId &&
      imagesForCalculate[i].imageRarity <= increase &&
      imagesForCalculate[i].fixedRarity === false
    ) {
      sumOfValuesLessThanIncrease += imagesForCalculate[i].imageRarity;
    }
    //Korak 5.
    if (
      imagesForCalculate[i].imageId !== image.imageId &&
      imagesForCalculate[i].imageRarity > increase &&
      imagesForCalculate[i].fixedRarity === false
    ) {
      numberOfImagesWithRarityValuesMoreThanIncrease++;
    }
  }

  //Korak 4 i 6.
  //Izračunavamo "drugu stopu povećanja" (increaseSecondStep) koju smo dobili tako što smo od prve "stope povećanja" oduzeli ukupnu vrijednost raritija
  //koji su bili manji od "stope povećanja" i to podijelili s brojem slika čiji je rarity veći od "stope povećanja" (increase)
  const increaseSecondStep =
    (increaseTotal - sumOfValuesLessThanIncrease) /
    numberOfImagesWithRarityValuesMoreThanIncrease;

  //Izračunavamo novu vrijednost raritija za preostale slike (one koje nisu current i nemaju fiksni rarity)
  const increaseThirdStep =
    (100 - (sumOfRarityValuesOfImagesWithFixedRarity + newRarityValue)) /
    lengthOfImagesArray;

  //****************************************IZRAČUN KADA KOLEKCIJA SADRŽI SLIKE S FIKSNIM RARITIJEM*************************************
  if (numberOfImagesWithFixedRarity > 0) {
    images = imagesForCalculate.map((imageMapped: any) => {
      //1. Ako je na slici mijenjan rarity, onda je ona "current" i njoj se dodjeljuje vrijednost "newRarityValue"
      if (imageMapped.imageId === image.imageId) {
        return {
          ...imageMapped,
          imageRarity: newRarityValue,
        };
      }
      //2. Za sliku/slike koje nisu current, a imaju fiksni rarity vrijednost raritija se ne mijenja - vratimo postojeću vrijednost:
      if (
        imageMapped.imageId !== image.imageId &&
        imageMapped.fixedRarity === true
      ) {
        return {
          ...imageMapped,
        };
      }
      //2a. Za slike koje nisu "current", a nemaju fiksni rarity:
      if (
        imageMapped.imageId !== image.imageId &&
        imageMapped.fixedRarity === false
      ) {
        //rarity se izračunava tako da se:
        //1. Zbroje svi raritiji slika koje imaju fiksni rariti i tome se pribroji nova vrijednost raritija(newRarityValue).
        //2. Dobiveni rezultat iz prvog koraka se oduzme od 100 (tolika mora biti vrijednost ukupnog raritija svih slika)
        //3. Dobivena vrijednost iz drugog koraka se podijeli s dužinom niza preostalih slika koje nisu current i nemaju fiksni rarity
        return {
          ...imageMapped,
          imageRarity: increaseThirdStep,
        };
      }
    });
    return {
      maxRarityForCurrentImage,
      images,
    };
  }
  //****************************************KRAJ IZRAČUNA KADA KOLEKCIJA SADRŽI SLIKE S FIKSNIM RARITIJEM*************************************

  images = imagesForCalculate.map((imageMapped: any) => {
    //1. Ako je na slici mijenjan rarity, onda je ona "current" i njoj se dodjeljuje vrijednost "newRarityValue"
    if (imageMapped.imageId === image.imageId) {
      return {
        ...imageMapped,
        imageRarity: newRarityValue,
      };
    }
    //2. Za sve preostale slike koje nisu "current" izračunava se novi rarity
    if (
      imageMapped.imageId !== image.imageId &&
      imageMapped.fixedRarity === false
    ) {
      //Ako je suma svih fiksnih raritija uvećano za newRarityValue jednako 100, tada se ostalim slikama (koje nisu fiksne i current) dodjeljuje vrijednost raritija 0
      if (sumOfRarityValuesOfImagesWithFixedRarity + newRarityValue > 99) {
        console.log(
          "sumOfRarityValuesOfImagesWithFixedRarity + newRarityValue > 99"
        );
        return {
          ...imageMapped,
          imageRarity: 0,
        };
      }

      //2a. Provjeriti koje slike, a koje nisu current, imaju manji ili jednak rarity kao "stopa povećanja"(increase) - njima dodijeliti rarity 0 i
      //za slike čiji su rarity manji od "stope povećanja" izračunati ukupan zbroj njihovih raritja
      if (imageMapped.imageRarity <= increase) {
        console.log("imageMapped.imageRarity <= increase");
        return {
          ...imageMapped,
          imageRarity: 0,
        };
      }

      if (imageMapped.imageRarity > increase) {
        console.log("imageMapped.imageRarity > increase");
        //2b. Slike koje nisu current, a imaju rarity veći od "stope povećanja" (increase), njihov rarity se računa tako da se od njihovog postojećeg raritija oduzme
        // "2. stopa povećanja" (increaseSecondStep) koju smo dobili tako što smo od prve "stope povećanja" oduzeli ukupnu vrijednost raritija
        //koji su bili manji od "stope povećanja" i to podijelili s brojem slika čiji je rarity veći od "stope povećanja":
        return {
          ...imageMapped,
          imageRarity: imageMapped.imageRarity - increaseSecondStep,
        };
      }

      //Ako je slika current i dodijeli joj se nova vrijednost raritija 100, svim ostalim slikama koje nisu current dodjeljuje se vrijednost raritija 0
      if (
        imageMapped.imageId !== image.imageId &&
        newRarityValue === maxRarityForCurrentImage
      ) {
        return {
          ...imageMapped,
          imageRarity: imageMapped.imageRarity - imageMapped.imageRarity,
        };
      }
    }
  });
  return {
    maxRarityForCurrentImage,
    images,
  };
};

export const updateFixRarityImages = createAsyncThunk(
  "layers/updateFixRarityImages",
  async (updateFixRarityImagesData: {
    imagesForCalculateRarityFunction: any;
    imageForCalculateRarityFunction: any;
    fixRarity: any;
  }) => {
    const {
      imagesForCalculateRarityFunction,
      imageForCalculateRarityFunction,
      fixRarity,
    } = updateFixRarityImagesData;

    //pozivam metodu updateFixRarity
    const newFixRarityCalculationImages = updateFixRarity(
      imagesForCalculateRarityFunction,
      imageForCalculateRarityFunction,
      fixRarity
    );
    try {
      const { data } = await nftClient.post(
        `/image/update-all`,
        newFixRarityCalculationImages.images
      );
      return {
        data,
        success: true,
        maxRarity: newFixRarityCalculationImages.maxRarityForCurrentImage,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);

const updateFixRarity = (images: any, image: any, fixRarity: any) => {
  const imagesForSettingFixRarity = images.images;
  //Ovdje "current" slici mijenjamo vrijednost fiksnog raritija u "true", odnosno, propertiju "fixedRarity" dodjeljujemo novu vrijednost "fixRarity"
  images = imagesForSettingFixRarity.map((imageMapped: any) => {
    if (imageMapped.imageId === image.imageId) {
      return {
        ...imageMapped,
        fixedRarity: fixRarity,
      };
    }
    return {
      ...imageMapped,
    };
  });
  let sumOfRarityValuesOfImagesWithFixedRarity = 0;
  for (let i = 0; i < images.length; i++) {
    if (images[i].fixedRarity === true) {
      sumOfRarityValuesOfImagesWithFixedRarity += images[i].imageRarity;
    }
  }
  // Izračunavamo "max" vrijednost koja može biti na slajderu. Izračunava se tako da se od vrijednosti 100 (ukupna vrijednost raritija svih slika)
  // oduzme suma vrijednosti raritija svih slika koje imaju fixni rariti
  const maxRarityForCurrentImage =
    100 - sumOfRarityValuesOfImagesWithFixedRarity;
  return {
    maxRarityForCurrentImage,
    images,
  };
};

export const setMaxRarityForCurrentImage = createAsyncThunk(
  "layers/setMaxRarity",
  async (maxRarityValue: any) => {
    return maxRarityValue;
  }
);

export const setLayersInitialState = createAsyncThunk(
  "layers/setLayersInitialState",
  async (initialStateData: any) => {
    return initialStateData;
  }
);

export const addNewImage = createAsyncThunk(
  "layers/addNewImage",
  async (imageDataCollection: any) => {
    const s3PutObjectResponse = await nftClient.post(
      `/image/signedS3PutObjectUrl`,
      imageDataCollection.imageData
    );
    await fetch(s3PutObjectResponse.data.s3PutObjectUrl, {
      method: "PUT",
      headers: { "Content-Type": "multipart/form-data" },
      body: imageDataCollection.imageFileData,
    });
    await wait(4000);
    try {
      const data = await fetch(
        `https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev/image/get?layerId=${imageDataCollection.imageData.layerId}&imageId=${s3PutObjectResponse.data.imageId}`
      );
      return { data, success: true };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);

function wait(timeout: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export const deleteImage = createAsyncThunk(
  "layers/deleteImage",
  async (deleteImageData: any) => {
    try {
      const { data } = await nftClient.delete(
        `/image/?layerId=${deleteImageData.layerId}&imageId=${deleteImageData.imageId}`
      );
      return { data, success: true };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);

export const setImageData = createAsyncThunk(
  "layers/setImageData",
  async (image: any) => {
    return image;
  }
);

export const editImage = createAsyncThunk(
  "layers/editImage",
  async (image: any) => {
    try {
      const { data } = await nftClient.post(`/image/update`, image);
      return { data, success: true };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);
