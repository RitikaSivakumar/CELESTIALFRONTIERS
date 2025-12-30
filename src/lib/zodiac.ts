export const zodiacMessages: Record<string, string> = {
  Aries:
    "Your energy is a beacon, Aries. Today, channel it into something that brings you joy and peace. You've got this.",
  Taurus:
    'Your stability is your strength, Taurus. Take a moment to ground yourself and appreciate the beauty around you.',
  Gemini:
    'Your curiosity is a gift, Gemini. Explore a new thought, connect with a friend, and let your mind sparkle.',
  Cancer:
    'Your nurturing heart is your superpower, Cancer. Remember to give some of that kindness back to yourself today.',
  Leo:
    'Your creativity shines brightly, Leo. Let your inner light guide you and inspire those around you with your warmth.',
  Virgo:
    "Your dedication is admirable, Virgo. It's okay to rest and recharge. Perfection lies in balance, not just effort.",
  Libra:
    'Your sense of harmony brings peace, Libra. Seek balance in your day and trust your intuition to guide you.',
  Scorpio:
    'Your passion is a powerful force, Scorpio. Dive deep into what you love, but remember to come up for air and breathe.',
  Sagittarius:
    'Your optimism is infectious, Sagittarius. Aim for the stars, but enjoy the journey and the view along the way.',
  Capricorn:
    'Your resilience is legendary, Capricorn. Every step you take is a victory. Celebrate your progress, big or small.',
  Aquarius:
    'Your vision for a better future is inspiring, Aquarius. Today, take one small step towards that vision for yourself.',
  Pisces:
    "Your empathy is a deep ocean, Pisces. Allow yourself to float in its currents and connect with your inner artist.",
};

export function getZodiacSign(date: Date): { sign: string; message: string } {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  let sign = '';

  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) sign = 'Aquarius';
  if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) sign = 'Pisces';
  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) sign = 'Aries';
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) sign = 'Taurus';
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) sign = 'Gemini';
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) sign = 'Cancer';
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) sign = 'Leo';
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) sign = 'Virgo';
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) sign = 'Libra';
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21))
    sign = 'Scorpio';
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21))
    sign = 'Sagittarius';
  if ((month == 12 && day >= 22) || (month == 1 && day <= 19))
    sign = 'Capricorn';

  return { sign, message: zodiacMessages[sign] || 'Have a wonderful day!' };
}
