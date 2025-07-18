
import api from "../lib/axios";
export const getUserCredits = async (): Promise<{ success: boolean; balance?: { creditsBalance: number } }> => {
  try {
    const response = await api.get("/credits/user");
    // console.log("Response data from api", response.data);
    
    return response.data;
  } catch (error: any) {
    console.error("Error fetching credits:", error);
    return { success: false };
  }
};
// types/subscription.ts

export interface SubscriptionPlanFeatures {
  credits?: number;
  support?: string;
  ats_score?: boolean;
  pdf_export?: boolean;
  priority_support?: boolean;
  bulk_upload?: boolean;
}

export interface SubscriptionPlanPrice {
  original: number;
  offer: number;
  currency: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string | null;
  features: SubscriptionPlanFeatures | null;
  price: SubscriptionPlanPrice;
}

export interface GetAllPlansResponse {
  success: boolean;
  data: SubscriptionPlan[];
}

export const getAllPlans = async (): Promise<GetAllPlansResponse> => {
  try {
    const response = await api.get<GetAllPlansResponse>("/credits/plans");
    return response.data;
  } catch (error) {
    console.error("Error fetching credits:", error);
    return { success: false, data: [] };
  }
};