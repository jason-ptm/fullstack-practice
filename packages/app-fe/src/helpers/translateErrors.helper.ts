enum Errors {
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  PASSWORD_INCORRECT = 'PASSWORD_INCORRECT',
  EMAIL_IN_USE = 'EMAIL_IN_USE',
}

export const getErrorInText = (error?: string) => {
  switch (error) {
    case Errors.USER_NOT_FOUND:
      return 'El usuario no existe';
    case Errors.PASSWORD_INCORRECT:
      return 'El usuario no existe';
    case Errors.EMAIL_IN_USE:
      return 'El email ya esta en uso';
    default:
      return 'Ha ocurrido un error, intente de nuevo';
  }
};
