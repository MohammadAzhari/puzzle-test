export function generateUserId(n: number) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let userId = "";

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    userId += characters.charAt(randomIndex);
  }

  return userId;
}
