import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { Query, useGetMe, useListAccounts } from '@realmocean/sdk';
import dayjs from 'dayjs';
import React, { useState } from 'react'
import { TbUserShare } from 'react-icons/tb';
import ProxyAccount from '../../../../server/hooks/proxyAccount/main';
import AccountRelation from '../../../../server/hooks/accountRelation/main';
import IProxyAccount from '../../../interfaces/IProxyAccount';
import { Toast } from '../../../components/Toast';
import encrypt from '../../../assets/Functions/encrypt';
import { nanoid } from '@tuval/forms';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AppInfo from '../../../../AppInfo';
import removeDollarProperties from '../../../assets/Functions/removeDollarProperties';
import Swal from 'sweetalert2';

const resetProxyAccount: IProxyAccount.IBase = {
  $id: "",
  principal_id: "",
  principal_name: "",
  agent_id: "",
  agent_name: "",
  end_date: "",
  start_date: "",
  password: "",
  email: "",
  is_active: true,
  is_deleted: false,
}

const ProxyManagement = () => {
  const { me, isLoading } = useGetMe("console");
  // proxy update

  const { accounts, isLoading: isLoadingAccounts } = useListAccounts([Query.limit(10000)])
  const { accountRelations, isLoadingResult } = AccountRelation.GetList(me?.prefs?.organization)

  const { createProxyAccount } = ProxyAccount.Create();
  const { updateProxyAccount } = ProxyAccount.Update();
  const { accountProxyList, isLoading: isLoadingProxyAccounts } = ProxyAccount.GetByAccountId(me?.$id)

  // edit proxy info
  const [selectedProxy, setSelectedProxy] = useState<IProxyAccount.IBase>(resetProxyAccount)
  const [proxyScreen, setProxyScreen] = useState(0)

  const handleOpenProxy = () => setProxyScreen(1);
  const handleCloseProxy = () => setProxyScreen(0);


  const [giveProxyForm, setGiveProxyForm] = useState(
    {
      principalId: me?.$id,
      principalName: me?.name,
      agentId: "",
      agentName: "",
      endDate: "",
      startDate: "",
      password: "",
      email: me?.email,
      isActive: true,
      isDeleted: false,
    }
  )

  function MyGridWithButton({ accounts, accountProxyList, setEditProxyAccount, handleOpenProxy }) {
    return (
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          columns={[
            { field: 'email', headerName: 'E-posta', flex: 1 },
            { field: 'name', headerName: 'Adı Soyadı', flex: 1 },
            {
              field: 'start_date',
              headerName: 'Başlama Tarihi',
              width: 150,
              valueGetter: (params) => {
                const proxy = accountProxyList.find(proxy => proxy.agent_id === params.row.$id);
                return proxy && proxy.start_date
                  ? dayjs(proxy.start_date).format('DD.MM.YYYY') // Tarih formatlama
                  : '';
              }
            },
            {
              field: 'end_date',
              headerName: 'Bitiş Tarihi',
              width: 150,
              valueGetter: (params) => {
                const proxy = accountProxyList.find(proxy => proxy.agent_id === params.row.$id);
                return proxy && proxy.end_date
                  ? dayjs(proxy.end_date).format('DD.MM.YYYY') // Tarih formatlama
                  : '';
              }
            },
            {
              field: 'value',
              headerName: 'İşlemler',
              width: 150,
              renderCell: (params) => (
                <Button variant="text" onClick={() => setEditProxyAccount(params.row)}>
                  Düzenle
                </Button>
              )
            }
          ]}
          rows={accounts.filter(account =>
            accountProxyList?.some(proxy => proxy.agent_id === account.$id)
          )}
          getRowId={(row) => row.$id}

          // Burada 'components' yerine 'slots' kullanıyoruz
          slots={{
            toolbar: CustomToolbar
          }}

          // 'componentsProps' yerine 'slotProps' kullanıyoruz
          slotProps={{
            toolbar: { handleOpenProxy }
          }}
        />
      </Box>
    );
  }


  function CustomToolbar({ handleOpenProxy }) {
    return (
      <GridToolbarContainer>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          onClick={handleOpenProxy}
          size="small"
          style={{
            padding: '10px 15px',
            fontSize: '11px',
            textTransform: 'none'
          }}
          variant="contained"
          startIcon={<TbUserShare />}
        >
          Yeni Vekalet Ver
        </Button>
      </GridToolbarContainer>
    );
  }

  const setEditProxyAccount = (proxy: IProxyAccount.IBase) => {
    const selectedProxyAccount = accountProxyList.find(proxyItem =>
      proxyItem.agent_id === proxy.$id
    );

    if (selectedProxyAccount) {
      setSelectedProxy(selectedProxyAccount);
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Vekalet bulunamadı'
      })
    }

    setProxyScreen(2)
  };

  // Proxy kullanıcı oluşturma işlemi
  const handleCreateProxyUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCloseProxy();

    const docId: string = nanoid();
    createProxyAccount({
      documentId: docId,
      data: {
        principal_id: giveProxyForm.principalId,
        principal_name: giveProxyForm.principalName,
        agent_id: giveProxyForm.agentId,
        agent_name: giveProxyForm.agentName,
        start_date: giveProxyForm.startDate,
        end_date: giveProxyForm.endDate,
        email: giveProxyForm.email,
        password: encrypt(giveProxyForm.password)
      }
    }, async () => {
      Toast.fire({
        icon: 'success',
        title: 'Vekalet oluşturuldu'
      });

      // Formu sıfırlama
      setGiveProxyForm({
        ...giveProxyForm,
        agentId: "",
        agentName: "",
        endDate: "",
        startDate: "",
        password: "",
      });

      handleCloseProxy();
    });
  };

  const handleUpdateProxyUser = (e) => {
    e.preventDefault();

    updateProxyAccount(
      {
        databaseId: AppInfo.Database,
        collectionId: "proxy_account",
        documentId: selectedProxy.$id,
        data: removeDollarProperties(selectedProxy)
      }, (data) => {
        Toast.fire({
          icon: 'success',
          title: 'Hesap bilgileri güncellendi'
        })
        setProxyScreen(0)
        setSelectedProxy(resetProxyAccount)
      }
    )
  }

  return (
    isLoadingResult || isLoadingAccounts || isLoading || isLoadingProxyAccounts ? <div>Loading...</div> :
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: '20px' }}>
        {proxyScreen === 0 &&
          // DataGrid
          <MyGridWithButton
            accounts={accounts}
            accountProxyList={accountProxyList}
            setEditProxyAccount={setEditProxyAccount}
            handleOpenProxy={handleOpenProxy}
          />
        }
        {proxyScreen === 1 &&
          <div style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}>
            <form onSubmit={handleCreateProxyUser} style={{
              border: "1px solid #e0e0e0",
              borderRadius: "5px",
              padding: "20px",
              width: "50%",
              display: "flex",
              flexDirection: "column",
              background: "rgb(250 250 250)",
              gap: "10px"
            }}>
              <TextField
                label="Vekaleti Veren"
                value={me?.name || ''}
                InputProps={{ readOnly: true }}
                size="small"
              />
              {/* 2 */}
              <Autocomplete
                options={accounts.filter(account =>
                  accountRelations.some(relation =>
                    !accountProxyList?.some(proxy =>
                      proxy.agent_id === account.$id &&
                      proxy.tenant_id === me?.$id
                    ) &&
                    account.$id !== me?.$id &&
                    account.$id === relation.account_id &&
                    !accountProxyList?.some(proxy => proxy.principal_id === me?.$id && proxy.agent_id === account.$id) // Vekalet verilen hesapları hariç tut
                  )
                )}
                value={accounts.find(account => account.$id === giveProxyForm.agentId) || null}
                onChange={(event, newValue) => {
                  setGiveProxyForm({
                    ...giveProxyForm,
                    agentId: newValue ? newValue.$id : '',
                    agentName: newValue ? newValue.name : '',
                  });
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Vekaleti Alan"
                    name="agent_name"
                    size="small"
                    required
                  />
                )}
                disabled={isLoadingAccounts || isLoading}
              />


              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Başlama Tarihi"
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  value={giveProxyForm.startDate ? dayjs(giveProxyForm.startDate) : null}
                  onChange={(newDate) => {
                    setGiveProxyForm({
                      ...giveProxyForm,
                      startDate: newDate ? dayjs(newDate).format('YYYY-MM-DD') : '',
                    });
                  }}
                />
                <DatePicker
                  label="Bitiş Tarihi"
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  value={giveProxyForm.endDate ? dayjs(giveProxyForm.endDate) : null}
                  onChange={(newDate) => {
                    setGiveProxyForm({
                      ...giveProxyForm,
                      endDate: newDate ? dayjs(newDate).format('YYYY-MM-DD') : '',
                    });
                  }}
                />
              </LocalizationProvider>
              <Button size="small" variant="contained" type="submit" fullWidth>
                Kaydet
              </Button>
              <Button size="small" variant="contained" fullWidth onClick={() => {
                setGiveProxyForm({
                  ...giveProxyForm,
                  agentId: "",
                  agentName: "",
                  endDate: "",
                  startDate: "",
                  password: "",
                })
                handleCloseProxy()
              }}>
                İptal
              </Button>
            </form>
          </div>

        }

        {proxyScreen === 2 &&
          <div style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}>
            <form onSubmit={handleUpdateProxyUser} style={{
              border: "1px solid #e0e0e0",
              borderRadius: "5px",
              padding: "20px",
              width: "50%",
              display: "flex",
              flexDirection: "column",
              background: "rgb(250 250 250)",
              gap: "10px"
            }}>
              {/* Vekaleti Veren */}
              <TextField
                size="small"
                label="Vekaleti Veren"
                value={me?.name || ''}
                fullWidth
                required
                InputProps={{
                  readOnly: true,
                }}
              />
              {/* Vekaleti Alan */}
              <Autocomplete
                options={accounts.filter(account =>
                  accountRelations.some(relation =>
                    !accountProxyList?.some(proxy =>
                      proxy.agent_id === account.$id &&
                      proxy.tenant_id === me?.$id
                    ) &&
                    account.$id !== me?.$id &&
                    account.$id === relation.account_id &&
                    !accountProxyList?.some(proxy => proxy.principal_id === me?.$id && proxy.agent_id === account.$id)
                  )
                )}
                value={accounts.find(account => account.$id === selectedProxy.agent_id) || null}
                onChange={(event, newValue) => {
                  setSelectedProxy({
                    ...selectedProxy,
                    agent_id: newValue ? newValue.$id : '',
                    agent_name: newValue ? newValue.name : '',
                  });
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Vekaleti Alan"
                    name="agent_name"
                    size="small"
                    required
                  />
                )}
                disabled={isLoadingAccounts || isLoading}
              />

              {/* Başlama Tarihi */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Başlama Tarihi"
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  value={selectedProxy.start_date ? dayjs(selectedProxy.start_date) : null}  // selectedProxy'ye göre tarih ayarlanıyor
                  onChange={(newDate) => {
                    setSelectedProxy({
                      ...selectedProxy,
                      start_date: newDate ? dayjs(newDate).format('YYYY-MM-DD') : '',  // Tarihi güncelliyoruz
                    });
                  }}
                />
              </LocalizationProvider>

              {/* Bitiş Tarihi */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Bitiş Tarihi"
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  value={selectedProxy.end_date ? dayjs(selectedProxy.end_date) : null}  // selectedProxy'deki bitiş tarihi ayarlanıyor
                  onChange={(newDate) => {
                    setSelectedProxy({
                      ...selectedProxy,
                      end_date: newDate ? dayjs(newDate).format('YYYY-MM-DD') : '',  // Tarihi güncelliyoruz
                    });
                  }}
                />
              </LocalizationProvider>

              <Button size="small" variant="contained" type="submit" fullWidth>Vekaleti Düzenle</Button>
              <Button size="small" variant="contained" color='error' onClick={() => {
                Swal.fire({
                  title: 'Vekaleti sil',
                  text: "Vekaleti silmek istediğinizden emin misiniz? Bu işlemi geri alamazsınız!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Evet, sil',
                  cancelButtonText: 'İptal'
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    updateProxyAccount({
                      databaseId: AppInfo.Database,
                      collectionId: "proxy_account",
                      documentId: selectedProxy.$id,
                      data: {
                        is_deleted: true,
                        is_active: false
                      }
                    }, (data) => {
                      Toast.fire({
                        icon: 'success',
                        title: 'Vekalet Silindi!'
                      })
                      handleCloseProxy()
                      setSelectedProxy(resetProxyAccount)
                    })
                  }
                })
              }} fullWidth>Vekaleti Sil</Button>
              <Button size="small" variant="contained" onClick={() => {
                handleCloseProxy()
                setGiveProxyForm({
                  ...giveProxyForm,
                  agentId: "",
                  agentName: "",
                  endDate: "",
                  startDate: "",
                  password: "",
                })
              }} fullWidth>İptal</Button>
            </form>
          </div>
        }


      </div>
  )
}

export default ProxyManagement