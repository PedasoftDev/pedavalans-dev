import { IRoot } from './main'

namespace IVocationalQualification {
  export interface IBase extends IRoot {
    document_id: string
    document_code: string
    document_name: string
    document_validity_period: string
    document_type_id: string
    document_type_name: string
    is_active: boolean
    is_deleted: boolean
  }
  export interface IAddDocument {
    document_id: string
    document_code: string
    document_name: string
    document_validity_period: string
    document_type_id: string
    document_type_name: string
    tenant_id: string
  }
}

export default IVocationalQualification
