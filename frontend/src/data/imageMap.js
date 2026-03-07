// src/data/imageMap.js
const productImages = import.meta.glob(
  ['/src/images/products/*.png', '/src/images/products/*.jpg', '/src/images/products/*.jpeg'],
  { eager: true }
);

export const imageMap = Object.fromEntries(
  Object.entries(productImages).map(([path, module]) => [
    path.split('/').pop().replace(/\.(png|jpg|jpeg)$/, ''),
    module.default,
  ])
);
