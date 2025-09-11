export function handleFirebaseError(error) {
  console.error("Firebase Error Code:", error.code); // Bom para debugar

  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'E-mail already in use. Login or use another email.';

    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check your credentials.';

    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.';

    case 'auth/invalid-email':
      return 'The provided email format is invalid.';

    case 'auth/invalid-credential':
        return 'E-mail not registered. Please sign up first.';


    default:
      return 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
  }
}