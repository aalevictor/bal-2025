import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { genSalt, hash } from "bcryptjs"
import { prisma } from "./prisma";

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

export async function validatePermission(permission_name: string, user_id: string): Promise<boolean> {
  const permission = await prisma.permission.findUnique({ where: { name: permission_name, users: { some: { id: user_id } } } });
  if (permission) return true;
  return false;  
}
