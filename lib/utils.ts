import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { genSalt, hash } from "bcryptjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function saltAndHashPassword(password: string) {
  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

export function errors(error: string): string {
  switch (error) {
    case 'CredentialsSignin':
      return 'Usuário ou senha inválidos';
    default:
      return 'Não foi possível realizar essa ação, tente novamente.';
  }
}
