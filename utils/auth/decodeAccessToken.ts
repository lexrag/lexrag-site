export async function decrypt(session: string | undefined = '') {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-token?token=${session}`,
    );
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    // pass
  }
}
