export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // Na prática deveria ser hash, mas para demo usamos texto
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  platform: "YouTube" | "Spotify" | "Deezer" | "SoundCloud" | "Apple Music";
  genre?: string;
  followers?: number;
}

export interface Rating {
  id: string;
  userId: string;
  artistId: string;
  score: number; // 1-5
  comment?: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number; // Positivo para créditos, negativo para saques
  type: "rating" | "withdrawal";
  artistId?: string; // Para tipo "rating"
  status: "completed" | "pending";
  createdAt: string;
}

export type AuthStatus = {
  isAuthenticated: boolean;
  currentUser: User | null;
};

export interface DailyRatingLimit {
  userId: string;
  date: string; // Format: YYYY-MM-DD
  count: number;
}
