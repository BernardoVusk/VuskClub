/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RoleType = 'producer' | 'affiliate';
export type ActiveTabType = 'products' | 'training' | 'files' | 'tools' | 'rewards';

export interface Profile {
  id: string;
  name: string;
  avatar_url: string;
  role: RoleType;
  pix_key: string;
  balance: number;
  total_earned: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo_url: string;
  checkout_url: string;
  commission_percentage: number;
  created_at: string;
}

export interface Affiliation {
  id: string;
  profile_id: string;
  product_id: string;
  ref_code: string;
  created_at: string;
}

export interface Lesson {
  id: string;
  product_id: string;
  title: string;
  description: string;
  video_url: string;
  sequence_order: number;
  duration_minutes: number;
  created_at: string;
}

export interface SaleScript {
  id: string;
  product_id: string;
  platform: 'whatsapp' | 'instagram_direct' | 'tiktok_organic' | 'facebook_ads';
  title: string;
  content: string;
  created_at: string;
}

export type SaleStatus = 'pending' | 'approved' | 'refunded';

export interface Sale {
  id: string;
  product_id: string;
  affiliate_id: string | null;
  customer_email: string;
  transaction_value: number;
  commission_value: number;
  status: SaleStatus;
  checkout_source: string;
  created_at: string;
}

export type PayoutStatus = 'pending' | 'completed' | 'rejected';

export interface Payout {
  id: string;
  profile_id: string;
  amount: number;
  pix_key: string;
  status: PayoutStatus;
  created_at: string;
}

export interface GamificationLevel {
  level: number;
  name: string;
  target: number;
  reward: string;
  description: string;
}
