import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function createData(
  certificateName: string,
  certificateExpirationDate: string
) {
  return { certificateName, certificateExpirationDate }
}


const EmployeeCertificateCard = ({
  rows,
}) => {
  return (
    <TableContainer component={Paper} sx={{ width: `80%` }}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Belge / Sertifika Adı</TableCell>
            <TableCell align="right">Geçerlilik Tarihi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.certificateName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.certificateName}
              </TableCell>
              <TableCell align="right">
                {row.certificateExpirationDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EmployeeCertificateCard


