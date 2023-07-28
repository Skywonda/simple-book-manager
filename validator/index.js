const { unprocessableEntity } = require("../error");

class Validator {
  constructor(value) {
    this.value = value;
    this.error = "";
  }

  isString() {
    if (typeof this.value !== "string") {
      this.error = "value must be a string.";
    }
    return this;
  }

  isNumber() {
    if (!Number.isInteger(Number(this.value))) {
      this.error = "value must be an integer.";
    }
    return this;
  }

  notEmpty() {
    if (typeof this.value === "string" && this.value.trim() === "") {
      this.error = "value cannot be empty.";
    }
    return this;
  }

  isOptional() {
    if (this.value === undefined) {
      this.error = "";
    }
    return this;
  }

  isLength(length) {
    if (this.value.toString().length !== Number(length)) {
      this.error = `value must have a length of ${length} characters.`;
    }
    return this;
  }

  maxLength(maxLength) {
    if (this.value.toString().length > maxLength) {
      this.error = `value must not exceed ${maxLength} characters.`;
    }
    return this;
  }

  minLength(minLength) {
    if (this.value.toString().length < Number(minLength)) {
      this.error = `value must be at least ${minLength} characters.`;
    }
    return this;
  }

  trim() {
    if (typeof this.value === "string") {
      this.value = this.value.trim();
    }
  }

  isValid() {
    return this.error.length === 0;
  }

  getError() {
    return this.error;
  }

  applyRule(rule) {
    const ruleParts = rule.split(":");
    const ruleName = ruleParts[0];

    if (ruleName === "isOptional") {
      this.isOptional();
      return;
    }

    if (ruleParts.length === 2) {
      const parameter = ruleParts[1];
      if (typeof this[ruleName] === "function") {
        this[ruleName](parameter);
      }
    } else {
      if (typeof this[ruleName] === "function") {
        this[ruleName]();
      }
    }
  }
}

function validateSchema(schema) {
  return (req, res, next) => {
    const { body } = req;

    const errors = [];

    for (const field in schema) {
      if (!body.hasOwnProperty(field)) {
        if (!schema[field].includes('isOptional')) {
          errors.push(`Field '${field}' is required.`);
        }
      }
      else {
        const fieldValidator = new Validator(body[field]);
        for (const rule of schema[field]) {
          fieldValidator.applyRule(rule);
        }


        const err = fieldValidator.getError();
        if (!fieldValidator.isValid()) {
          errors.push(`${field} ${err}`);
        }
      }

      for (const field in body) {
        if (!(field in schema)) {
          delete body[field];
        }
      }
    }

    if (errors.length) throw new unprocessableEntity(errors);

    next();
  };
}

function validateInput(input, schema) {
  const errors = [];

  for (const field in schema) {
    if (!input.hasOwnProperty(field)) {
      if (!schema[field].includes('isOptional')) {
        errors.push(`Field '${field}' is required.`);
      }
    } else {
      const fieldValidator = new Validator(input[field]);
      for (const rule of schema[field]) {
        fieldValidator.applyRule(rule);
      }

      const err = fieldValidator.getError();
      if (!fieldValidator.isValid()) {
        errors.push(`${field} ${err}`);
      }
    }
  }

  return errors;
}

module.exports = { validateSchema, validateInput };
