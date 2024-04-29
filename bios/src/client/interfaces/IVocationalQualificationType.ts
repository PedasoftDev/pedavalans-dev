import { IRoot } from './main'

namespace IVocationalQualificationType {
  export interface IBase extends IRoot {
    document_type_id: string
    document_type_code: string
    document_type_name: string
    document_is_validity_period: string
    is_active: boolean
    is_deleted: boolean
  }
  export interface IAddDocumentType {
    document_type_id: string
    document_type_code: string
    document_type_name: string
    document_is_validity_period: string
    tenant_id: string
  }
}

export default IVocationalQualificationType
