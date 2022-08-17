exports.convertImagesInProductList = (data) => {
  let key;
  const newData = data
    .reduce((products, product) => {
      key = Object.keys(product.dataValues).filter((key) =>
        key.includes("image")
      );
      // console.log(key);
      const imgList = Object.keys(product.dataValues)
        .filter((key) => key.includes("image"))
        .reduce((acc, key) => {
          if (product[key] === null) {
            return [...acc];
          }
          return [...acc, product.dataValues[key]];
        }, []);
      return [...products, { ...product.dataValues, image: [...imgList] }];
    }, [])
    .map((product) => {
      key.map((k) => {
        return delete product[k];
      });
      return product;
    });

  return newData;
};

exports.convertImagesInProduct = (data) => {
  let key;
  // console.log(data);
  const newData = data
    .reduce((products, product) => {
      key = Object.keys(product).filter((key) => key.includes("image"));
      // console.log(key);
      const imgList = Object.keys(product)
        .filter((key) => key.includes("image"))
        .reduce((acc, key) => {
          if (product[key] === null) {
            return [...acc];
          }
          return [...acc, product[key]];
        }, []);
      return [...products, { ...product, image: [...imgList] }];
    }, [])
    .map((product) => {
      key.map((k) => {
        return delete product[k];
      });
      return product;
    });

  return newData;
};
