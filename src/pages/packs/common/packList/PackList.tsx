import * as React from "react"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

import { Pack } from "@/features/packs/packs.api"
import { useAppSelector } from "@/common/hooks"

import "./packList.scss"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

export const PackList = () => {
  const packsData: Pack[] = useAppSelector((state) => state.pack.packsData)
  React.useEffect(() => {}, [packsData])
  return (
    <div className="pack-list">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">Cards</StyledTableCell>
              <StyledTableCell align="left">Last&nbsp;Updated</StyledTableCell>
              <StyledTableCell align="left">Created&nbsp;by</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packsData.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.cardsCount}</TableCell>
                <TableCell align="left">{row.updated}</TableCell>
                <TableCell align="left">{row.user_name}</TableCell>
                <TableCell align="left">action</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
