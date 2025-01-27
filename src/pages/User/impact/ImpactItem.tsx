import { Box, Heading } from 'theme-ui'

import { ImpactField } from './ImpactField'
import { ImpactMissing } from './ImpactMissing'

import type { IImpactYear, IImpactYearFieldList, IUserPP } from 'src/models'

interface Props {
  year: IImpactYear
  fields: IImpactYearFieldList | undefined
  user: IUserPP | undefined
}

export const ImpactItem = ({ fields, user, year }: Props) => {
  const outterBox = {
    flexBasis: ['100%', '100%', '50%'],
    padding: 2,
  }

  const innerBox = {
    backgroundColor: 'white',
    borderRadius: 1,
    height: '100%',
    padding: 2,
  }

  const visibleFields = fields?.filter((field) => field.isVisible)

  return (
    <Box sx={outterBox} cy-data="ImpactItem">
      <Box sx={innerBox}>
        <Heading variant="small">{year}</Heading>
        {visibleFields && visibleFields.length > 0 ? (
          visibleFields.map((field, index) => {
            return <ImpactField field={field} key={index} />
          })
        ) : (
          <ImpactMissing
            fields={fields}
            owner={user}
            visibleFields={visibleFields}
            year={year}
          />
        )}
      </Box>
    </Box>
  )
}
