// API service for fetching product data
export interface ProductResponse {
  code: number;
  data: ProductData;
  error: unknown[];
  message: string;
  payload: unknown[];
  status_code: number;
}

export interface ProductData {
  slug: string;
  id: number;
  title: string;
  description: string;
  platform: string;
  type: string;
  modality: string;
  old_info: Record<string, unknown>;
  start_at: string;
  media: Media[];
  checklist: ChecklistItem[];
  seo: unknown[];
  cta_text: {
    name: string;
    value: string;
  };
  sections: Section[];
  is_cohort_based_course: boolean;
  secondary_cta_group: unknown[];
  delivery_method: string;
}

export interface Media {
  name: string;
  resource_type: string;
  resource_value: string;
  thumbnail_url?: string;
}

export interface ChecklistItem {
  color: string;
  icon: string;
  id: string;
  list_page_visibility: boolean;
  text: string;
}

export interface Section {
  type: string;
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: unknown[];
}

export async function getProductData(slug: string, lang: 'en' | 'bn' = 'en'): Promise<ProductResponse> {
  try {
    const url = `https://api.10minuteschool.com/discovery-service/api/v1/products/${slug}?lang=${lang}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // ISR: revalidate every hour
      headers: {
        'X-TENMS-SOURCE-PLATFORM': 'web',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product data: ${response.status}`);
    }

    return await response.json();
  } catch (error: unknown) {
    console.error("Error fetching product data:", error);
    throw error;
  }
}
