export default (function () {
  const required = function (value) {
    if (
      !value ||
      value === "" ||
      value === null ||
      value === undefined ||
      value === 0
    ) {
      return false;
    }
    return true;
  };

  const pattern = function (value, pattern) {
    const regex = new RegExp(pattern);
    return value.match(regex);
  };

  const maxLength = function (value, length) {
    if (value.length > length) {
      return false;
    }
    return true;
  };

  const minLength = function (value, length) {
    if (value.length < length) {
      return false;
    }
    return true;
  };

  const minDate = function (value, minDate) {
    if (new Date(value) < minDate) {
      return false;
    }
    return true;
  };

  const runValidator = function (value, validations) {
    const obj = {};
    Object.keys(validations)
      .filter((key) => key !== "msgs")
      .forEach((key) => {
        obj[key] = true;
        switch (key) {
          case "required":
            if (validations[key] && !required(value)) {
              obj[key] = false;
            } else {
              console.log(key, validations[key]);
            }
            break;
          case "pattern":
            if (value && !pattern(value, validations[key])) {
              obj[key] = false;
            }
            break;
          case "minLength":
            if (!minLength(value, validations[key])) {
              obj[key] = false;
            }
            break;
          case "maxLength":
            if (!maxLength(value, validations[key])) {
              obj[key] = false;
            }
            break;
          case "minDate":
            if (!minDate(value, validations[key])) {
              obj[key] = false;
            }
            break;
          default:
            break;
        }
      });
    return obj;
  };

  const isFormValid = function (form) {
    const errorObj = Object.keys(form).find((key) => !!form[key].error);
    if (!errorObj) {
      return true;
    }
    return false;
  };

  return {
    isFormValid,
    runValidator,
  };
})();
