import { Accessibility } from '@mui/icons-material'
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const PositionCard = ({
  positionName,
  avatar,
  employeeValue,
  abilityCount,
  averageAbilityScore,
}) => {
  return (
    <Card
      sx={{
        width: `50%`,
        border: '0px',
        boxShadow: `-1px 0px 6px 0px rgba(0,0,0,0.2)`,
        borderRadius: '8px',
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: 'white'}}
            aria-label="recipe"
          >
            {avatar}
          </Avatar>
        }
        title={
          <Typography variant="h6" style={{ fontSize: '1.5rem' }}>
            {positionName}
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
          color="InfoText"
          style={{ fontSize: '1.1rem' }}
        >
          <span
            style={{
              color: 'rgba(128, 128, 128,1)',
            }}
          >
            Pozisyona Bağlı Kişi Sayısı :
          </span>{' '}
          {employeeValue}
        </Typography>
        <Typography
          variant="body2"
          color="InfoText"
          style={{ fontSize: '1.1rem' }}
        >
          <span
            style={{
              color: 'rgba(128, 128, 128,1)',
            }}
          >
            Pozisyona Bağlı Tekil Yetkinlik Sayısı :
          </span>{' '}
          {abilityCount}
        </Typography>
        <Typography
          variant="body2"
          color="InfoText"
          style={{ fontSize: '1.1rem' }}
        >
          <span
            style={{
              color: 'rgba(128, 128, 128,1)',
            }}
          >
            Pozisyonun Ortalama Yetkinlik Skoru:
          </span>{' '}
          {averageAbilityScore}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PositionCard
