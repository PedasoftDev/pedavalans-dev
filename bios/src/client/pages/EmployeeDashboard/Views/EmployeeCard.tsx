import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material'
import { useNavigate } from '@tuval/forms'
import React from 'react'

const EmployeeCard = ({
  name,
  avatar,
  position,
  department,
  skills,
  yearOfSeniority,
  positionId,
  period
}) => {
  const navigate = useNavigate()
  return (
    <Card
      sx={{
        width: 380,
        border: '0px',
        boxShadow: `-1px 0px 6px 0px rgba(0,0,0,0.2)`,
        borderRadius: '8px',
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: 'white', border: `1px solid black` }}
            aria-label="recipe"
          >
            {avatar}
          </Avatar>
        }
        title={
          <Typography variant="h6" style={{ fontSize: '1.5rem' }}>
            {name}
          </Typography>
        }
        style={{
          borderBottom: '1px solid rgba(128, 128, 128, 0.2)',
        }}
      />
      <CardContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        <Typography
          variant="body2"
          style={{
            color: 'rgba(57, 90, 192,1)',
          }}
        >
          <span
            style={{
              color: 'rgba(128, 128, 128,1)',
            }}
          >
            Pozisyon :
          </span>{' '}
          <a onClick={() => navigate("/app/position-dashboard/view/" + positionId + "/" + period)}>{position}</a>
        </Typography>
        <Typography
          variant="body2"
          color="InfoText"
          style={{ fontSize: '1rem' }}
        >
          <span
            style={{
              color: 'rgba(128, 128, 128,1)',
            }}
          >
            Birim :
          </span>{' '}
          {department}
        </Typography>
        <Typography
          variant="body2"
          color="InfoText"
          style={{ fontSize: '1rem' }}
        >
          <span
            style={{
              color: 'rgba(128, 128, 128,1)',
            }}
          >
            Toplam Kıdem Süresi :
          </span>{' '}
          {yearOfSeniority}
        </Typography>
        <Typography
          variant="body2"
          color="InfoText"
          style={{ fontSize: '1rem' }}
        >
          <span
            style={{
              color: 'rgba(128, 128, 128,1)',
            }}
          >
            Yetkinlik Adedi :
          </span>{' '}
          {skills}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default EmployeeCard
