import React, { useState } from 'react'
import Form from '../ViewForm/Form'
import { FormControlLabel, Switch, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import { Toast } from '../../../../components/Toast';
import OrganizationStructureTitle from '../../../../../server/hooks/organizationStructureTitle/main';
import AppInfo from '../../../../../AppInfo';

const formTitleState: IOrganizationStructure.ITitles.ITitle = {
  id: "",
  record_id: "",
  name: "",
  is_active: true,
  is_deleted: false,
  realm_id: "",
  tenant_id: ""
}

const EditTitleView = (
  props:
    {
      setDefaultPage: React.Dispatch<React.SetStateAction<string>>,
      titles: IOrganizationStructure.ITitles.ITitle[],
      setActive: React.Dispatch<React.SetStateAction<boolean>>,
      selectedTitle: IOrganizationStructure.ITitles.ITitle
    }
): JSX.Element => {
  const { update, error, isError, isLoading: isLoadingUpdate, isSuccess } = OrganizationStructureTitle.Update();

  const [form, setFormTitle] = useState(props.selectedTitle);
  const [isActive, setIsActive] = useState(props.selectedTitle.is_active);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.titles.find(title => title.record_id === form.record_id && title.id !== form.id)) {
      Toast.fire({
        icon: "error",
        title: "Bu kayıt kodu ile kayıtlı bir ünvan zaten var."
      })
      return;
    }

    update({
      databaseId: AppInfo.Database,
      collectionId: "organization_title",
      documentId: form.id,
      data: form
    }, () => {
      Toast.fire({
        icon: "success",
        title: "Ünvan başarıyla güncellendi!"
      });
      onReset()
    })
    if (!isLoadingUpdate && isError) {
      Toast.fire({
        icon: "error",
        title: "Ünvan güncellenirken bir hata oluştu!",
        text: error?.message
      });
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTitle({ ...form, [e.target.name]: e.target.value });
  }

  const onReset = () => {
    setFormTitle(formTitleState);
    props.setDefaultPage("");
    props.setActive(true);
  }

  const onDelete = () => {
    Swal.fire({
      title: "Ünvan Silme",
      text: `${form.name} adlı Ünvan silinecek!`,
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
        collectionId: "organization_title",
        documentId: form.id,
        data: { ...form, is_deleted: true }
      }, () => {
        Toast.fire({
          icon: "success",
          title: "Ünvan başarıyla silindi!"
        });
        onReset()
      })
    })
    if (!isLoadingUpdate && isError) {
      Toast.fire({
        icon: "error",
        title: "Ünvan silinirken bir hata oluştu!",
        text: error?.message
      });
    }
  }

  return (
    <Form
      title='Ünvan Tanımını Düzenleyin'
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
            label='Ünvan Adı'
            value={form.name}
            onChange={onChange}
          />

          <FormControlLabel
            sx={{ width: "100%", alignContent: "end" }}
            onChange={(e: any) => setFormTitle({ ...form, is_active: e.target.checked })}
            value={form.is_active}
            control={<Switch color="primary" checked={form.is_active} />}
            label="Aktif mi?"
            labelPlacement="start"
          />



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

export default EditTitleView