/* eslint-disable guard-for-in */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
const findDefaultStyle = (styles) => {
  // console.log('DS2');
  for (let i = 0; i < styles.length; i++) {
    if (styles[i]['default?']) {
      return styles[i];
    }
  }
};

export default findDefaultStyle;
