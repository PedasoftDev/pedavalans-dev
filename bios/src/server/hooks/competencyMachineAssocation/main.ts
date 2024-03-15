import { Query, useCreateDocument, useListDocuments } from "@realmocean/sdk"
import AppInfo from "../../../AppInfo"
import Collections from "../../core/Collections"
import ICompetencyMachineAssociation from "../../../client/interfaces/ICompetencyMachineAssociation"

namespace CompetencyMachineAssociation {
    export const Create = () => {
        const { createDocument } = useCreateDocument(AppInfo.Name, AppInfo.Database, Collections.CompetencyMachineAssociation)
        return { createCompetencyMachineAssociation: createDocument }
    }
    export const GetList = (tenant_id: string): { competencyMachineAssociationList: ICompetencyMachineAssociation.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(
            AppInfo.Name,
            AppInfo.Database,
            Collections.CompetencyMachineAssociation,
            [
                Query.limit(10000),
                Query.equal('tenant_id', tenant_id),
                Query.equal('is_active', true),
                Query.equal('is_deleted', false)
            ])
        return { competencyMachineAssociationList: documents as any, isLoading }
    }
    export const GetListByMachineId = (tenant_id: string, machine_id: string): { competencyMachineAssociationList: ICompetencyMachineAssociation.IBase[], isLoading: boolean } => {
        const { documents, isLoading } = useListDocuments(
            AppInfo.Name,
            AppInfo.Database,
            Collections.CompetencyMachineAssociation,
            [
                Query.limit(10000),
                Query.equal('tenant_id', tenant_id),
                Query.equal('machine_id', machine_id),
                Query.equal('is_active', true),
                Query.equal('is_deleted', false)
            ])
        return { competencyMachineAssociationList: documents as any, isLoading }
    }
}

export default CompetencyMachineAssociation