export interface Users {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: string;  // User roles
  token: string;
  image: File | null;  // Image file for the user profile picture
  imageUrl: string;
  active: boolean;

  // Attributes specific to Client
  nomEntreprise?: string;
  siteWebEntreprise?: string;
  secteurActivite?: string;

  // Attributes specific to Creator
  bio?: string;
  lienInsta?: string;
  lienTikTok?: string;
  categoriesContenu?: string[];
}
