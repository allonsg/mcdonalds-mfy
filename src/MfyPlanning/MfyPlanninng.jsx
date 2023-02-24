import React, { useState, useEffect, useRef } from 'react';
import {
    Container,
    EditableCell,
    EditableInput,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './MfyPlanning.styled';

const App = () => {
    const [data, setData] = useState([]);
    const [editableCell, setEditableCell] = useState({});
    const ref = useRef();

    const calculateMfy1 = (gc, itemPerTray) => {
        const result = gc * itemPerTray;
        if (result < 491) {
            return Math.round(result * 0.63);
        } else {
            return Math.round(result * 0.51);
        }
    };

    const calculateMfy2 = (gc, itemPerTray) => {
        return Math.round(gc * itemPerTray * 0.37);
    };

    const calculateMfy3 = (gc, itemPerTray) => {
        if (gc * itemPerTray > 491) {
            return Math.round(gc * itemPerTray - gc * itemPerTray * 0.88);
        }
        return '';
    };

    useEffect(() => {
        const newData = [];
        for (let i = 8; i <= 20; i++) {
            const time = `${i < 10 ? '0' : ''}${i}:00`;
            newData.push({
                time,
                gc: '',
                itemPerTray: '',
            });
        }
        setData(newData);
    }, []);

    const handleDataChange = (time, field, value) => {
        const newData = data.map((row) => {
            if (row.time === time) {
                return {
                    ...row,
                    [field]: value,
                };
            }
            return row;
        });
        setData(newData);
    };

    const handleCellClick = (time, field) => {
        setEditableCell({ time, field });
    };

    const handleEditableInputChange = (event) => {
        const { value } = event.target;
        const { time, field } = editableCell;
        handleDataChange(time, field, value);
    };

    const handleFocusOut = (event) => {
        if (ref.current.contains(event.target)) {
            return;
        }
        setEditableCell({});
    };

    return (
        <Container onMouseDown={handleFocusOut}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader>Time</TableHeader>
                        <TableHeader>GC</TableHeader>
                        <TableHeader>Item per tray</TableHeader>
                        <TableHeader>MFY1</TableHeader>
                        <TableHeader>MFY2</TableHeader>
                        <TableHeader>MFY3</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.time}>
                            <TableCell>{row.time}</TableCell>
                            <EditableCell onClick={() => handleCellClick(row.time, 'gc')}>
                                {editableCell.time === row.time && editableCell.field === 'gc' ? (
                                    <EditableInput
                                        type="number"
                                        value={row.gc}
                                        onChange={handleEditableInputChange}
                                        ref={ref}
                                    />
                                ) : (
                                    <span>{row.gc}</span>
                                )}
                            </EditableCell>
                            <EditableCell onClick={() => handleCellClick(row.time, 'itemPerTray')}>
                                {editableCell.time === row.time && editableCell.field === 'itemPerTray' ? (
                                    <EditableInput
                                        type="number"
                                        value={row.itemPerTray}
                                        onChange={handleEditableInputChange}
                                        ref={ref}
                                    />
                                ) : (
                                    <span>{row.itemPerTray}</span>
                                )}
                            </EditableCell>
                            <TableCell>{calculateMfy1(row.gc, row.itemPerTray)}</TableCell>
                            <TableCell>{calculateMfy2(row.gc, row.itemPerTray)}</TableCell>
                            <TableCell>{calculateMfy3(row.gc, row.itemPerTray)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default App;
