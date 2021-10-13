import { Box } from '@mui/material'
import ReactSelect from 'react-select'

const Select = ({ selectOptions, placeHolder, setValue, value }) => (
  <Box data-testid='select'>
    <ReactSelect
      style={{ minHeight: 200 }}
      placeholder={placeHolder}
      options={selectOptions}
      onChange={(e) => setValue(e.value)}
      value={value && { value, label: value }}
    />
  </Box>
)

export default Select
