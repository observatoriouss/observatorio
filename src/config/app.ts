const nodeEnv = process.env.NODE_ENV || "development";
export let config: {
  apiUrl: string;
  gaMeasurementId: string;
  algoliaAppId: string;
  algoliaIndexName: string;
  algoliaApiKey: string;
};

if (nodeEnv === "development") {
  config = {
    apiUrl: "https://observatorio-uss.azurewebsites.net/api",
    gaMeasurementId: "G-8NFR32HVCJ",
    algoliaAppId: "N4AQ3CGJV0",
    algoliaApiKey: "a234ce86d7d413461f9c512ca0cb4563",
    algoliaIndexName: "observatorio_uss",
  };
} else {
  //   config = {
  //     apiUrl: "https://observatory-uss.azurewebsites.net/api",
  //     gaMeasurementId: "G-8NFR32HVCJ",
  //     algoliaAppId: "RAKRXKZMHD",
  //     algoliaApiKey: "c194f25811d488e0cc9373303d0abfc4",
  //     algoliaIndexName: "observatorio-uss",
  //   };
  config = {
    apiUrl: "https://observatorio-uss.azurewebsites.net/api",
    gaMeasurementId: "G-8NFR32HVCJ",
    algoliaAppId: "N4AQ3CGJV0",
    algoliaApiKey: "a234ce86d7d413461f9c512ca0cb4563",
    algoliaIndexName: "observatorio_uss",
  };
}
