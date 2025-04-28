import { Artist, Rating, Transaction, User, AuthStatus, DailyRatingLimit } from "./types";

// Mock artists data
export const initialArtists: Artist[] = [{
  id: "1",
  name: "Aurora",
  imageUrl: "https://picsum.photos/200",
  platform: "Spotify",
  genre: "Electro-pop",
  followers: 7500000
}, {
  id: "2",
  name: "Twenty One Pilots",
  imageUrl: "https://picsum.photos/200",
  platform: "YouTube",
  genre: "Alternative",
  followers: 25000000
}, {
  id: "3",
  name: "Nina Simone",
  imageUrl: "https://picsum.photos/200",
  platform: "Deezer",
  genre: "Jazz",
  followers: 5000000
}, {
  id: "4",
  name: "Jack Johnson",
  imageUrl: "https://picsum.photos/200",
  platform: "Apple Music",
  genre: "Folk",
  followers: 9000000
}, {
  id: "5",
  name: "Billie Eilish",
  imageUrl: "https://picsum.photos/200",
  platform: "Spotify",
  genre: "Pop",
  followers: 85000000
}, {
  id: "6",
  name: "Imagine Dragons",
  imageUrl: "https://picsum.photos/200",
  platform: "YouTube",
  genre: "Rock",
  followers: 30000000
}, {
  id: "7",
  name: "Adele",
  imageUrl: "https://picsum.photos/200",
  platform: "Deezer",
  genre: "Pop",
  followers: 78000000
}, {
  id: "8",
  name: "Bruno Mars",
  imageUrl: "https://picsum.photos/200",
  platform: "SoundCloud",
  genre: "Pop/R&B",
  followers: 65000000
}];

// Storage keys
const USERS_KEY = "creatr-users";
const RATINGS_KEY = "creatr-ratings";
const TRANSACTIONS_KEY = "creatr-transactions";
const AUTH_KEY = "creatr-auth";
const ARTISTS_KEY = "creatr-artists";
const DAILY_RATING_LIMITS_KEY = "creatr-daily-rating-limits";

// Storage utilities
function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from storage:`, error);
    return defaultValue;
  }
}
function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
  }
}

// Data functions
export function getUsers(): User[] {
  return getFromStorage<User[]>(USERS_KEY, []);
}
export function saveUser(user: User): void {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  saveToStorage(USERS_KEY, users);
}
export function getUserByEmail(email: string): User | undefined {
  return getUsers().find(user => user.email === email);
}
export function getArtists(): Artist[] {
  return getFromStorage<Artist[]>(ARTISTS_KEY, initialArtists);
}
export function initializeArtists(): void {
  if (typeof window === "undefined") return;
  const existingArtists = localStorage.getItem(ARTISTS_KEY);
  if (!existingArtists) {
    saveToStorage(ARTISTS_KEY, initialArtists);
  }
}
export function getArtistById(id: string): Artist | undefined {
  return getArtists().find(artist => artist.id === id);
}
export function getRatings(): Rating[] {
  return getFromStorage<Rating[]>(RATINGS_KEY, []);
}
export function getUserRatings(userId: string): Rating[] {
  return getRatings().filter(rating => rating.userId === userId);
}
export function getArtistRatings(artistId: string): Rating[] {
  return getRatings().filter(rating => rating.artistId === artistId);
}
export function saveRating(rating: Rating): void {
  const ratings = getRatings();

  // Check if user has already rated this artist
  const existingIndex = ratings.findIndex(r => r.userId === rating.userId && r.artistId === rating.artistId);
  if (existingIndex >= 0) {
    ratings[existingIndex] = rating;
  } else {
    ratings.push(rating);
    // Increment daily rating count for new ratings only
    incrementUserDailyRatingCount(rating.userId);
  }
  saveToStorage(RATINGS_KEY, ratings);
}
export function getTransactions(): Transaction[] {
  return getFromStorage<Transaction[]>(TRANSACTIONS_KEY, []);
}
export function getUserTransactions(userId: string): Transaction[] {
  return getTransactions().filter(transaction => transaction.userId === userId);
}
export function saveTransaction(transaction: Transaction): void {
  const transactions = getTransactions();
  transactions.push(transaction);
  saveToStorage(TRANSACTIONS_KEY, transactions);
}
export function getUserBalance(userId: string): number {
  const transactions = getUserTransactions(userId);
  return transactions.reduce((total, transaction) => total + transaction.amount, 0);
}
export function getAuthStatus(): AuthStatus {
  return getFromStorage<AuthStatus>(AUTH_KEY, {
    isAuthenticated: false,
    currentUser: null
  });
}
export function saveAuthStatus(authStatus: AuthStatus): void {
  saveToStorage(AUTH_KEY, authStatus);
}
export function logout(): void {
  saveAuthStatus({
    isAuthenticated: false,
    currentUser: null
  });
}
export function getDailyRatingLimits(): DailyRatingLimit[] {
  return getFromStorage<DailyRatingLimit[]>(DAILY_RATING_LIMITS_KEY, []);
}

export function getUserDailyRatingCount(userId: string): number {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const limits = getDailyRatingLimits();
  const userLimit = limits.find(limit => limit.userId === userId && limit.date === today);
  return userLimit?.count || 0;
}

export function incrementUserDailyRatingCount(userId: string): void {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const limits = getDailyRatingLimits();
  
  const existingLimitIndex = limits.findIndex(
    limit => limit.userId === userId && limit.date === today
  );
  
  if (existingLimitIndex >= 0) {
    limits[existingLimitIndex].count += 1;
  } else {
    limits.push({
      userId,
      date: today,
      count: 1
    });
  }
  
  saveToStorage(DAILY_RATING_LIMITS_KEY, limits);
}

export function hasReachedDailyRatingLimit(userId: string): boolean {
  const MAX_DAILY_RATINGS = 50;
  const currentCount = getUserDailyRatingCount(userId);
  return currentCount >= MAX_DAILY_RATINGS;
}

export function getNextArtistToRate(userId: string): Artist | null {
  // Check if user has reached daily limit
  if (hasReachedDailyRatingLimit(userId)) {
    return null;
  }
  
  const artists = getArtists();
  const userRatings = getUserRatings(userId);

  // Filter out artists that the user has already rated
  const unratedArtists = artists.filter(artist => !userRatings.some(rating => rating.artistId === artist.id));
  if (unratedArtists.length === 0) {
    return null; // User has rated all artists
  }

  // Return a random artist from the unrated ones
  return unratedArtists[Math.floor(Math.random() * unratedArtists.length)];
}
