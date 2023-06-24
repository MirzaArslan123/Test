export default class BeefService {
  getBeefData(imageName, imagePath, imageType) {
      // const photoProcessingURL = "https://steakrecognitionapp.azurewebsites.net/api/SteakClassifierPost/";
      const photoProcessingURL = "https://ebfb-182-178-128-126.in.ngrok.io/api/posts/";

      imageName = imageName.split('.')[0];

      var photo = {
        uri: imagePath,
        // type: `image/${imageType}`,
        type: imageType,
        name: imageName + '.jpg',

      };
      
      var formdata = new FormData();
      formdata.append("image", photo);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      return fetch(photoProcessingURL, requestOptions);
    }

    getRecipes() {
        return require('../data/SteakRecipes.json');
    }
}