const storage = {
  save: (value) =>
    localStorage.setItem('electricalStickers', JSON.stringify(value)),

  get: () => JSON.parse(localStorage.getItem('electricalStickers')),
};

export default storage;
