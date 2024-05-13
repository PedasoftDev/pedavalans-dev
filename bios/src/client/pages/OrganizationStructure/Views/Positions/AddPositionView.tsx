import React, { useState, useEffect, Fragment } from 'react'
import Form from '../ViewForm/Form';
import { FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import { Toast } from '../../../../components/Toast';
import OrganizationStructurePosition from '../../../../../server/hooks/organizationStructrePosition/main';
import { Spinner, VStack, nanoid } from '@tuval/forms';
import { useGetMe } from '@realmocean/sdk';
import StyledDataGrid from '../../../../components/StyledDataGrid';
import VocationalQualification from '../../../../../server/hooks/vocationalQualification/main';
import PositionVocationalQualificationRelation from '../../../../../server/hooks/positionVocationalQualificationRelation/main';
import { GridColDef, trTR } from '@mui/x-data-grid';


const formState: IOrganizationStructure.IPositions.ICreatePosition = {
    id: "",
    name: "",
    record_id: "",
    realm_id: "",
    relatedVocationalQualifications: [],
    tenant_id: ""
}

const AddPositionView = (
    props:
        {
            positions: IOrganizationStructure.IPositions.IPosition[],
            setDefaultPage: React.Dispatch<React.SetStateAction<string>>,
        }
): JSX.Element => {
    const { positions, setDefaultPage } = props;
    const { me, isLoading } = useGetMe("console");
    const { create, error, isError, isLoading: isLoadingCreate, isSuccess } = OrganizationStructurePosition.Create();

    const { documentGetList, isLoading: isVocationalQualificationLoading } = VocationalQualification.GetList(me?.prefs?.organization)
    const { createPositionVocationalQualificationRelation } = PositionVocationalQualificationRelation.Create()

    const [form, setForm] = useState(formState);
    const [isRelatedVQ, setIsRelatedVQ] = useState(false)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (positions.find(position => position.record_id === form.record_id)) {
            Toast.fire({
                icon: 'error',
                title: 'Bu kayıt kodu ile başka bir pozisyon zaten mevcut.'
            })
        } else {
            const id = nanoid();
            create({
                documentId: id,
                data: {
                    id: id,
                    name: form.name,
                    record_id: form.record_id,
                    realm_id: form.realm_id,
                    tenant_id: me?.prefs?.organization
                }
            }, (res) => {
                if (form.relatedVocationalQualifications.length != 0) {
                    form.relatedVocationalQualifications.forEach((document_id, i) => {
                        createPositionVocationalQualificationRelation({
                            data: {
                                position_id: res.$id,
                                document_id: document_id,
                                document_name: documentGetList.find((d) => d.$id === document_id)?.document_name,
                                tenant_id: me?.prefs?.organization,
                            }
                        }, () => {
                            if (form.relatedVocationalQualifications.length - 1 === i) {
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Pozisyon başarıyla eklendi.'
                                })
                                onReset()
                            }
                        })
                    })
                } else {
                    Toast.fire({
                        icon: 'success',
                        title: 'Pozisyon başarıyla eklendi.'
                    })
                    onReset()
                }

            })

            if (!isLoadingCreate && isError) {
                Toast.fire({
                    icon: 'error',
                    title: 'Pozisyon eklenirken bir hata oluştu.'
                })
            }
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsRelatedVQ(event.target.checked)
    }

    const onReset = () => {
        setForm(formState);
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
        isLoading || isVocationalQualificationLoading ?
            <Fragment>
                {VStack(Spinner()).render()}
            </Fragment>
            :
            <Form
                title='Yeni Pozisyon Tanımlayın'
                onSubmit={onSubmit}
                formContent={

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
                        <TextField
                            name='record_id'
                            size='small'
                            label='Kayıt Kodu'
                            value={form.record_id}
                            onChange={onChange}
                            required
                        />
                        <TextField
                            name='name'
                            size='small'
                            label='Pozisyon Adı'
                            value={form.name}
                            onChange={onChange}
                            required
                        />
                        <FormControlLabel
                            sx={{
                                width: '100%',
                                alignContent: 'end',
                                padding: '0 5px 0 0',
                            }}
                            control={
                                <Switch
                                    onChange={handleChecked}
                                    color="primary"
                                    checked={isRelatedVQ}
                                />
                            }
                            label="Mesleki Yeterlilik Belgesi Var mı?"
                            labelPlacement="start"
                        />
                        {isRelatedVQ && <div style={{
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
                                    setForm({ ...form, relatedVocationalQualifications: newRowSelectionModel });
                                }}
                                rowHeight={30}
                                columnHeaderHeight={30}
                            />
                        </div>}

                    </div>
                }

                buttons={[
                    {
                        text: "Kaydet",
                        color: "primary",
                        type: "submit"
                    },
                    {
                        text: "İptal",
                        color: "error",
                        type: "button",
                        onClick: onReset
                    }
                ]}
            />
    )
}

export default AddPositionView