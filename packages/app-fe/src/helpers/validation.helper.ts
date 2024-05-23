import Joi from 'joi';
import { language, messages } from '../constants/joi-es';

export const validateSchemaField = (
  schema: Joi.ObjectSchema<any>,
  field: string,
  value: any
): string | undefined => {
  const validationResult = schema.extract(field).label(field).validate(value, {
    abortEarly: false,
    errors: {
      language,
    },
    messages,
  });

  return validationResult.error?.message;
};

export const validateForm = <T>(
  schema: Joi.ObjectSchema<any> | Joi.ArraySchema<any>,
  form: T
) => {
  const validationResult = schema.validate(form, {
    abortEarly: false,
    errors: {
      language,
    },
    messages,
  });

  return validationResult;
};

export const mapValidationErrors = (
  formValidationError: Joi.ValidationError
) => {
  const validationErrors: Record<string, any> = {};

  for (const errorDetail of formValidationError.details) {
    if (errorDetail.context?.key) {
      validationErrors[errorDetail.context?.key] = errorDetail.message;
    }
  }

  return validationErrors;
};
