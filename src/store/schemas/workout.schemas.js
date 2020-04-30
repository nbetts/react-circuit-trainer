import Joi from '@hapi/joi'

export const createWorkoutSchema = Joi.object({
  title: Joi.string()
    .label('Title')
    .required()
    .max(40)
    .messages({
      'any.required': 'Please enter a title.',
      'string.empty': 'Please enter a title.',
      'string.max': 'Please enter a title up to 40 characters long.',
    }),
  
  description: Joi.string()
    .label('Description')
    .optional()
    .allow('')
    .max(400)
    .messages({
      'string.max': 'Please enter a description up to 400 characters long.',
    }),
});