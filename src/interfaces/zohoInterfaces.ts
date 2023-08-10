export interface ZohoAuth {
    access_token: string;
    refresh_token: string;
    api_domain: string;
    token_type: string;
    expires_in: number;
  
  }
  
  export interface ZohoAvailableHours {
    service_id: string;
    staff_id: string;
    selected_date: String;
  }

  export interface customer_details{
    name: string;
    email: string;
    phone_number: string;
  }

  export interface additional_fields{
    colaborator_number: string;
    branch_number: string;

  }

  export interface ZohoBookingAppointment {
    service_id: string;
    staff_id: string;
    from_time: string;
    customer_details: customer_details;
    additional_fields:additional_fields
  }
  