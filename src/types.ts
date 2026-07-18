export type Page = 'home' | 'about' | 'services' | 'training' | 'careers' | 'contact' 
  | 'service_routine' 
  | 'service_special' 
  | 'service_cctv' 
  | 'service_dogs' 
  | 'service_equipment' 
  | 'service_safety_training' 
  | 'service_advisory' 
  | 'service_other'
  | 'career_guard'
  | 'career_escort'
  | 'career_cctv'
  | 'career_k9';

export interface Slide {
  id: number;
  image: string;
  tagline: string;
  titlePrefix: string;
  titleHighlighted: string;
  description: string;
}

export interface SecurityService {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  features: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Testimonial {
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
}
