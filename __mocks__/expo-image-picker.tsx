export const launchImageLibraryAsync = jest.fn(async () => ({
  cancelled: false,
  uri: "file://image.png",
}));

export const launchCameraAsync = jest.fn(async () => ({
  cancelled: false,
  uri: "file://image.png",
}));

export default {
  launchImageLibraryAsync,
  launchCameraAsync,
};
