import { PolicyResponse } from "src/models/api/response/PolicyResponse";

export interface SetPoliciesAction {
    policies: PolicyResponse[];
}