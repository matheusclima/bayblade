import { cookies } from 'next/headers';
import { CookieUser } from '@/types/user';

export async function getUserFromCookies(): Promise<CookieUser | null> {
  const cookieStore = await cookies(); // Espera a promessa ser resolvida
  const rawUser = cookieStore.get('nextfilm_user')?.value;

  if (!rawUser) return null;

  try {
    const user = JSON.parse(decodeURIComponent(rawUser));
    return user;
  } catch (error) {
    console.error('Erro ao parsear cookie de usuário:', error);
    return null;
  }
}
