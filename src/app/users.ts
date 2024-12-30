import {File2} from "./user.service";

export interface Users {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: string;  // User roles
  token: string;
  image: File2  // Image file for the user profile picture
  imageUrl: string;
  active: boolean;
  numtel: number;
  dateNaissance: Date;
  // Attributes specific to Client
  nomEntreprise?: string;
  siteWebEntreprise?: string;
  secteurActivite?: string;
image2: File;
  // Attributes specific to Creator
  bio?: string;
  lienInsta?: string;
  lienTikTok?: string;
  categoriesContenu?: string[];
  avgrattings?:number ;
}
