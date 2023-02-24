import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

export const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr``;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

export const Input = styled.input`
  border: none;
  border-bottom: 1px solid #ddd;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-size: 16px;
`;

export const EditableCell = styled(TableCell)`
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

export const EditableInput = styled(Input)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: white;
`;
