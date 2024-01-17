import React, { Fragment, useState } from 'react';
import { TextField } from '@mui/material';
import Form from '../ViewForm/Form';
import { IOrganizationStructure } from '../../../../interfaces/IOrganizationStructure';
import { Toast } from '../../../../components/Toast';
import { useGetMe } from '@realmocean/sdk';
import { Spinner, VStack, nanoid } from '@tuval/forms';
import OrganizationStructureTitle from '../../../../../server/hooks/organizationStructureTitle/main';

const formState: IOrganizationStructure.ITitles.ICreateTitle = {
  id: "",
  realm_id: "",
  tenant_id: "",
  record_id: "",
  name: "",
}

const AddTitleView = (
  props:
    {
      setDefaultPage: React.Dispatch<React.SetStateAction<string>>,
      titles: IOrganizationStructure.ITitles.ITitle[],
      setActive: React.Dispatch<React.SetStateAction<boolean>>,
    }
): JSX.Element => {
  const { me, isLoading } = useGetMe("console");
  const { create, error, isError, isLoading: isLoadingCreate, isSuccess } = OrganizationStructureTitle.Create();

  const [formTitle, setFormTitle] = useState(formState);


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.titles.find(title => title.record_id === formTitle.record_id)) {
      Toast.fire({
        icon: "error",
        title: "Bu kayıt kodu ile kayıtlı bir ünvan zaten var."
      })
      return;
    }
    const id = nanoid();
    create({
      documentId: id,
      data: {
        ...formTitle,
        id: id,
        realm_id: me?.prefs?.organization,
        tenant_id: me?.prefs?.organization,
      }
    }, () => {
      Toast.fire({
        icon: "success",
        title: "Ünvan başarıyla eklendi!"
      });
      onReset()
    })

  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTitle({ ...formTitle, [e.target.name]: e.target.value });
  }

  const onReset = () => {
    setFormTitle(formState);
    props.setActive(true);
    props.setDefaultPage("");
  }

  return (
    isLoading ?
      <Fragment>
        {VStack(Spinner()).render()}
      </Fragment>
      :
      <Form
        title='Yeni Ünvan Tanımlayın'
        onSubmit={onSubmit}
        formContent={

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "80%" }}>
            <TextField
              name='record_id'
              size='small'
              label='Kayıt Kodu'
              value={formTitle.record_id}
              onChange={onChange}
            />
            <TextField
              name='name'
              size='small'
              label='Ünvan Adı'
              value={formTitle.name}
              onChange={onChange}
            />
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

export default AddTitleView
