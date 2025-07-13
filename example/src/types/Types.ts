export interface ServiceRequest {
  id: number;
  name: string;
  status: string;
  user_id: number;
  service_id: number;
  add_on_id: number;
  pick_up_lat: number;
  pick_up_long: number;
  drop_off_lat?: number;
  drop_off_long?: number;
  pick_up_time: string;
  note?: string;
  [key: string]: any;
}

export interface CreateServiceRequest {
  user_id: number;
  service_id: number;
  add_on_id: number;
  pick_up_lat: number;
  pick_up_lng: number;
  drop_off_lat?: number;
  drop_off_lng?: number;
  pick_up_time: string;
  note?: string;
}

export interface CreateServiceResponse {
  success: boolean;
  data?: ServiceRequest;
  message?: string;
  [key: string]: any;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  morni_user_id: number;
  national_eqama_number: string;
  partner_id: number;
  user_type: string;
  created_at: string;
  updated_at: string;
}

export interface RequestServiceResponse {
  id: number;
  add_on_id: number;
  corporate_account: any | null;
  corporate_name: string | null;
  corporate_vehicle: any | null;
  corporate_vehicle_info: any | null;
  created_at: string;
  updated_at: string;
  drop_off_branch: any | null;
  drop_off_branch_name: string | null;
  full_name: string;
  integration_app_id: number;
  is_cancellable: boolean;
  note: string | null;
  pick_up_branch: any | null;
  pick_up_lat: number;
  pick_up_lng: number;
  pick_up_location_ar: string;
  pick_up_location_en: string;
  pick_up_time: string;
  pickup_branch_name: string | null;
  service_id: number;
  service_name: string;
  service_type_name: string;
  service: any;
  service_provider_account: any | null;
  service_provider_name: string | null;
  service_provider_phone_number: string | null;
  source: string;
  state: string;
  status: string;
  trip_map: string;
  user_id: number;
  user: User;
}
