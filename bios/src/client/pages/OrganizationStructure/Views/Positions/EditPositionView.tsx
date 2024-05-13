import React, { Fragment, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import Form from '../ViewForm/Form';
import { Toast } from '../../../../components/Toast';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import OrganizationStructurePosition from '../../../../../server/hooks/organizationStructrePosition/main';
import { Spinner, VStack, nanoid, useParams } from '@tuval/forms';
import AppInfo from '../../../../../AppInfo';
import { useGetMe } from "@realmocean/sdk";
import VocationalQualification from '../../../../../server/hooks/vocationalQualification/main';
import PositionVocationalQualificationRelation from '../../../../../server/hooks/positionVocationalQualificationRelation/main';
import Collections from '../../../../../server/core/Collections';
import { GridColDef, trTR } from '@mui/x-data-grid';
import StyledDataGrid from '../../../../components/StyledDataGrid';
import removeDollarProperties from '../../../../assets/Functions/removeDollarProperties';

const formState: IOrganizationStructure.IPositions.IPosition = {
    id: "",
    record_id: "",
    name: "",
    is_deleted: false,
    is_active: true,
    realm_id: "",
    tenant_id: ""
}

const EditPositionView = (
    props:
        {
            setDefaultPage: React.Dispatch<React.SetStateAction<string>>,
            setActive: React.Dispatch<React.SetStateAction<boolean>>,
            selectedPosition: IOrganizationStructure.IPositions.IPosition
        }
): JSX.Element => {
    const { selectedPosition, setActive, setDefaultPage } = props;

    const { update, error, isError, isLoading: isLoadingOrganizationStructurePosition, isSuccess } = OrganizationStructurePosition.Update();

    const [form, setForm] = useState(selectedPosition);
    const [isActive, setIsActive] = useState(selectedPosition.is_active);
    const [positionVocationalQualificationRelation, setPositionVocationalQualificationRelation] = useState<string[]>([])

    const { id } = useParams();

    const { me, isLoading } = useGetMe("console")

    const { documentGetList, isLoading: isLoadingDocument } = VocationalQualification.GetList(me?.prefs?.organization)

    const { createPositionVocationalQualificationRelation } = PositionVocationalQualificationRelation.Create()
    const { updatePositionVocationalQualificationRelation } = PositionVocationalQualificationRelation.Update()

    const { positions, isLoading: isLoadingPositions } = OrganizationStructurePosition.Get(id)
    const { positions: positionsList, isLoadingPositions: isLoadingPositionsList } = OrganizationStructurePosition.GetList(me?.prefs?.organization)
    const { positionVocationalQualificationRelationList, isLoading: isLoadingPositionVQRelationList } = PositionVocationalQualificationRelation.ListByPosition(id)



    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (positionsList.some((position) => position.$id != form.$id && position.record_id === form.record_id)) {
            Toast.fire({
                icon: "error",
                title: "Bu kayıt kodu ile başka bir pozisyon zaten mevcut."
            });
            return;
        }

        update({
            databaseId: AppInfo.Database,
            collectionId: "organization_position",
            documentId: form.id,
            data: form
        }, () => {
            if (positionVocationalQualificationRelation.length != 0) {
                positionVocationalQualificationRelationList.forEach((relation) => {
                    updatePositionVocationalQualificationRelation({
                        databaseId: AppInfo.Database,
                        collectionId: Collections.PositionVocationalQualificationRelation,
                        documentId: relation.$id,
                        data: {
                            is_deleted: true,
                            is_active: false
                        }
                    })
                })
                positionVocationalQualificationRelation.forEach((document_id, i) => {
                    const nanoId = nanoid();
                    createPositionVocationalQualificationRelation({
                        documentId: nanoId,
                        data: {
                            position_id: id,
                            document_id: document_id,
                            document_name: documentGetList.find((d) => d.$id === document_id)?.document_name,
                            tenant_id: me?.prefs?.organization,
                        }
                    }, () => {
                        if (i === positionVocationalQualificationRelation.length - 1) {
                            Toast.fire({
                                icon: "success",
                                title: "Pozisyon başarıyla güncellendi!"
                            });
                            onReset();
                        }
                    })
                })
            } else {
                Toast.fire({
                    icon: "success",
                    title: "Pozisyon başarıyla güncellendi!"
                });
                onReset();
            }
        })
        if (!isLoading && isError) {
            Toast.fire({
                icon: "error",
                title: "Pozisyon güncellenirken bir hata oluştu!",
                text: error.message
            });
            onReset()
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onDelete = () => {
        Swal.fire({
            title: "Pozisyon Silme",
            text: `${form.name} adlı posizyon silinecek!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Evet, sil!",
            cancelButtonText: "Hayır, iptal et!"
        }).then((result) => {
            if (!result.isConfirmed) {
                return;
            }
            update({
                databaseId: AppInfo.Database,
                collectionId: "organization_position",
                documentId: form.id,
                data: { ...form, is_deleted: true }
            }, () => {
                Toast.fire({
                    icon: "success",
                    title: "Pozisyon başarıyla silindi!"
                });
                onReset()
            })
            if (!isLoading && isError) {
                Toast.fire({
                    icon: "error",
                    title: "Pozisyon silinirken bir hata oluştu!",
                    text: error.message
                });
                onReset()
            }
        })
    }

    const onReset = () => {
        setForm(formState);
        setPositionVocationalQualificationRelation(positionVocationalQualificationRelationList.map((relation) => relation.document_id))
        setDefaultPage("");
    }

    const columns: GridColDef[] = [
        {
            field: "document_name",
            headerName: "Belge Adı",
            flex: 1
        }
    ];

    return (
        isLoading || isLoadingOrganizationStructurePosition || isLoadingDocument || isLoadingPositionVQRelationList || isLoadingPositions || isLoadingPositionsList ?
            <Fragment>
                {VStack(Spinner()).render()}
            </Fragment>
            :
            <Form
                title='Pozisyon Tanımını Düzenleyin'
                onSubmit={onSubmit}
                formContent={
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>

                        <TextField
                            name='record_id'
                            size='small'
                            label='Kayıt Kodu'
                            value={form.record_id}
                            onChange={onChange}
                        />

                        <TextField
                            name='name'
                            size='small'
                            label='Pozisyon Adı'
                            value={form.name}
                            onChange={onChange}
                        />

                        <FormControlLabel
                            sx={{ width: "100%", alignContent: "end" }}
                            onChange={(e: any) => setForm({ ...form, is_active: e.target.checked })}
                            value={form.is_active}
                            control={<Switch color="primary" checked={form.is_active} />}
                            label="Aktif mi?"
                            labelPlacement="start"
                        />
                        <div style={{
                            height: "280px",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                        }}>
                            <Typography variant="button" sx={{ marginLeft: "10px" }}>İlgili Mesleki Yeterlilik Belgeleri</Typography>
                            <StyledDataGrid
                                rows={documentGetList}
                                columns={columns}
                                getRowId={(row) => row.$id}
                                localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                isCellEditable={() => false}
                                disableRowSelectionOnClick
                                checkboxSelection
                                onRowSelectionModelChange={(newRowSelectionModel: any) => {
                                    setPositionVocationalQualificationRelation(newRowSelectionModel)
                                }}
                                rowSelectionModel={positionVocationalQualificationRelation}
                                rowHeight={30}
                                columnHeaderHeight={30}
                            />
                        </div>

                    </div>
                }
                buttons={
                    isActive ?
                        [
                            {
                                text: "Güncelle",
                                color: "primary",
                                type: "submit"
                            },
                            {
                                text: "İptal",
                                color: "error",
                                type: "button",
                                onClick: onReset
                            }
                        ]
                        :
                        [
                            {
                                text: "Güncelle",
                                color: "primary",
                                type: "submit"
                            },
                            {
                                text: "Sil",
                                color: "error",
                                onClick: onDelete
                            },
                            {
                                text: "İptal",
                                color: "primary",
                                type: "button",
                                onClick: onReset
                            }
                        ]
                }
            />
    )
}

export default EditPositionView;